import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { getDb } from 'api/db/db';
import {  ServerError } from 'api/error_handling/errorModels';
import { checkJwt } from 'api/middleware/checkToken';


const router = express.Router();

router.post('/', checkJwt, async (req: Request & AuthResponse, res: Response, next) => {

    const  inventoryItems  = req.body
    const db = getDb()
    console.log('inventoryItems', inventoryItems)

    for (const item of inventoryItems) {
        const  id  = item
        console.log('id', id)
        try {
            await db.query(
                `DELETE FROM inventory_items WHERE id = ?`,
                [
                    id,
                ]
            )
        } catch (err) {
            console.error('User init error:', err);
            return next(new ServerError('Server error', err));
        }
    }
    res.status(200).json({ message: 'inventory items deleted successfully' });
});

export default router;