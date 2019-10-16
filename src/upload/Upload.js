import React, { Component } from "react";
import Dropzone from "./DropZone";
import UrlDownload from "./UrlDownload";

import { Container, Paper, Button } from '@material-ui/core';

class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.onFilesAdded = this.onFilesAdded.bind(this);
  }


  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  render() {
    const files = this.props.getFiles();
    return (
      <Container>
        <Paper className="Upload">
          <h1>De Russelfier</h1>
          <div className="Content">
            <Dropzone onFilesAdded={this.props.addFile} />
            <h3>or</h3>
            <UrlDownload addFile={this.props.addFile} />
          </div>
          <div className="Content">
            <h3>Files Loaded</h3>
            {files.length === 0 ? "No Files" : files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                </div>
              );
            })}
          </div>

          <div className="Actions">
            <Button
              variant="contained"
              color="primary"
              disabled={files.length === 0}
              onClick={this.props.switchView}
            >
              Next
            </Button>
          </div>
        </Paper>
      </Container>
    );
  }
}

export default Upload;