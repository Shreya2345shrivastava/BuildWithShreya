const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function createSamplePdf() {
  try {
    const pdfBytes = fs.readFileSync('public/uploads/FirstBuildEBook-18dbb855d0a07791.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Create a new PDF document
    const newPdfDoc = await PDFDocument.create();
    
    // Copy pages 0 to 11 (first 12 pages)
    const pagesToCopy = Array.from({length: Math.min(12, pdfDoc.getPageCount())}, (_, i) => i);
    const copiedPages = await newPdfDoc.copyPages(pdfDoc, pagesToCopy);
    
    copiedPages.forEach((page) => {
      newPdfDoc.addPage(page);
    });
    
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const newPdfBytes = await newPdfDoc.save();
    
    fs.writeFileSync('public/sample.pdf', newPdfBytes);
    console.log('Sample PDF created successfully.');
  } catch (err) {
    console.error('Error creating sample PDF:', err);
  }
}

createSamplePdf();
