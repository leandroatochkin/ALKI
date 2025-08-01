import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';

const router = express.Router();

router.get('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { propertyId } = req.query;

    console.log('--- [GET /properties] Request Received ---');
    console.log('Query Params:', req.query);
    console.log('Authenticated User:', req.auth?.sub || 'Unknown');

    if (!propertyId) {
        console.error('❌ Missing required query param: id');
        return res.status(400).json({
            message: 'Missing required fields',
            details: 'id is required.',
        });
    }

    try {
        console.log(`🔍 Fetching properties for userId: ${id}`);
        const [propertiesResult] = await db.query('SELECT * FROM properties WHERE propertyId = ?', [propertyId]);

        if (!Array.isArray(propertiesResult) || propertiesResult.length === 0) {
            console.log(`ℹ️ No properties found for userId: ${id}`);
            return res.status(200).json({ message: 'No properties found for this user' });
        }


        console.log(`✅ Response ready with ${propertiesResult.length} enriched properties`);
        res.status(200).json(propertiesResult);
    } catch (err) {
        console.error('❌ === getProperties ROUTE ERROR ===');
        console.error('Error message:', err.message);
        console.error('Full error:', err);
        return res.status(500).json({
            message: 'Internal Server Error',
            details: err.message || 'Unknown error',
        });
    }
});

export default router;