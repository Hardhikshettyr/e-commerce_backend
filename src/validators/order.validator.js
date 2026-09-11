const { body, param } = require("express-validator");

const placeOrderValidator = [

    body("address")
        .notEmpty()
        .withMessage("Address is required")
        .isObject()
        .withMessage("Address must be an object"),

    body("address.street")
        .trim()
        .notEmpty()
        .withMessage("Street is required"),

    body("address.city")
        .trim()
        .notEmpty()
        .withMessage("City is required"),

    body("address.state")
        .trim()
        .notEmpty()
        .withMessage("State is required"),

    body("address.pincode")
        .trim()
        .notEmpty()
        .withMessage("Pincode is required")
        .isPostalCode("IN")
        .withMessage("Invalid Indian pincode")
];


const orderIdValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid order ID")
];


const updateOrderStatusValidator = [

    param("id")
        .isMongoId()
        .withMessage("Invalid order ID"),

    body("status")
        .notEmpty()
        .withMessage("Order status is required")
        .isIn([
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled"
        ])
        .withMessage("Invalid order status")
];


module.exports = {
    placeOrderValidator,
    orderIdValidator,
    updateOrderStatusValidator
};