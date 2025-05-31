import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import getDb from '../../db/db.js';
import os from 'os';
export const generateInventoryPdfWithQRs = async (propertyId) => {
    const db = getDb();
    const [propertyRows] = await db.query('SELECT title FROM properties WHERE propId = ?', [propertyId]);
    const [items] = await db.query(`
      SELECT ii.id, ii.name, ii.quantity
      FROM inventory_items ii
      JOIN inventories i ON i.id = ii.inventoryId
      WHERE i.propertyId = ?
    `, [propertyId]);
    const propertyTitle = propertyRows[0]?.title || 'Unknown Property';
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 10;
    let x = 40;
    let y = 740;
    const qrSize = 80;
    const margin = 20;
    for (const item of items) {
        const quantity = item.quantity ?? 1;
        for (let i = 0; i < quantity; i++) {
            const qrText = `Propiedad: ${propertyTitle}\nItem: ${item.name}\nID: ${item.id} - Unidad ${i + 1}\nValor: $${item.declaredPrice}`;
            const qrDataUrl = await QRCode.toDataURL(qrText, { width: qrSize });
            const qrImageBytes = qrDataUrl.split(',')[1];
            const qrImage = await pdfDoc.embedPng(Buffer.from(qrImageBytes, 'base64'));
            page.drawImage(qrImage, {
                x,
                y,
                width: qrSize,
                height: qrSize,
            });
            page.drawText(`${item.name} #${i + 1}`, {
                x,
                y: y - 12,
                size: fontSize,
                font,
                color: rgb(0, 0, 0),
            });
            x += qrSize + margin;
            if (x + qrSize > 595 - 40) {
                x = 40;
                y -= qrSize + 30;
            }
            // Create new page if out of vertical space
            if (y < 60) {
                const newPage = pdfDoc.addPage([595, 842]);
                x = 40;
                y = 740;
                page = newPage;
            }
        }
    }
    const pdfBytes = await pdfDoc.save();
    const outputPath = path.join(os.tmpdir(), `inventory_${propertyId}.pdf`);
    fs.writeFileSync(outputPath, pdfBytes);
    return outputPath;
};
