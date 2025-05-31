import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request, NextFunction } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { getDb } from 'api/db/db';
import { ServerError } from 'api/error_handling/errorModels';
import { checkJwt } from 'api/middleware/checkToken';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', checkJwt, async (req: Request & AuthResponse, res: Response, next: NextFunction) => {
  const { propertyId, items } = req.body;

  const db = getDb()

  if (!propertyId || !Array.isArray(items)) {
    return next(new ServerError('Property ID and items are required', ''));
  }

  try {
    // Check if inventory already exists
    const [existingItems] = await db.query(
      `SELECT * FROM inventories WHERE propertyId = ?`,
      [propertyId]
    ) as any[];

    let inventoryId: string;

    if (!existingItems.length) {
      // No inventory found; create one
      const newId = uuidv4();
      await db.query(
        `INSERT INTO inventories (id, propertyId) VALUES (?, ?)`,
        [newId, propertyId]
      );
      inventoryId = newId;
    } else {
      // Fetch existing inventoryId
      const [inventoryRows] = await db.query(
        `SELECT id FROM inventories WHERE propertyId = ?`,
        [propertyId]
      ) as any[];

      if (!inventoryRows.length) {
        return next(new ServerError('Inventory exists but cannot find ID', ''));
      }

      inventoryId = inventoryRows[0].id;
    }

    // Insert items
    for (const item of items) {
      const { name, quantity, declaredPrice } = item;
      await db.query(
        `INSERT INTO inventory_items (id, name, quantity, inventoryId, declaredPrice) VALUES (?, ?, ?, ?, ?)`,
        [uuidv4(), name, quantity, inventoryId, declaredPrice || 0]
      );
    }

    res.status(200).json({ message: 'Inventory items added successfully' });
  } catch (err) {
    console.error('Inventory creation error:', err);
    next(new ServerError('Server error', err));
  }
});

export default router;
