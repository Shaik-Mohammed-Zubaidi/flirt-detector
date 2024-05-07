// src/components/Form1.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FlirtyTextChecker from "./FlirtyTextChecker";
import './Form.css'

const Result = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const query = state?.query;
	const userName = state?.userName;

	return (
		<div className="form-container">
			<h1>Flirty finder</h1>
			<FlirtyTextChecker userName={userName} query={query} />
			<button type="submit" onClick={() => navigate("/")}>Back to Querying</button>
		</div>
	);
};

export default Result;
