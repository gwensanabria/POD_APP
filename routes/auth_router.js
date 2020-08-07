//Importing helping functions from utils
//===========================================
const VerifySignUp = require("../utils/fnVerifySignUp");
const JwtTokenValidator = require("../utils/fnVerifyJwtToken");
const Password = require("../controllers/password")
const validate = require('../middleware/validate');
const {check} = require('express-validator');

// auth routes
module.exports = (app) => {
    //including controller here to be exported
    const authController = require("../controllers/auth_controller");

    //defining route for signup
    app.post("/api/auth/signup", [VerifySignUp.fnCheckDuplicateEmail, VerifySignUp.fnCheckRoles], authController.signup);

    //defining route for signin
    app.post("/api/auth/signin", authController.signin)

    //Defining test routes
    app.get('/api/test/user', JwtTokenValidator.fnVerifyToken, authController.userContent);

    //Password RESET
    app.post('/api/auth/recover', [
        check('email').isEmail().withMessage('Enter a valid email address'),
    ], validate, Password.recover);

    app.get('/reset/:token', Password.reset);

    app.post('/reset/:token', [
        check('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
        check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
    ], validate, Password.resetPassword);
}