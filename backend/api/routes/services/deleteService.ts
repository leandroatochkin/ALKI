import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { db } from 'api/db/db';
import {  ServerError } from 'api/error_handling/errorModels';
import { checkJwt } from 'api/middleware/checkToken';


const router = express.Router();

router.delete('/', checkJwt, async (req: Request & AuthResponse, res: Response, next) => {

    const  {serviceId}  = req.query

    if (!serviceId) {
        res.status(400).json({ message: 'serviceId is required' });
        return 
    }
    
    try{
        await db.query(
        `DELETE FROM services WHERE serviceId = ?`,
        [
            serviceId,
        ]
    )
    } catch(err){
            console.error('service delete error:', err);
            return next(new ServerError('Server error', err));
    }
    
    res.status(200).json({ message: 'service deleted successfully' });
});

export default router;