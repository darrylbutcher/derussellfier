import React, { Component } from "react";
import Dropzone from "./DropZone";
import "./Upload.css";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.onFilesAdded = this.onFilesAdded.bind(this);
  }


  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.props.addFile}
            />
          </div>
          <div className="Files">
            {this.props.getFiles().map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">
        <button
          disabled={this.props.getFiles() < 0 }
          onClick={this.props.switchView}
        >
          Upload
        </button>
        </div>
      </div>
    );
  }
}

export default Upload;