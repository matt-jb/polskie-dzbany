const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const episodeController = require('../controllers/episodeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(carController.getCars));

router.get('/about', carController.about);

router.get('/add',
    authController.isLoggedIn,
    authController.isAdmin,
    episodeController.addEpisode
);

router.post('/add', catchErrors(episodeController.createEpisode));

router.get('/episodes', catchErrors(episodeController.getEpisodes));
router.get('/episodes/:slug', catchErrors(episodeController.displayEpisode));

router.get('/episodes/:slug/edit',
    authController.isLoggedIn,
    authController.isAdmin,
    catchErrors(episodeController.editEpisode)
);

router.post('/episodes/:slug/edit', catchErrors(episodeController.updateEpisode));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);
router.post('/register',
    userController.validateRegister,
    userController.register,
    authController.login
);
router.get('/logout', authController.logout);

router.get('/account',
    authController.isLoggedIn,
    userController.account
);
router.post('/account', catchErrors(userController.updateAccount));

router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
    authController.confirmedPasswords,
    catchErrors(authController.update)
);

router.post('/commentsForm/:id',
    authController.isLoggedIn,
    catchErrors(commentController.addComment)
);

module.exports = router;