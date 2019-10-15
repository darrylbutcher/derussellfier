import React from 'react';

import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       debugger;
       reader.readAsDataURL(file);
    });
  }

class Viewer extends React.Component {

    constructor(props) {
        super(props);
        debugger;
        this.state = {
            loading: true,
            pageNumbers: [],
            pageIndex: 1,
            
        }
    }

    async componentDidMount() {
        let uniquePages = [];
        let prevPage = [];
        debugger;
        const file = await getBase64(this.props.files[0]);
        const doc = await pdfjs.getDocument(file);
        for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i);
            const textContext = await page.getTextContent();
            const rawText = textContext.items.map(s => s.str);
            rawText.pop(); // remove page number
            if (!rawText.every(e => prevPage.includes(e))) {
                uniquePages.push(i - 1);
                prevPage = rawText;
            }
        }
        this.setState({
            pageNumbers: uniquePages,
            loading: false,
            file: file
        })
    }


    goToPrevPage = () => this.setState(state => ({ pageIndex: state.pageIndex - 1 }));

    goToNextPage = () =>
        this.setState(state => ({ pageIndex: state.pageIndex + 1 }));

    render() {
        const { pageIndex, pageNumbers } = this.state;
        if (this.state.loading) {
            return <div>Loading</div>
        }
        debugger;
        return (
            <div>
                <div style={{ width: 600 }}>
                    <nav>
                        <button onClick={this.goToPrevPage}>Prev</button>
                        <button onClick={this.goToNextPage}>Next</button>
                    </nav>
                    <Document file={this.state.file}>
                        <Page pageNumber={pageNumbers[pageIndex]} width={600}/>
                    </Document>
                </div>
            </div>
        );
    }
}

export default Viewer;
