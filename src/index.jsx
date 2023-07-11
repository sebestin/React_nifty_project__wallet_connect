import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
    <MoralisProvider appId="37354EVVNS43nha9ldAJeDZykr3zomV9qP7yvfxf" serverUrl="https://xrsgxr6the5p.usemoralis.com:2053/server">
        <App />
    </MoralisProvider>, 
document.getElementById("root"));
