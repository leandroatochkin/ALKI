import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
const router = express.Router();
router.get('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { userId } = req.query;
    try {
        const [tenantRows] = await db.query(`SELECT * FROM tenants WHERE propietorId = ?`, [userId]);
        if (!Array.isArray(tenantRows) || tenantRows.length === 0) {
            res.status(200).json({ tenants: [] });
            return;
        }
        // Get tenant IDs to fetch payments in bulk
        const tenantIds = tenantRows.map((tenant) => tenant.tenant_id);
        // Fetch all payments for those tenants
        const [paymentRows] = await db.query(`SELECT * FROM payments WHERE tenantId IN (?)`, [tenantIds]);
        // Attach payments to each tenant
        const tenantsWithPayments = tenantRows.map((tenant) => ({
            ...tenant,
            payments: paymentRows.filter((p) => p.tenantId === tenant.tenantId)
        }));
        res.status(200).json({ tenants: tenantsWithPayments.filter((tenant) => tenant.isActive) });
    }
    catch (error) {
        return next(new ServerError('Server error', error));
    }
});
export default router;
