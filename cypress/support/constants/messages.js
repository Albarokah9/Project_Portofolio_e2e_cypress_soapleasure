/**
 * Centralized error and success messages
 */

export const ERROR_MESSAGES = {
    LOGIN: {
        INVALID_CREDENTIALS: 'Invalid email address or password',
        REQUIRED_EMAIL: 'Email address is required',
        REQUIRED_PASSWORD: 'Please enter your password',
        INVALID_EMAIL_FORMAT: 'Please enter a valid email address',
    },

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

    FORGOT_PASSWORD: {
        EMAIL_NOT_FOUND: (email) => `Email: ${email} not found!`,
        INVALID_EMAIL_FORMAT: 'Email address must be a valid email',
        REQUIRED_EMAIL: 'Email address is a required field',
    },
};

export const SUCCESS_MESSAGES = {
    REGISTER: {
        CONFIRMATION_EMAIL: (email) =>
            `Thank you for registering, We have sent a confirmation link to ${email}, please check your inbox / spam folder`,
    },

    FORGOT_PASSWORD: {
        RESET_LINK_SENT:
            "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.",
        INSTRUCTION:
            'Enter the e-mail address associated with your account. Click submit to have a password reset link e-mailed to you.',
    },

    CART: {
        PRODUCT_ADDED: 'Product has been added to your cart',
    },
};
