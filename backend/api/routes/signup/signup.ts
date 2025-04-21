    // routes/user.js
import dotenv from 'dotenv';
dotenv.config();
import express, { Response } from 'express';
//const pool = require('../db')
import { AuthResponse } from "../../interfaces/user";
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";


const domain = process.env.AUTH0_DOMAIN
const audience = process.env.AUTH0_AUDIENCE

console.log(domain, audience)

const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});



const router = express.Router();

import { Request } from 'express';

router.post('/', checkJwt, async (req: Request & AuthResponse, res: Response) => {
  try {
    const { sub } = req.auth!; 
    const {
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
      permissions,
      isPremium,
      parentUserId,
    } = req.body;



    console.log(req.body, req.auth);

  } catch (err) {
    console.error('User init error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
