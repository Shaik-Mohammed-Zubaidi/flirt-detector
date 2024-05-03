import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InputForm from "./Components/InputForm";
import Result from "./Components/Result";
import "./App.css";

function App() {
	return (
		<div className="app">
			<Router>
				<Routes>
					<Route path="/" element={<InputForm />} />
					<Route path="/result" element={<Result />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
