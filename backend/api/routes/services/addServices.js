import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError, ValidationError } from '../../error_handling/errorModels.js';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';
const router = express.Router();
router.post('/', checkJwt, async (req, res, next) => {
    const services = req.body;
    const db = getDb();
    if (!services) {
        return next(new ValidationError('members are required', error));
    }
    try {
        for (const service in services) {
            const serviceId = uuidv4();
            await db.query(`INSERT INTO services(
            serviceId,
            propertyId,
            serviceName,
            serviceCost,
            serviceResponsibility,
            serviceDescription,
            userId
            )
            VALUES(?,?,?,?,?,?,?)`, [
                serviceId,
                services[service].propertyId,
                services[service].serviceName,
                services[service].serviceCost,
                services[service].serviceResponsibility,
                services[service].serviceDescription,
                services[service].userId
            ]);
        }
        res.status(201).json({ message: 'services added successfully' });
        return;
    }
    catch (err) {
        console.error('Error adding services', err);
        return next(new ServerError('Server error', err));
    }
});
export default router;
