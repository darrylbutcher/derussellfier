import React from 'react';
import './App.css';

import Upload from './upload/Upload'
import Viewer from './viewer/Viewer'
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      viewer: false
    }
    this.addFile = this.addFile.bind(this);
    this.getFiles = this.getFiles.bind(this);
    this.switchView = this.switchView.bind(this);
  }

  switchView() {
    this.setState(prevState => ({ viewer: !prevState.viewer }))
  }

  getFiles() {
    return this.state.files;
  }

  addFile(file) {
    this.setState(prevState => ({ files: prevState.files.concat(file) }))
  }

  render() {
    // I know i should use react router but having multiple pages doesn't work on the static uni server...
    if (this.state.viewer) {
      return (
        <Viewer files={this.state.files} />
      )
    } else {
      return (
        <Upload
          addFile={this.addFile}
          getFiles={this.getFiles}
          switchView={this.switchView}
        />
      )
    }
  }
}

export default App;
