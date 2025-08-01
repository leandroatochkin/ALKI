import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
// Create router instance
const router = express.Router();
// Define route handler
router.delete('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { organizationId } = req.query;
    if (!organizationId) {
        return next(new ValidationError('Server error', 'organizationId is required'));
    }
    try {
        await db.query('DELETE FROM organizations WHERE organizationId = ?', [organizationId]);
        res.status(200).json({ message: 'organization deleted successfully' });
        return;
    }
    catch (err) {
        return next(new ServerError('Server error', err));
    }
});
// Export the router
export default router;
