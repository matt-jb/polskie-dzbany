const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { promisify } = require('util');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Nie udało się zalogować.',
    successRedirect: '/',
    successFlash: 'Jesteś zalogowany.'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Wylogowanie pomyślne.');
    res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
        return;
    }
    req.flash('error', 'Musisz być zalogowany, by to zrobić.');
    res.redirect('/login');
};

exports.forgot = async (req, res) => {
    // 1. Checking if there's actually a user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        req.flash('success', 'Link do resetu hasła został wysłany na Twój adres e-mail. Jeśli nie widzisz maila, sprawdź swój folder spam.') // yeah... but not really
        return res.redirect('/login');
    };
    // 2. Create token and expiration date
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();
    // 3. Sending an email with the token
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`
    await mail.send({
        user,
        subject: 'Resetowanie hasła na serwisie Polskie Dzbany',
        html: `Twój link do resetu hasła: ${resetURL}. Pamiętaj, że link jest ważny tylko przez godzinę.`,
        text: `Twój link do resetu hasła: ${resetURL}. Pamiętaj, że link jest ważny tylko przez godzinę.`
    });
    req.flash('success', `Link do resetu hasła został wysłany na Twój adres e-mail. Jeśli nie widzisz maila, sprawdź swój folder spam.`);
    // 4. Finally, go to the login page
    res.redirect('/login');
};

exports.reset = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        req.flash('error', 'Link zmiany hasła jest błędny lub wygasł.');
        return res.redirect('/login');
    }

    res.render('reset', { title: 'Zresetuj swoje hasło' });
};

exports.confirmedPasswords = (req, res, next) => {
    if (req.body.password === req.body['confirm-password']) {
        next();
        return;
    }
    req.flash('error', 'Musisz podać to samo hasło w obu polach.');
    res.redirect('back');
}

exports.update = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        req.flash('error', 'Link zmiany hasła jest błędny lub wygasł.');
        return res.redirect('/login');
    }
    
    await user.setPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.save((saveError, updatedUser) => {
        req.login(updatedUser, loginError => {
            req.flash('success', 'Pomyślnie zresetowano hasło.');
            res.redirect('/');
        })
    });
}

exports.isAdmin = (req, res, next) => {
    if(req.user.level <= 10) {
        next();
        return;
    }
    req.flash('error', 'Musisz być administratorem, by to zrobić.');
    res.redirect('/login');
};