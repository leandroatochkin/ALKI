import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { db } from 'api/db/db';
import {  ServerError } from 'api/error_handling/errorModels';
import { checkJwt } from 'api/middleware/checkToken';


const router = express.Router();

router.delete('/', checkJwt, async (req: Request & AuthResponse, res: Response, next) => {

    const { propId } = req.query

  try {

    await db.query(
      `DELETE FROM properties WHERE propId = ?`,
      [
        propId,
      ]
    )
    
    res.status(200).json({ message: 'property deleted successfully' });
    return;
    
  } catch (err) {
    console.error('User init error:', err);
    return next(new ServerError('Server error', err));
  }
});

export default router;