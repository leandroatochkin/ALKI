import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError, ValidationError } from '../../error_handling/errorModels.js';
// Create router instance
const router = express.Router();
// Define route handler
router.get('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { propertyId } = req.query;
    if (!propertyId) {
        return next(new ValidationError('Server error', 'propertyId is required'));
    }
    try {
        const [services] = await db.query('SELECT * FROM services WHERE propertyId = ?', [propertyId]);
        if (!Array.isArray(services) || services.length === 0) {
            res.status(200).json({ message: 'No organizations found for this tenant' });
            return;
        }
        res.status(200).json(services);
    }
    catch (err) {
        return next(new ServerError('Server error', err));
    }
});
// Export the router
export default router;
