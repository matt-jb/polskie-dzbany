const nodemailer = require('nodemailer');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const { promisify } = require('util');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

exports.send = async (options) => {
    const mailOptions = {
        from: `Polskie Dzbany <admin@polskiedzbany.pl>`,
        to: options.user.email,
        subject: options.subject,
        html: options.html,
        text: options.text
    }
    const sendMail = promisify(transport.sendMail).bind(transport);
    return sendMail(mailOptions);
};