import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
const router = express.Router();
router.post('/', checkJwt, async (req, res, next) => {
    const inventoryItems = req.body;
    const db = getDb();
    console.log('inventoryItems', inventoryItems);
    for (const item of inventoryItems) {
        const id = item;
        console.log('id', id);
        try {
            await db.query(`DELETE FROM inventory_items WHERE id = ?`, [
                id,
            ]);
        }
        catch (err) {
            console.error('User init error:', err);
            return next(new ServerError('Server error', err));
        }
    }
    res.status(200).json({ message: 'inventory items deleted successfully' });
});
export default router;
