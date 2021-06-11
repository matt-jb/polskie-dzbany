const mongoose = require('mongoose');
const User = mongoose.model('User');
const { promisify } = require('util');

exports.loginForm = (req, res) => {
    res.render('login', { title: 'Zaloguj się' });
};

exports.registerForm = (req, res) => {
    res.render('register', { title: 'Zarejestruj się' });
};

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'Wpisz imię.').notEmpty();
    req.checkBody('email', 'Ten adres e-mail jest niepoprawny.').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        gmail_remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Wpisz hasło.').notEmpty();
    req.checkBody('confirm-password', 'Wpisz ponownie hasło.').notEmpty();
    req.checkBody('confirm-password', 'Musisz podać to samo hasło w obu polach.').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('register', { body: req.body, flashes: req.flash() });
        return;
    }
    next();
};

exports.register = async (req, res, next) => {
    const user = new User({ email: req.body.email, name: req.body.name });
    const register = promisify(User.register).bind(User);
    await register(user, req.body.password);
    next();
};

exports.account = (req, res) => {
    res.render('account', { title: 'Twoje konto' });
};

exports.updateAccount = async (req, res) => {
    const updates = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );
    
    req.flash('success', 'Pomyślnie zaktualizowano profil.');
    res.redirect('back');
};