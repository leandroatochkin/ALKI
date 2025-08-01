import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
const router = express.Router();
router.delete('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { serviceId } = req.query;
    if (!serviceId) {
        res.status(400).json({ message: 'serviceId is required' });
        return;
    }
    try {
        await db.query(`DELETE FROM services WHERE serviceId = ?`, [
            serviceId,
        ]);
    }
    catch (err) {
        console.error('service delete error:', err);
        return next(new ServerError('Server error', err));
    }
    res.status(200).json({ message: 'service deleted successfully' });
});
export default router;
