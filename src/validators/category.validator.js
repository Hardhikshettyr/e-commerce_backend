const { body, param } = require("express-validator");

const createCategoryValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 2 })
        .withMessage("Category name must be at least 2 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Category description is required")
        .isLength({ min: 5 })
        .withMessage("Description must be at least 5 characters")
];


const updateCategoryValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid category ID"),

    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category name cannot be empty")
        .isLength({ min: 2 })
        .withMessage("Category name must be at least 2 characters"),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Description cannot be empty")
        .isLength({ min: 5 })
        .withMessage("Description must be at least 5 characters")
];


const categoryIdValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid category ID")
];


module.exports = {
    createCategoryValidator,
    updateCategoryValidator,
    categoryIdValidator
};