import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[800]
        },
        secondary: {
            main: purple[200]
        },
        error: {
            main: red[400],
        },
        background: {
            default: '#fefefe',
        },
    }
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
