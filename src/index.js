import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './style/app.scss';
import '@fontsource/roboto';


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />)