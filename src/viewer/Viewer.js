import React from 'react';

import { pdfjs, Document, Page } from "react-pdf";
import { Container, Paper } from '@material-ui/core';

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
            dimensions: []
        }
        this.updateDimensions = this.updateDimensions.bind(this);
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
        window.addEventListener('resize', this.updateDimensions);
        this.setState({
            pageNumbers: uniquePages.slice(1), // TODO fix bug inserting null first page
            loading: false,
            file: file,
        })
        this.updateDimensions();
    }

    updateDimensions() {
        let width = window.innerWidth - 50;
        let height = window.innerHeight - 100;
        if (width * 0.75 < height) {
            this.setState({ dimensions: [width * 0.75, width] })
        } else {
            this.setState({ dimensions: [height, height * 4 / 3] });
        }
    }

    render() {
        const { loading, file, pageNumbers, dimensions } = this.state;
        if (loading) {
            return <div>Loading</div>
        }
        return (
            <Container>
                <Paper className="Viewer">
                    <Document file={file}>
                        <div style={{ height: dimensions[0], overflow: 'auto' }}>
                            {pageNumbers.map(n => <Page pageNumber={n} height={dimensions[0]} width={dimensions[1]} />)}
                        </div>
                    </Document>
                </Paper>
            </Container>
        );
    }
}

export default Viewer;
