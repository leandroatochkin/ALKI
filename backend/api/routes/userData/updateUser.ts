import dotenv from 'dotenv';
dotenv.config();
import express, { Response, Request } from 'express';
import { AuthResponse } from "../../interfaces/user";
import { RowDataPacket } from 'mysql2';
import { getDb } from 'api/db/db';
import { ServerError } from 'api/error_handling/errorModels';
import { checkJwt } from 'api/middleware/checkToken';

const router = express.Router();


router.post('/', checkJwt, async (req: Request & AuthResponse, res: Response, next) => {

  const db = getDb();

  try {
    const  {
        id,
        firstName,
        lastName,
        middleName,
        email,
        phoneNumber,
        countryCode,
        addressLine1,
        addressLine2,
        monthlyRevenue,
        state,
        city,
        postalCode,
        autoCalculateMRR,
        theme,
        isPremium,
        parentUserId, 
    }  = req.body;

    // Validate email format

    // Check if email exists (using promise-based pool)
    const [existingUsers] = await db.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE id = ?', 
      [id]
    );

    if (Array.isArray(existingUsers) && existingUsers.length === 0) {      
        res.status(404).json({ userInfo: `user not found` });
        return;
      }
      
    

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {      
      const query = `
      UPDATE users SET
      firstName = ?,
      lastName = ?,
      middleName = ?,
      email = ?,
      phoneNumber = ?,
      countryCode = ?,
      addressLine1 = ?,
      addressLine2 = ?,
      monthlyRevenue = ?,
      state = ?,
      city = ?,
      postalCode = ?,
      autoCalculateMRR = ?,
      theme = ?,
      isPremium = ?,
      parentUserId = ?
      WHERE id = ?`

        await db.query(query,[
            firstName,
            lastName,
            middleName,
            email,
            phoneNumber,
            countryCode,
            addressLine1,
            addressLine2,
            monthlyRevenue,
            state,
            city,
            postalCode,
            autoCalculateMRR,
            theme,
            isPremium,
            parentUserId,
            id
        ])

      res.status(200).json({ message: 'User updated successfully'});
      return;
    }
    
    
  } catch (err) {
    console.error('User init error:', err);
    return next(new ServerError('Server error', err));
  }
});

export default router;
