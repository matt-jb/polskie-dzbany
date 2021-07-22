// Modele. Są troszkę w dziwnym miejscu, ponieważ tak mi wymusił hosting, którego używam o_O:
require('./models/Car');
require('./models/Episode');
require('./models/User');
require('./models/Comment');

const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

mongoose.Promise = global.Promise;

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/index');
const helpers = require('./helpers');
const cookieParser = require('cookie-parser');
const errorHandlers = require('./handlers/errorHandlers');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const passport = require('passport');
const moment = require('moment');
moment.locale('pl');

require('./handlers/passport');

const app = express();

// Connect to database
try {
    mongoose.connect(
        process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
        () => console.log("Mongoose is connected")
    );

} catch (err) {
    console.log("Could not connect. Reason: " + err);
}

app.set('port', process.env.PORT || 3000);

app.listen(3000, () => console.log("Server started on port 3000"));

app.set('views', path.join(__dirname, 'views')); // views are stored here by default
app.use(express.static(path.join(__dirname, 'public'))); // files are stored here by default
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(expressValidator());

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    res.locals.user = req.user || null;
    res.locals.currentPath = req.path;
    res.locals.moment = moment;
    next();
});

app.use('/', routes);

app.use(errorHandlers.flashValidationErrors);

// app.use(errorHandlers.catchErrors);

// If that above routes didnt work, we 404 them and forward to error handler
// app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors

// Otherwise this was a really bad error we didn't expect! Shoot eh
// if (app.get('env') === 'development') {
//   /* Development Error Handler - Prints stack trace */
//   app.use(errorHandlers.developmentErrors);
// }

module.exports = app;