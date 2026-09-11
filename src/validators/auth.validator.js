const { body } = require("express-validator");

const registerValidator = [

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Enter a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
];


const loginValidator = [

    body("identifier")
        .trim()
        .notEmpty()
        .withMessage("Username or email is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];


module.exports = {
    registerValidator,
    loginValidator
};