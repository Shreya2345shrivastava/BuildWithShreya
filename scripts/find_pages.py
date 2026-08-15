import fitz  # PyMuPDF
import sys

def scan_pdf(pdf_path):
    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"Error opening PDF: {e}")
        sys.exit(1)
        
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text()
        print(f"--- PAGE {page_num + 1} ---")
        # Print first 200 characters to get a sense of the page
        print(text[:200].replace('\n', ' '))

if __name__ == "__main__":
    pdf_path = "public/uploads/FirstBuildEBook-18dbb855d0a07791.pdf"
    scan_pdf(pdf_path)
