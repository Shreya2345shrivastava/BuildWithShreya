const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const https = require('https');

// Helper to download a font
function downloadFont(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function createSamplePdf() {
  try {
    const pdfBytes = fs.readFileSync('public/uploads/FirstBuildEBook-18dbb855d0a07791.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    const newPdfDoc = await PDFDocument.create();

    // Fetch elegant font (Lora Serif)
    // Fetch elegant font (Times Roman)
    const serifFont = await newPdfDoc.embedFont(StandardFonts.TimesRoman);
    const serifItalicFont = await newPdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    

    
    // Indices based on user requests (0-indexed)
    // 1. Cover: 0
    // 2. Title/Copyright: 1
    // 3. Personal Note: 2 (Dedication)
    // 4. TOC: 3
    // 5. Intro: 4
    // 6. Chapter 1 (Complete): 5, 6
    // 7. Reflection Page: 26 (Page 27)
    // 8. Workbook Exercise: 28 (Page 29)
    const pagesToCopy = [0, 1, 2, 3, 4, 5, 6, 26, 28];
    const copiedPages = await newPdfDoc.copyPages(pdfDoc, pagesToCopy);
    
    copiedPages.forEach((page) => {
      newPdfDoc.addPage(page);
    });
    
    // Create Preview Page
    // Copy a page with a nice background (e.g., page 32 - index 31)
    const bgPages = await newPdfDoc.copyPages(pdfDoc, [31, 31]);
    
    const previewPage = bgPages[0];
    newPdfDoc.addPage(previewPage);
    
    const { width, height } = previewPage.getSize();
    
    // Draw semi-transparent rectangle to fade existing text but keep floral background
    previewPage.drawRectangle({
      x: 0, y: 0, width, height,
      color: rgb(0.98, 0.97, 0.95), // beige-ish
      opacity: 0.92,
    });
    
    // Draw "What You'll Discover In The Full Book"
    const titleColor = rgb(0.18, 0.23, 0.18);
    const textColor = rgb(0.35, 0.42, 0.36);
    const highlightColor = rgb(0.79, 0.52, 0.40); // terracota/rust
    
    previewPage.drawText("What You'll Discover", {
      x: width / 2 - 120,
      y: height - 150,
      size: 26,
      font: serifFont,
      color: titleColor,
    });
    previewPage.drawText("In The Full Book", {
      x: width / 2 - 100,
      y: height - 185,
      size: 26,
      font: serifFont,
      color: titleColor,
    });
    
    // Line separator
    previewPage.drawLine({
      start: { x: width / 2 - 40, y: height - 210 },
      end: { x: width / 2 + 40, y: height - 210 },
      thickness: 1,
      color: highlightColor,
    });
    
    const chapters = [
      "Chapter 2: The Dream vs The Fear",
      "Chapter 3: Perfection Is the Enemy",
      "Chapter 4: Start Before You're Ready",
      "Chapter 5: Your First Version Will Be Ugly",
      "Chapter 6: Consistency Beats Talent",
      "Chapter 7: Learn Through Action",
      "Chapter 8: Make It Beautiful",
      "Chapter 9: Keep Building",
      "Chapter 10: The Builder's Mindset"
    ];
    
    let yPos = height - 270;
    chapters.forEach((chap) => {
      previewPage.drawText(chap, {
        x: 100,
        y: yPos,
        size: 16,
        font: serifItalicFont,
        color: textColor,
      });
      yPos -= 32;
    });
    
    yPos -= 20;
    
    const bonuses = [
      "• 30-Day Transformation Challenge",
      "• Guided Workbook Exercises",
      "• Reflection Sections",
      "• Future Self Letter"
    ];
    
    bonuses.forEach((bonus) => {
      previewPage.drawText(bonus, {
        x: 100,
        y: yPos,
        size: 16,
        font: serifFont,
        color: titleColor,
      });
      yPos -= 32;
    });
    
    
    // Create Buy Now Page
    const ctaPage = bgPages[1];
    newPdfDoc.addPage(ctaPage);
    
    ctaPage.drawRectangle({
      x: 0, y: 0, width, height,
      color: rgb(0.98, 0.97, 0.95),
      opacity: 0.92,
    });
    
    ctaPage.drawText("Ready to continue your journey?", {
      x: width / 2 - 170,
      y: height - 250,
      size: 24,
      font: serifFont,
      color: titleColor,
    });
    
    ctaPage.drawLine({
      start: { x: width / 2 - 40, y: height - 280 },
      end: { x: width / 2 + 40, y: height - 280 },
      thickness: 1,
      color: highlightColor,
    });
    
    ctaPage.drawText("You have just explored a small part of", {
      x: width / 2 - 150,
      y: height - 330,
      size: 18,
      font: serifFont,
      color: textColor,
    });
    ctaPage.drawText("First Build It, Then Make It Beautiful.", {
      x: width / 2 - 150,
      y: height - 360,
      size: 18,
      font: serifItalicFont,
      color: titleColor,
    });
    
    ctaPage.drawText("Inside the full book you'll discover:", {
      x: width / 2 - 130,
      y: height - 420,
      size: 16,
      font: serifFont,
      color: textColor,
    });
    
    const points = [
      "Complete chapters",
      "Guided reflections",
      "Action exercises",
      "30-day transformation challenge",
      "Personal growth framework"
    ];
    
    yPos = height - 460;
    points.forEach((point) => {
      ctaPage.drawText("• " + point, {
        x: width / 2 - 110,
        y: yPos,
        size: 16,
        font: serifFont,
        color: textColor,
      });
      yPos -= 28;
    });
    
    ctaPage.drawText("Get the Full Book", {
      x: width / 2 - 70,
      y: yPos - 50,
      size: 20,
      font: serifFont,
      color: highlightColor,
    });
    
    ctaPage.drawText("Author: Shreya Shrivastava", {
      x: width / 2 - 100,
      y: 120,
      size: 16,
      font: serifFont,
      color: textColor,
    });
    
    ctaPage.drawText("buildwithshreya.com", {
      x: width / 2 - 75,
      y: 90,
      size: 16,
      font: serifItalicFont,
      color: titleColor,
    });
    
    
    // Save PDF
    const newPdfBytes = await newPdfDoc.save();
    fs.writeFileSync('public/First_Build_It_Then_Make_It_Beautiful_Free_Sample.pdf', newPdfBytes);
    
    // Also overwrite sample.pdf so the viewer shows the new one
    fs.writeFileSync('public/sample.pdf', newPdfBytes);
    
    console.log('Premium Sample PDF created successfully.');
  } catch (err) {
    console.error('Error creating sample PDF:', err);
  }
}

createSamplePdf();
