import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError, ValidationError } from '../../error_handling/errorModels.js';
const router = express.Router();
router.post('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { organizationId, name, description } = req.body;
    if (!organizationId || !name || !description) {
        return next(new ValidationError('organizationId, name, and description are required', ''));
    }
    try {
        // Insert new user
        await db.query(`UPDATE organizations 
         SET name = ?, description = ?
         WHERE organizationId = ?`, [
            name,
            description,
            organizationId,
        ]);
        res.status(201).json({ message: 'organization updated successfully' });
        return;
    }
    catch (err) {
        console.error('Error updating organizarion', err);
        return next(new ServerError('Server error', err));
    }
});
export default router;
