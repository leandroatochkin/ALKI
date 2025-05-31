import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
const router = express.Router();
router.put('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    try {
        const { userId, id, title, description, address, city, state, country, occupied, type } = req.body;
        await db.query(`UPDATE properties 
         SET title = ?, description = ?, address = ?, city = ?, 
             state = ?, country = ?, occupied = ?, type = ? 
         WHERE propId = ?`, [
            title,
            description,
            address,
            city,
            state,
            country,
            occupied,
            type,
            id
        ]);
        res.status(200).json({ message: 'property updated successfully' });
    }
    catch (err) {
        console.error('property error:', err);
        return next(new ServerError('Server error', err));
    }
});
export default router;
