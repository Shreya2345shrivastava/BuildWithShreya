import fitz  # PyMuPDF
import sys
import os

def extract_all_pages(pdf_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"Error opening PDF: {e}")
        sys.exit(1)
        
    print(f"Document has {len(doc)} pages.")
    for i in range(len(doc)):
        page = doc.load_page(i)
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))  # Scale by 2 for better resolution
        
        output_path = os.path.join(output_dir, f"page-{i+1}.png")
        pix.save(output_path)
        print(f"Saved {output_path}")

if __name__ == "__main__":
    pdf_path = "public/uploads/FirstBuildEBook-18dbb855d0a07791.pdf"
    output_dir = "public/images/previews/all"
    
    print(f"Extracting all pages from {pdf_path} into {output_dir}...")
    extract_all_pages(pdf_path, output_dir)
