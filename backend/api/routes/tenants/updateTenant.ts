import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { getDb } from 'api/db/db';
import { ValidationError, ServerError } from 'api/error_handling/errorModels';
import { v4 as uuidv4 } from 'uuid';
import { checkJwt } from 'api/middleware/checkToken';
import dayjs from 'dayjs';

const router = express.Router();

router.put('/', checkJwt, async (req: Request & AuthResponse, res: Response, next) => {

  const db = getDb();

  try {
    const { 
                tenantId,
                propertyId,
                firstName,
                lastName,
                email,
                phoneNumber,
                observations,
                contractStartDate,
                contractEndDate,
                contractStatus,
                contractId,
                contractType,
                contractValue,
                contractCurrency,
                contractPaymentMethod,
                contractPaymentFrequency, 
                pets,
                children,
                smoking
     } = req.body;

     const formattedContractStartDate = dayjs(contractStartDate).format('YYYY-MM-DD')
     const formattedContractEndDate = dayjs(contractEndDate).format('YYYY-MM-DD')
    


    // Insert new user
    await db.query(
      `UPDATE tenants
        SET
        propertyId = ?,
        firstName = ?,
        lastName = ?,
        email = ?,
        phoneNumber = ?,
        observations = ?,
        contractStartDate = ?,
        contractEndDate = ?,
        contractStatus = ?,
        contractId = ?,
        contractType = ?,
        contractValue = ?,
        contractCurrency = ?,
        contractPaymentMethod = ?,
        contractPaymentFrequency = ?, 
        pets = ?,
        children = ?,
        smoking = ?
        WHERE tenantId = ?`,
      [
        propertyId,
        firstName,
        lastName,
        email,
        phoneNumber,
        observations,
        formattedContractStartDate,
        formattedContractEndDate,
        contractStatus,
        null,
        null,
        contractValue,
        contractCurrency,
        contractPaymentMethod,
        contractPaymentFrequency, 
        pets,
        children,
        smoking,
        tenantId
      ]
    );
    
    res.status(201).json({ message: 'tenant updated successfully' });
    return;
    
  } catch (err) {
    console.error('Error creating tenant:', err);
    return next(new ServerError('Server error', err));
  }
});

export default router;