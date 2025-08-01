import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError, ValidationError } from '../../error_handling/errorModels.js';
// Create router instance
const router = express.Router();
// Define route handler
router.get('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { organizationId } = req.query;
    if (!organizationId) {
        return next(new ValidationError('Server error', 'userId is required'));
    }
    try {
        const [organizationMembers] = await db.query('SELECT * FROM organization_members WHERE organizationId = ?', [organizationId]);
        if (!Array.isArray(organizationMembers) || organizationMembers.length === 0) {
            res.status(200).json({ message: 'No members found for this organization' });
            return;
        }
        res.status(200).json(organizationMembers);
    }
    catch (err) {
        return next(new ServerError('Server error', err));
    }
});
// Export the router
export default router;
