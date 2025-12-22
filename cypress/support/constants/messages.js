/**
 * Centralized Messages
 * 
 * File ini berisi semua error messages, success messages, dan validation messages
 * yang digunakan di seluruh test suite.
 * 
 * Keuntungan centralized messages:
 * 1. Single source of truth - mudah update jika message berubah
 * 2. Consistency - semua test menggunakan message yang sama
 * 3. Maintainability - tidak perlu search & replace di banyak file
 * 4. Reusability - dapat digunakan di berbagai test scenarios
 */

// ========================================
// ERROR MESSAGES
// ========================================

export const ERROR_MESSAGES = {
    // Login Error Messages
    LOGIN: {
        INVALID_CREDENTIALS: 'Invalid email address or password',
        REQUIRED_EMAIL: 'Email address is required',
        REQUIRED_PASSWORD: 'Please enter your password',
        INVALID_EMAIL_FORMAT: 'Please enter a valid email address',
    },

    // Register Error Messages
    REGISTER: {
        REQUIRED_FIRST_NAME: 'First name is a required field',
        REQUIRED_LAST_NAME: 'Last name is a required field',
        REQUIRED_EMAIL: 'Email address is a required field',
        REQUIRED_PHONE: 'Phone number is a required field',
        REQUIRED_PASSWORD: 'Password is a required field',
        REQUIRED_CONFIRM_PASSWORD: 'Confirm password is a required field',
        INVALID_PHONE: 'Phone is invalid format',
        PHONE_CUSTOM: 'custom.phone',
        SHORT_PASSWORD: 'Password must be at least 8 characters',
        PASSWORD_MISMATCH: 'Confirm password must match with password',
        INVALID_EMAIL_FORMAT: "Please include an '@' in the email address",
    },

    // Forgot Password Error Messages
    FORGOT_PASSWORD: {
        EMAIL_NOT_FOUND: (email) => `Email: ${email} not found!`,
        INVALID_EMAIL_FORMAT: 'Email address must be a valid email',
        REQUIRED_EMAIL: 'Email address is a required field',
    },

    // Checkout Error Messages
    CHECKOUT: {
        REQUIRED_FIRST_NAME: 'First name is required',
        REQUIRED_LAST_NAME: 'Last name is required',
        REQUIRED_ADDRESS: 'Address is required',
        REQUIRED_CITY: 'City is required',
        REQUIRED_POSTAL_CODE: 'Postal code is required',
        REQUIRED_COUNTRY: 'Country is required',
    },

    // General Error Messages
    GENERAL: {
        NETWORK_ERROR: 'Network error occurred',
        SERVER_ERROR: 'Server error occurred',
        UNAUTHORIZED: 'Unauthorized access',
        NOT_FOUND: 'Resource not found',
    },
};

// ========================================
// SUCCESS MESSAGES
// ========================================

export const SUCCESS_MESSAGES = {
    // Register Success Messages
    REGISTER: {
        CONFIRMATION_EMAIL: (email) =>
            `Thank you for registering, We have sent a confirmation link to ${email}, please check your inbox / spam folder`,
    },

    // Forgot Password Success Messages
    FORGOT_PASSWORD: {
        RESET_LINK_SENT:
            "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.",
        INSTRUCTION:
            'Enter the e-mail address associated with your account. Click submit to have a password reset link e-mailed to you.',
    },

    // Cart Success Messages
    CART: {
        PRODUCT_ADDED: 'Product has been added to your cart',
        PRODUCT_REMOVED: 'Product has been removed from your cart',
        CART_UPDATED: 'Cart has been updated',
    },

    // Checkout Success Messages
    CHECKOUT: {
        ORDER_PLACED: 'Your order has been placed successfully',
        PAYMENT_SUCCESS: 'Payment completed successfully',
    },

    // Login Success Messages
    LOGIN: {
        LOGIN_SUCCESS: 'Login successful',
        LOGOUT_SUCCESS: 'Logout successful',
    },
};

// ========================================
// VALIDATION MESSAGES
// ========================================

export const VALIDATION_MESSAGES = {
    // Email Validation
    EMAIL: {
        INVALID_FORMAT: 'Please enter a valid email address',
        REQUIRED: 'Email is required',
    },

    // Password Validation
    PASSWORD: {
        TOO_SHORT: 'Password must be at least 8 characters',
        REQUIRED: 'Password is required',
        MISMATCH: 'Passwords do not match',
    },

    // Phone Validation
    PHONE: {
        INVALID_FORMAT: 'Please enter a valid phone number',
        REQUIRED: 'Phone number is required',
    },

    // General Validation
    GENERAL: {
        REQUIRED_FIELD: 'This field is required',
        INVALID_INPUT: 'Invalid input',
    },
};

// ========================================
// INFO MESSAGES
// ========================================

export const INFO_MESSAGES = {
    CART: {
        EMPTY_CART: 'Your cart is empty',
    },
    CHECKOUT: {
        PROCESSING: 'Processing your order...',
    },
};
