import express, { Request, Response, NextFunction } from 'express';
import { getDb } from 'api/db/db';
import { checkJwt } from 'api/middleware/checkToken';
import { ServerError } from 'api/error_handling/errorModels';

// Create router instance
const router = express.Router();

// Define route handler
router.get('/', checkJwt, async (req: Request, res: Response, next: NextFunction) => {
  
  const db = getDb()

  const { propertyId } = req.query;


  try {
    const [inventoryResult] = await db.query('SELECT * FROM inventories WHERE propertyId = ?', [propertyId]) as any[];

    if (!Array.isArray(inventoryResult) || inventoryResult.length === 0) {
      res.status(404).json({ message: 'No inventories found for this property' })
      return
    }



    const inventoryId = inventoryResult[0].id


      const inventory = await db.query('SELECT * FROM inventory_items WHERE inventoryId = ?', [inventoryId]);
        console.log('inventory', inventory)

      if (!Array.isArray(inventory[0]) || inventory[0].length === 0) {
        res.status(404).json({ message: 'No items found for this inventory' })
        return
      }

    res.status(200).json(inventory[0])
  } catch (err) {
    return next(new ServerError('Server error', err));
  }

});

// Export the router
export default router;