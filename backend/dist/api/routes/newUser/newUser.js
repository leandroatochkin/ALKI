import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import { ServerError } from '../../error_handling/errorModels.js';

const router = express.Router();
router.post('/', async (req, res, next) => {
    const db = getDb();
    try {
        const { id, firstName, lastName, middleName, phoneNumber, countryCode, addressLine1, addressLine2, state, city, postalCode } = req.body;
        // Validate email format
        // Check if email exists (using promise-based pool)
        const [existingUsers] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        // If id exists
        if (Array.isArray(existingUsers) && existingUsers.length === 0) {
            res
                .status(201)
                .json({ message: 'User not found' });
            return;
        }
        // Insert new user data
        await db.query(`UPDATE users 
       SET first_name = ?, last_name = ?, middle_name = ?, phone_number = ?, country_code = ?, address_line1 = ?, address_line2 = ?, state = ?, city = ?, postal_code = ?, is_new = 0 
       WHERE id = ?`, [
            firstName,
            lastName,
            middleName,
            phoneNumber,
            countryCode,
            addressLine1,
            addressLine2,
            state,
            city,
            postalCode,
            id,
        ]);
        res.status(201).json({ message: 'User updated successfully' });
        return;
    }
    catch (err) {
        console.error('User init error:', err);
        return next(new ServerError('Server error', err));
    }
});
export default router;
