import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { db } from 'api/db/db';
import { ValidationError, ServerError } from 'api/error_handling/errorModels';
import { v4 as uuidv4 } from 'uuid';
import { checkJwt } from 'api/middleware/checkToken';
import dayjs from 'dayjs';

const router = express.Router();

router.post('/', checkJwt, async (req: Request & AuthResponse, res: Response, next) => {
  try {
    const { 
                propietorId,
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
    
    const tenantId = uuidv4()

    // Insert new user
    await db.query(
      `INSERT INTO tenants(
        tenantId,
        propietorId,
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
        smoking,
        isActive
      ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,TRUE)`,
      [
        tenantId,
        propietorId,
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
      ]
    );
    
    res.status(201).json({ message: 'tenant created successfully' });
    return;
    
  } catch (err) {
    console.error('Error creating tenant:', err);
    return next(new ServerError('Server error', err));
  }
});

export default router;