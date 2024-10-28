import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

import App from "./App";
import Footer from "./Footer";

const root = document.querySelector("body > main"),
  footer = document.querySelector("body > footer");

ReactDOM.createRoot(root).render(App);
ReactDOM.createRoot(footer).render(Footer);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
