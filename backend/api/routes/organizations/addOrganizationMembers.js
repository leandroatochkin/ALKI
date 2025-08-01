import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { ServerError } from '../../error_handling/errorModels.js';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';
const router = express.Router();
router.post('/', checkJwt, async (req, res, next) => {
    const db = getDb();
    const members = req.body;
    console.log(members);
    if (!members) {
        return next(new ValidationError('members are required', error));
    }
    try {
        const memberId = uuidv4();
        for (const member in members) {
            await db.query(`INSERT INTO organization_members(
            memberId,
            organizationId,
            creatorId,
            name,
            email,
            permissions)
            VALUES(?,?,?,?,?,?)`, [
                memberId,
                members[member].organizationId,
                members[member].creatorId,
                members[member].name,
                members[member].email,
                members[member].permissions,
            ]);
        }
        res.status(201).json({ message: 'organization successfully' });
        return;
    }
    catch (err) {
        console.error('Error creating organizarion', err);
        return next(new ServerError('Server error', err));
    }
});
export default router;
