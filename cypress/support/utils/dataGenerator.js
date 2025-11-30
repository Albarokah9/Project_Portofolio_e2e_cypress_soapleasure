/**
 * Utility class for generating test data
 */

export class DataGenerator {
    /**
     * Generate unique email address
     * @param {string} domain - Email domain (default: mailinator.com)
     * @returns {string} Unique email address
     */
    static generateUniqueEmail(domain = 'mailinator.com') {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `user${timestamp}${random}@${domain}`;
    }

    /**
     * Generate random Indonesian phone number
     * @returns {string} Random phone number
     */
    static generateRandomPhone() {
        const prefix = '08';
        const number = Math.floor(Math.random() * 1000000000)
            .toString()
            .padStart(10, '0');
        return prefix + number;
    }

    /**
     * Generate random string
     * @param {number} length - Length of string
     * @returns {string} Random string
     */
    static generateRandomString(length = 10) {
        return Math.random()
            .toString(36)
            .substring(2, length + 2);
    }

    /**
     * Generate secure password
     * @param {number} length - Password length (minimum 8)
     * @returns {string} Generated password
     */
    static generatePassword(length = 12) {
        if (length < 8) {
            throw new Error('Password length must be at least 8 characters');
        }

        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const special = '!@#$%';
        const allChars = uppercase + lowercase + numbers + special;

        let password = '';

        // Ensure at least one of each type
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += special.charAt(Math.floor(Math.random() * special.length));

        // Fill the rest randomly
        for (let i = password.length; i < length; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        // Shuffle the password
        return password
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('');
    }

    /**
     * Generate random first name
     * @returns {string} Random first name
     */
    static generateFirstName() {
        const names = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa'];
        return names[Math.floor(Math.random() * names.length)];
    }

    /**
     * Generate random last name
     * @returns {string} Random last name
     */
    static generateLastName() {
        const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
        return names[Math.floor(Math.random() * names.length)];
    }
}
