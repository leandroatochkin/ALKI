import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
const router = express.Router();
router.delete('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const { propId } = req.query;
    try {
        await db.query(`DELETE FROM properties WHERE propId = ?`, [
            propId,
        ]);
        res.status(200).json({ message: 'property deleted successfully' });
        return;
    }
    catch (err) {
        console.error('User init error:', err);
        return next(new ServerError('Server error', err));
    }
});
export default router;
