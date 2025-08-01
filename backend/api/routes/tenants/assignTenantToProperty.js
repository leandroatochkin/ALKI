import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
const router = express.Router();
router.post('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { tenantId, propertyId } = req.body;
    if (!tenantId || !propertyId) {
        console.error('Missing required fields');
        return res.status(400).json({
            message: 'Missing required fields',
            details: 'all fields are required.',
        });
    }
    try {
        // Insert new user
        await db.query(`
            UPDATE tenants SET propertyAssigned = ? WHERE tenantId = ?
            `, [
            propertyId,
            tenantId
        ]);
        res.status(201).json({ message: 'tenant assigned successfully' });
        return;
    }
    catch (err) {
        console.error('=== assignTenantToProperty ROUTE ERROR ===');
        console.error('Error:', err);
        return res.status(500).json({
            message: 'Internal Server Error',
            details: err.message || 'Unknown error',
        });
    }
});
export default router;
