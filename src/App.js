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
    return (
      <div>
        {this.state.viewer ? <Viewer files={this.state.files} /> : <Upload addFile={this.addFile} getFiles={this.getFiles} switchView={this.switchView} />}
      </div>
    );
  }
}

export default App;
