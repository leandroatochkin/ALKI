import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
// Create router instance
const router = express.Router();
// Define route handler
router.get('/', checkJwt, async (req, res, next) => {
    const { propertyId } = req.query;

    if(!propertyId){
        res.status(400).json({error: 'Missing fields'})
        return
    }

    const db = getDb();
    try {
        const [inventoryResult] = await db.query('SELECT * FROM inventories WHERE propertyId = ?', [propertyId]);
        if (!Array.isArray(inventoryResult) || inventoryResult.length === 0) {
            res.status(404).json({ message: 'No inventories found for this property' });
            return;
        }
        const inventoryId = inventoryResult[0].id;
        const inventory = await db.query('SELECT * FROM inventory_items WHERE inventoryId = ?', [inventoryId]);
        console.log('inventory', inventory);
        if (!Array.isArray(inventory[0]) || inventory[0].length === 0) {
            res.status(404).json({ message: 'No items found for this inventory' });
            return;
        }
        res.status(200).json(inventory[0]);
    }
    catch (err) {
        return next(new ServerError('Server error', err));
    }
});
// Export the router
export default router;
