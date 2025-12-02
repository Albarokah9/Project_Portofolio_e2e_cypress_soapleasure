/**
 * Utility class untuk menghasilkan data test
 */

export class DataGenerator {
    /**
     * Hasilkan alamat email unik
     * @param {string} domain - Domain email (default: mailinator.com)
     * @returns {string} Alamat email unik
     */
    static generateUniqueEmail(domain = 'mailinator.com') {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `user${timestamp}${random}@${domain}`;
    }

    /**
     * Hasilkan nomor telepon Indonesia acak
     * @returns {string} Nomor telepon acak
     */
    static generateRandomPhone() {
        const prefix = '08';
        const number = Math.floor(Math.random() * 1000000000)
            .toString()
            .padStart(10, '0');
        return prefix + number;
    }

    /**
     * Hasilkan string acak
     * @param {number} length - Panjang string
     * @returns {string} String acak
     */
    static generateRandomString(length = 10) {
        return Math.random()
            .toString(36)
            .substring(2, length + 2);
    }

    /**
     * Hasilkan password aman
     * @param {number} length - Panjang password (minimum 8)
     * @returns {string} Password yang dihasilkan
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

        // Pastikan setidaknya satu dari setiap tipe karakter
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += special.charAt(Math.floor(Math.random() * special.length));

        // Isi sisanya secara acak
        for (let i = password.length; i < length; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        // Acak urutan password
        return password
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('');
    }

    /**
     * Hasilkan nama depan acak
     * @returns {string} Nama depan acak
     */
    static generateFirstName() {
        const names = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa'];
        return names[Math.floor(Math.random() * names.length)];
    }

    /**
     * Hasilkan nama belakang acak
     * @returns {string} Nama belakang acak
     */
    static generateLastName() {
        const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
        return names[Math.floor(Math.random() * names.length)];
    }
}
