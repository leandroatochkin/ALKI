import express, { Request, Response, NextFunction } from 'express';
import { db } from 'api/db/db';
import { checkJwt } from 'api/middleware/checkToken';

// Create router instance
const router = express.Router();

// Define route handler
router.get('/', checkJwt, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  try {
    const [propertiesResult] = await db.query('SELECT * FROM properties WHERE userId = ?', [id]) as any[];

    if (!Array.isArray(propertiesResult) || propertiesResult.length === 0) {
      res.status(200).json({ message: 'No properties found for this user' })
      return
    }

    const properties = await Promise.all(propertiesResult.map(async (property: any) => {
      const [tenantResult] = await db.query('SELECT * FROM tenants WHERE propertyId = ?', [property.propId]);
      let tenantData = null;

      if (Array.isArray(tenantResult) && tenantResult.length > 0) {
        tenantData = tenantResult[0];

        const [paymentResult] = await db.query('SELECT * FROM payments WHERE tenantId = ?', [tenantData.tenantId]);
        tenantData.payments = Array.isArray(paymentResult) ? paymentResult : [];
      }

      const [inventoryResult] = await db.query('SELECT * FROM inventories WHERE propertyId = ?', [property.propId]);
      let inventoryData = null;

      if (Array.isArray(inventoryResult) && inventoryResult.length > 0) {
        inventoryData = inventoryResult[0];

        const [itemsResult] = await db.query('SELECT * FROM inventory_items WHERE inventoryId = ?', [inventoryData.id]);
        inventoryData.items = Array.isArray(itemsResult) ? itemsResult : [];
      }

      return {
        id: property.propId,
        userId: property.userId,
        title: property.title,
        description: property.description,
        address: property.address,
        city: property.city,
        state: property.state,
        country: property.country,
        occupied: property.occupied === 1,
        type: property.type,
        tenantData,
        inventory: inventoryData
      };
    }));

    res.status(200).json(properties);
  } catch (err) {
    console.error('Error fetching properties data:', err);
    next(err);
  }

});

// Export the router
export default router;