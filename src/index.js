
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/core/theme'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { hydrate, render } from "react-dom";

const APP = (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
    </ThemeProvider>
  </React.StrictMode>
)
 
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(APP, rootElement);
} else {
  render(APP, rootElement);
}

// ReactDOM.render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//     <Router>
//       <App />
//     </Router>
//     </ThemeProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
