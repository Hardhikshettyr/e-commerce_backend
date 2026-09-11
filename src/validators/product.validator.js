const { body, param, query } = require("express-validator");

const createProductValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Product description is required"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative number"),

    body("stock")
        .notEmpty()
        .withMessage("Stock is required")
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("category")
        .notEmpty()
        .withMessage("Category is required")
        .isMongoId()
        .withMessage("Invalid category ID")
];


const updateProductValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid product ID"),

    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product name cannot be empty"),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product description cannot be empty"),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative number"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("category")
        .optional()
        .isMongoId()
        .withMessage("Invalid category ID")
];


const productIdValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid product ID")
];


const productQueryValidator = [

    query("search")
        .optional()
        .trim(),

    query("category")
        .optional()
        .isMongoId()
        .withMessage("Invalid category ID"),

    query("minPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("minPrice must be a non-negative number"),

    query("maxPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("maxPrice must be a non-negative number"),

    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be at least 1"),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 1 and 100"),

    query("sort")
        .optional()
        .isIn([
            "price_asc",
            "price_desc",
            "name_asc",
            "name_desc"
        ])
        .withMessage("Invalid sort option")
];


module.exports = {
    createProductValidator,
    updateProductValidator,
    productIdValidator,
    productQueryValidator
};