from PyPDF2 import PdfFileReader, PdfFileWriter
 
def extract_information(pdf_path):
    with open(pdf_path, 'rb') as f:
        pdf = PdfFileReader(f)
        pdf_writer = PdfFileWriter()
        if pdf.isEncrypted:
            pdf.decrypt('')
 
        previousPage = pdf.getPage(0)
        previousText = previousPage.extractText()[:-(len(str(0))+1)]
 
        for page in range(pdf.getNumPages()):
            text = pdf.getPage(page).extractText()[:-(len(str(page))+1)]
            if previousText != text:
                pdf_writer.addPage(previousPage)
            previousText = text
            previousPage = pdf.getPage(page)
        pdf_writer.addPage(previousPage)
 
        with open('correctslides.pdf', 'wb') as out:
            pdf_writer.write(out)
 
 
if __name__ == '__main__':
    path = 'slides.pdf'
    extract_information(path)