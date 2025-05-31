import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError, ValidationError } from '../../error_handling/errorModels.js';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
const router = express.Router();
router.post('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    try {
        const { tenantId, amount, date, method, // 0: bank transfer, 1: cash, 2: credit card, 3: debit card, 4: other
        period, status, // 0: paid, 1: pending, 2: debt
        propietorId, } = req.body;
        console.log(req.body);
        if (!tenantId || !amount || !date || !method || !period) {
            return next(new ValidationError('Server error', 'All fields are required'));
        }
        const formattedPaymentDate = dayjs(date).format('YYYY-MM-DD');
        const formattedPeriodDate = dayjs(period).format('YYYY-MM');
        const paymentId = uuidv4();
        // Insert new user
        await db.query(`INSERT INTO payments(
        id,
        tenantId,
        amount,
        date,
        method, 
        period,
        status,
        userIdass
0      ) VALUES(?,?,?,?,?,?,?,?)`, [
            paymentId,
            tenantId,
            amount,
            formattedPaymentDate,
            Number(method), // 0: bank transfer, 1: cash, 2: credit card, 3: debit card, 4: other
            formattedPeriodDate,
            status, // 0: paid, 1: pending, 2: debt
            propietorId,
        ]);
        res.status(201).json({ message: 'payment registered successfully' });
        return;
    }
    catch (err) {
        console.error('Error creating tenant:', err);
        return next(new ServerError('Server error', err));
    }
});
export default router;
