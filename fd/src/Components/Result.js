// src/components/Form1.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import './Form.css'

const Result = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isTextFlirty, setIsTextFlirty] = useState(undefined);

	useEffect(() => {
		// Check if the text is flirty
		const checkFlirtyText = async () => {
			try {
				const response = await axios.post(
					"/api/v1/flirty-text",
					location.state
				);
				setIsTextFlirty(response.data.isFlirty);
			} catch (error) {
				console.error("Error checking flirty text:", error);
			}
		};
		checkFlirtyText();
	}, [location.state]);
	return (
		<div className="form-container">
			<h1>Flirty finder</h1>
			{isTextFlirty === undefined ? (
				<div>
					Checking if your text is flirty... <Spin size="large" />
				</div>
			) : isTextFlirty ? (
				<p>Your text is flirty!</p>
			) : (
				<p>Your text is not flirty.</p>
			)}
			<button type="submit" onClick={() => navigate("/")}>Back to Querying</button>
		</div>
	);
};

export default Result;
