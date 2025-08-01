import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getDb from '../../db/db.js';
import checkJwt from '../../middleware/checkToken.js';
import { sendEmail } from '../../mailing/transporter.js';
import { v4 as uuidv4 } from 'uuid';
import { invitationEmail } from '../../mailing/mailingModels.js';

const router = express.Router();

router.post('/', checkJwt, async (req, res) => {
  const { id, tenantId, tenantEmail } = req.body;

  if (!tenantEmail || !id) {
    return res.status(400).json({ error: 'Missing fields.' });
  }

  const db = getDb();
  const invitationToken = uuidv4();

  let result;
  try {
    const query = `
      INSERT INTO tenantUsers(parentUserId, email, tenantTableReferenceId, invitationToken)
      VALUES (?, ?, ?, ?)
    `;
    const values = [id, tenantEmail, tenantId, invitationToken];
    [result] = await db.execute(query, values);
  } catch (e) {
    console.error('Query failed:', e);
    return res.status(500).json({ error: 'Database error' });
  }

  const emailSubject = 'Email de invitación a ALKI';
  const emailBody = invitationEmail(invitationToken);

  try {
    await sendEmail(tenantEmail, emailSubject, emailBody);
  } catch (e) {
    console.error('Email send failed:', e);
    // optional: delete DB row if email fails
    return res.status(500).json({ error: 'Error al enviar el email' });
  }

  console.log('Registration successful. Sending response.');
  return res.status(200).json({
    success: true,
    message: 'Invitation sent to tenant',
  });
});


export default router;