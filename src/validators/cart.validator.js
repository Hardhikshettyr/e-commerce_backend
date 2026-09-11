const { body, param } = require("express-validator");

const addCartValidator = [

    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invalid product ID"),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1")
];


const updateQuantityValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid product ID"),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1")
];


const cartProductIdValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid product ID")
];


module.exports = {
    addCartValidator,
    updateQuantityValidator,
    cartProductIdValidator
};