import React, { Component } from 'react';

import { InputLabel, InputAdornment, FormControl, Input, IconButton, Paper } from '@material-ui/core'
import { AttachFile, GetApp, Error, Check } from '@material-ui/icons';

class UrlDownload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'loading',
            file: null,
            url: null
        }
        this.downloadFile = this.downloadFile.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const file = this.state.file;
        if (file !== null && prevState.file !== file) {
            this.props.addFile([file]);
        }
    }

    getIcon() {
        switch (this.state.status) {
            case "loading":
                return (
                    <IconButton onClick={this.downloadFile} disabled={this.state.url === null || this.state.url === ""}>
                       <GetApp/>
                    </IconButton>
                )
            case "success":
                return <Check />
            default:
                return <Error />

        }
    }

    downloadFile() {
        const split = this.state.url.split("/");
        const fileName = split[split.length - 1];
        //fetch file
        fetch(this.state.url, { method: 'GET' })
            .then(response => {
                if (response.status !== 200) {
                    this.setState({ status: 'error' });
                    return null;
                } else {
                    return response.blob();

                }
            })
            .then(blob => {
                if (blob !== null) {
                    blob.lastModifiedDate = new Date();
                    blob.name = fileName;
                    this.setState({ status: 'success', file: blob })
                }
            })
            .catch(e => this.setState({ status: 'error' }));
    }

    render() {
        return (
            <Paper className="Input">
                <FormControl className="InputRoot">
                    <InputLabel>Url</InputLabel>
                    <Input
                        onChange={e => this.setState({ url: e.target.value, status: 'loading' })}
                        startAdornment={
                            <InputAdornment position="start">
                                <AttachFile />
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {this.getIcon()}

            </Paper>


        )
    }
}

export default UrlDownload;
