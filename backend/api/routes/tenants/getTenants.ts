import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { db } from 'api/db/db';
import { ServerError } from 'api/error_handling/errorModels';
import { checkJwt } from "api/middleware/checkToken"
import { Payment } from 'api/interfaces/payments';
import { TenantDTO } from 'api/interfaces/tenants';


const router = express.Router();

router.get('/', checkJwt, async (req, res, next) => {
    const { userId } = req.query
  
    try {
      const [tenantRows]: any[] = await db.query(
        `SELECT * FROM tenants WHERE propietorId = ?`,
        [userId]
      )

      if (!Array.isArray(tenantRows) || tenantRows.length === 0) {
        res.status(200).json({ tenants: [] })
        return 
      }
  
      // Get tenant IDs to fetch payments in bulk
      const tenantIds = tenantRows.map((tenant: any) => tenant.tenant_id)
  
      // Fetch all payments for those tenants
      const [paymentRows]: any[] = await db.query(
        `SELECT * FROM payments WHERE tenantId IN (?)`,
        [tenantIds]
      )
  
      // Attach payments to each tenant
      const tenantsWithPayments = tenantRows.map((tenant: TenantDTO) => ({
        ...tenant,
        payments: paymentRows.filter((p: Payment) => p.tenantId === tenant.tenantId)
      }))
  
      res.status(200).json({ tenants: tenantsWithPayments.filter((tenant: TenantDTO) => tenant.isActive) })
  
    } catch (error) {
        return next(new ServerError('Server error', error));
    }
  })
  
  export default router