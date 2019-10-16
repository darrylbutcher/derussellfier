import React from 'react';

import { pdfjs, Document, Page } from "react-pdf";
import { Container, Paper, Button } from '@material-ui/core';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

class Viewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pageNumbers: [],
            pages: [],
            pageIndex: 1,
        }
        this.download = this.download.bind(this);
    }

    async componentDidMount() {
        let uniquePages = [];
        let prevPageText = [];

        const file = await getBase64(this.props.files[0]);
        const doc = await pdfjs.getDocument(file);
        for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i);
            const textContext = await page.getTextContent();
            const rawText = textContext.items.map(s => s.str);
            rawText.pop(); // remove page number
            if (!rawText.every(e => prevPageText.includes(e))) {
                uniquePages.push(i - 1);
            }
            prevPageText = rawText;

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

    download = () => {
        const file = this.state.file;
        var binary = atob(file.substring(file.indexOf(",") + 1));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        var blob = new Blob([view], { type: "application/pdf" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "test.pdf");
        document.body.appendChild(link);
        link.click();
    }

    render() {
        const { pageIndex, pageNumbers } = this.state;
        if (this.state.loading) {
            return <div>Loading</div>
        }
        return (
            <Container>
                <Paper className="Viewer">
                    <Document file={this.state.file}>
                        <Page pageNumber={pageNumbers[pageIndex]} width={1000} />
                    </Document>
                    <div className="Toolbar">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.goToPrevPage}
                            disabled={pageIndex === 1}
                        >
                            Prev
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.goToNextPage}
                            disabled={pageIndex === pageNumbers.length - 1}
                        >
                            Next
                        </Button>
                    </div>
                </Paper>
            </Container>
        );
    }
}

export default Viewer;
