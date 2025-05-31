import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
const router = express.Router();
router.get('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    try {
        const { id } = req.query;
        // Validate email format
        // Check if email exists (using promise-based pool)
        const [existingUsers] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (Array.isArray(existingUsers) && existingUsers.length === 0) {
            res.status(201).json({ userInfo: `user not found` });
            return;
        }
        if (Array.isArray(existingUsers) && existingUsers.length > 0) {
            existingUsers[0].autoCalculateMRR = existingUsers[0].autoCalculateMRR === 1 ? true : false;
            res.status(200).json({ userInfo: {
                    ...existingUsers[0],
                } });
            return;
        }
    }
    catch (err) {
        console.error('User init error:', err);
        return next(new ServerError('Server error', err));
    }
});
export default router;
