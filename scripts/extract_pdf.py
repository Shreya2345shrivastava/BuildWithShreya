import fitz  # PyMuPDF
import sys
import os

def extract_pages(pdf_path, output_dir, pages_to_extract):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"Error opening PDF: {e}")
        sys.exit(1)
        
    for i, page_num in enumerate(pages_to_extract):
        # pages_to_extract is 1-indexed, PyMuPDF is 0-indexed
        actual_page = page_num - 1
        if actual_page >= len(doc):
            print(f"Warning: Page {page_num} is out of bounds (document has {len(doc)} pages).")
            continue
            
        page = doc.load_page(actual_page)
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))  # Scale by 2 for better resolution
        
        # Save as preview-1.png, preview-2.png, etc. to make it easy to understand!
        output_path = os.path.join(output_dir, f"preview-{i+1}.png")
        pix.save(output_path)
        print(f"Saved {output_path}")

if __name__ == "__main__":
    pdf_path = "public/uploads/FirstBuildEBook-18dbb855d0a07791.pdf"
    output_dir = "public/images/previews"
    
    # Extracting exactly the 5 pages you want:
    # Page 4: Personal Note
    # Page 5: Table of Contents
    # Page 6: Introduction
    # Page 7: Chapter 1
    # Page 8: Reflection Page
    pages_to_extract = [4, 5, 6, 7, 8]
    
    print(f"Extracting pages {pages_to_extract} from {pdf_path}...")
    extract_pages(pdf_path, output_dir, pages_to_extract)
