import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError, ValidationError } from '../../error_handling/errorModels.js';
const router = express.Router();
router.get('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { tenantId } = req.query;
    if (!tenantId) {
        return next(new ValidationError('Server error', 'tenantId is required'));
    }
    try {
        const [tenants] = await db.query(`SELECT * FROM tenants WHERE tenantId = ?`, [tenantId]);
        if (!Array.isArray(tenants) || tenants.length === 0) {
            res.status(200).json({ tenants: [] });
            return;
        }
        res.status(200).json({ tenants: tenants });
    }
    catch (error) {
        return next(new ServerError('Server error', error));
    }
});
export default router;
