import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError, ValidationError } from '../../error_handling/errorModels.js';
const router = express.Router();
// Define route handler
router.get('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { userId } = req.query;
    if (!userId) {
        return next(new ValidationError('Server error', 'userId is required'));
    }
    try {
        const [servicesCosts] = await db.query(`SELECT serviceCost FROM services WHERE userId = ? AND serviceResponsibility = 'propietario'`, [userId]);
        if (!Array.isArray(servicesCosts) || servicesCosts.length === 0) {
            res.status(200).json({ message: 'No services found for this user' });
            return;
        }
        const total = servicesCosts.reduce((acc, current) => acc + current.serviceCost, 0);
        res.status(200).json({ total: total });
        return;
    }
    catch (err) {
        return next(new ServerError('Server error', err));
    }
});
// Export the router
export default router;
