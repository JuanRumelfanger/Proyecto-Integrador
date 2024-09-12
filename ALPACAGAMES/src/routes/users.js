const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const uploadFile = require('../middlewares/registerImage.js');
const areYouLogged = require('../middlewares/question');
const areNotYouLogged = require('../middlewares/otherQuestion');
const validations = require('../middlewares/validation');
const adminQuestion = require('../middlewares/adminQuestion.js');


// Routes for users - Login and Register
router.get('/login', areYouLogged, usersController.login);
router.post('/login', validations.login, adminQuestion,usersController.processLogin);
// ------------------------------------------------------ //
router.get('/register', areYouLogged, usersController.register);
router.post(
  '/register',
  uploadFile.single('avatar'),
  validations.register,
  usersController.processRegister,
);

router.get('/logout', areNotYouLogged, usersController.logout);

module.exports = router;
