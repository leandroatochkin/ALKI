import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
const router = express.Router();
router.delete('/', checkJwt, async (req, res, next) => {
    const { inventoryId } = req.query;
    const db = getDb();
    if (!inventoryId) {
        res.status(400).json({ message: 'inventoryId is required' });
        return;
    }
    try {
        await db.query(`DELETE FROM inventory_items WHERE inventoryId = ?`, [
            inventoryId,
        ]);
        await db.query(`DELETE FROM inventories WHERE id = ?`, [
            inventoryId,
        ]);
    }
    catch (err) {
        console.error('inventory delete error:', err);
        return next(new ServerError('Server error', err));
    }
    res.status(200).json({ message: 'inventory deleted successfully' });
});
export default router;
