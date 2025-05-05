import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { ServerError } from 'api/error_handling/errorModels';
import { generateInventoryPdfWithQRs } from './generateInventoryPdfWithQRs ';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const  {propertyId}  = req.body;
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
        if (unlinkErr) console.error('Error cleaning up PDF file:', unlinkErr);
      });
    });
  } catch (err) {
    return next(new ServerError('Failed to generate inventory PDF', err));
  }
});

export default router;
