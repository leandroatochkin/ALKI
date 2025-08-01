import express from 'express';
import fs from 'fs';
import { ServerError } from '../../error_handling/errorModels.js';
import { generateInventoryPdfWithQRs } from './generateInventoryPdfWithQRs.js';
const router = express.Router();
router.post('/', async (req, res, next) => {
    const { propertyId } = req.body;
    console.log('Received propertyId:', propertyId);
    if (!propertyId || typeof propertyId !== 'string') {
        return next(new ServerError('Property ID is required', ''));
    }
    try {
        const filePath = await generateInventoryPdfWithQRs(propertyId);
        res.download(filePath, `inventory-${propertyId}.pdf`, (err) => {
            if (err) {
                console.error('Download error:', err);
                return next(new ServerError('Failed to download PDF', err));
            }
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr)
                    console.error('Error cleaning up PDF file:', unlinkErr);
            });
        });
    }
    catch (err) {
        return next(new ServerError('Failed to generate inventory PDF', err));
    }
});
export default router;
