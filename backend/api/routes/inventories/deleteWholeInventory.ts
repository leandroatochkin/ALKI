import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { db } from 'api/db/db';
import {  ServerError } from 'api/error_handling/errorModels';
import { checkJwt } from 'api/middleware/checkToken';


const router = express.Router();

router.delete('/', checkJwt, async (req: Request & AuthResponse, res: Response, next) => {

    const  {inventoryId}  = req.query

    if (!inventoryId) {
        res.status(400).json({ message: 'inventoryId is required' });
        return 
    }
    
    await db.query(
        `DELETE FROM inventory_items WHERE inventoryId = ?`,
        [
            inventoryId,
        ]
    )

    await db.query(
        `DELETE FROM inventories WHERE id = ?`,
        [
            inventoryId,
        ]
    )
    
    res.status(200).json({ message: 'inventory deleted successfully' });
});

export default router;