import os
import sys

def convert_pptx_to_pdf():
    pptx_path = os.path.abspath(r"RainfallRisk_Academic_Presentation\RainfallRisk_India_Research_Presentation.pptx")
    pdf_path = os.path.abspath(r"RainfallRisk_Academic_Presentation\RainfallRisk_India_Research_Presentation.pdf")
    
    if not os.path.exists(pptx_path):
        print(f"Error: {pptx_path} not found.")
        sys.exit(1)
        
    print(f"Converting:\n  Input: {pptx_path}\n  Output: {pdf_path}")
    
    try:
        import win32com.client
        powerpoint = win32com.client.DispatchEx("PowerPoint.Application")
        # powerpoint.Visible = 1
        deck = powerpoint.Presentations.Open(pptx_path, WithWindow=False)
        # 32 is ppSaveAsPDF
        deck.SaveAs(pdf_path, 32)
        deck.Close()
        powerpoint.Quit()
        print(f"Successfully converted to PDF: {pdf_path} (Size: {os.path.getsize(pdf_path) / (1024*1024):.2f} MB)")
    except Exception as e:
        print(f"COM conversion failed: {e}")
        # Try comtypes as fallback if installed
        try:
            import comtypes.client
            powerpoint = comtypes.client.CreateObject("PowerPoint.Application")
            powerpoint.Visible = 1
            deck = powerpoint.Presentations.Open(pptx_path)
            deck.SaveAs(pdf_path, 32)
            deck.Close()
            powerpoint.Quit()
            print(f"Successfully converted to PDF with comtypes: {pdf_path}")
        except Exception as e2:
            print(f"comtypes fallback also failed: {e2}")
            sys.exit(1)

if __name__ == "__main__":
    convert_pptx_to_pdf()
