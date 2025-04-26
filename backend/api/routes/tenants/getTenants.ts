import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { db } from 'api/db/db';
import { ServerError } from 'api/error_handling/errorModels';
import { checkJwt } from "api/middleware/checkToken"

const router = express.Router();

router.get('/', checkJwt, async (req, res) => {
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
      const tenantsWithPayments = tenantRows.map((tenant: any) => ({
        ...tenant,
        payments: paymentRows.filter((p: any) => p.tenant_id === tenant.tenant_id)
      }))
  
      res.status(200).json({ tenants: tenantsWithPayments })
  
    } catch (error) {
      console.error('Error fetching tenants and payments:', error)
      res.status(500).json({ message: 'Failed to fetch tenants and payments' })
    }
  })
  