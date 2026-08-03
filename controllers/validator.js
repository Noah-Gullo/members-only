const { body, validationResult} = require('express-validator');

const signUpRules = [
    body('firstname')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isAlphanumeric().withMessage('First name must contain only letters and numbers')
        .isLength({ min: 1, max: 25 }).withMessage('First name must be 1 to 25 characters long'),

    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isAlphanumeric().withMessage('Last name must contain only letters and numbers')
        .isLength({ min: 1, max: 25 }).withMessage('First name must be 1 to 25 characters long'),

    body('email')
        .isEmail().withMessage('Please input a valid email')
        .normalizeEmail(),

    body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
        .matches(/\d/).withMessage('Password must contain at least one number.')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.'),

    body('confirm').custom((value, { req }) => {
        if(value !== req.body.password){
            throw new Error('Passwords do not match');
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("signUpForm.ejs", {
                errors: errors.array(),
            });
        }
        next();
    }
]

module.exports = {
    signUpRules,
};