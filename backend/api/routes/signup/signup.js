import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import getDb from '../../db/db.js'
import { ValidationError, ServerError } from '../../error_handling/errorModels.js';
import { emailRegex, } from '../../helpers/regexPatterns.js';
const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;
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
router.post('/', checkJwt, async (req, res, next) => {
    const { id, email } = req.body;

    if(!id || !email){
        return res.status(400).json({error: 'Missing fields'})
    }

    try {
        const db = getDb();
        // Validate email format
        if (!emailRegex.test(email)) {
            return next(new ValidationError('Invalid email format.', ''));
        }
        // Check if email exists (using promise-based pool)
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (Array.isArray(existingUsers) && existingUsers.length > 0) {
            const rows = existingUsers;
            const isNew = rows[0]?.is_new === 1;
            res.status(200).json({ isNewUser: isNew === true });
            return;
        }
        // Insert new user
        await db.query(`INSERT INTO users(id, email, isNew) VALUES(?,?,?)`, [id, email, true]);
        res.status(201).json({ message: 'User created successfully', isNewUser: true });
        return;
    }
    catch (err) {
        console.error('User init error:', err);
        return next(new ServerError('Server error', err));
    }
});
export default router;
