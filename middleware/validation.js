import { body, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateRegister = [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    handleValidationErrors
];

export const validateLogin = [
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors
];

export const validateContact = [
    body("name").trim().notEmpty().withMessage("Contact name is required"),
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("phone").trim().isMobilePhone().withMessage("Invalid phone number"),
    body("address").optional().trim(),
    handleValidationErrors
];
