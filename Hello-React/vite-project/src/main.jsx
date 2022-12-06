import React from "react";
import ReactDOM from "react-dom/client";
import "./css/main.css";

import { Grid, Background } from "./components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<>
		<Background />
		<Grid />
	</>
	// </React.StrictMode>
);
