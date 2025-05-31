import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
const router = express.Router();
router.delete('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { tenantId, terminationReason } = req.body;
    try {
        await db.query(`UPDATE tenants SET terminationReason = ?, isActive = FALSE WHERE tenantId = ?`, [
            terminationReason,
            tenantId,
        ]);
        res.status(200).json({ message: 'tenant deleted successfully' });
        return;
    }
    catch (err) {
        console.error('User init error:', err);
        return next(new ServerError('Server error', err));
    }
});
export default router;
