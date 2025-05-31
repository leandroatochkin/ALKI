import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError, ValidationError } from '../../error_handling/errorModels.js';
// Create router instance
const router = express.Router();
// Define route handler
router.get('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { userId } = req.query;
    if (!userId) {
        return next(new ValidationError('Server error', 'userId is required'));
    }
    try {
        const [organizations] = await db.query('SELECT * FROM organizations WHERE userId = ?', [userId]);
        if (!Array.isArray(organizations) || organizations.length === 0) {
            res.status(200).json({ message: 'No organizations found for this tenant' });
            return;
        }
        res.status(200).json(organizations);
    }
    catch (err) {
        return next(new ServerError('Server error', err));
    }
});
// Export the router
export default router;
