const fs = require('fs');
const pdf2img = require('pdf-img-convert');

async function extract() {
  const pdfPath = 'public/uploads/FirstBuildEBook-18dbb855d0a07791.pdf';
  console.log("Converting PDF pages to images...");
  
  // Extracting pages 1, 5, 10, 15, 20 (or some pages)
  // The ebook might have a title page, table of contents, etc.
  // Let's just pick pages 3, 4, 5, 6, 7 to get some actual content.
  const outputImages = await pdf2img.convert(pdfPath, {
    width: 600,
    page_numbers: [3, 5, 7, 9, 11] 
  });
  
  for (let i = 0; i < outputImages.length; i++) {
    fs.writeFileSync(`public/images/previews/real-page-${i + 1}.png`, outputImages[i]);
    console.log(`Saved real-page-${i + 1}.png`);
  }
}

extract().catch(console.error);
