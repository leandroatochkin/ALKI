import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
const router = express.Router();
router.post('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    try {
        const { propietorId, firstName, lastName, email, phoneNumber, observations, contractStartDate, contractEndDate, contractStatus, contractId, contractType, contractValue, contractCurrency, contractPaymentMethod, contractPaymentFrequency, pets, children, smoking } = req.body;
        const formattedContractStartDate = dayjs(contractStartDate).format('YYYY-MM-DD');
        const formattedContractEndDate = dayjs(contractEndDate).format('YYYY-MM-DD');
        const tenantId = uuidv4();
        // Insert new user
        await db.query(`INSERT INTO tenants(
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
      ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,TRUE)`, [
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
        ]);
        res.status(201).json({ message: 'tenant created successfully' });
        return;
    }
    catch (err) {
        console.error('Error creating tenant:', err);
        return next(new ServerError('Server error', err));
    }
});
export default router;
