// src/components/FlirtyTextChecker.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";

const FlirtyTextChecker = ({ userName, query }) => {
	const [isTextFlirty, setIsTextFlirty] = useState(undefined);

	useEffect(() => {
		// Check if the text is flirty
		const checkFlirtyText = async () => {
			try {
				const response = await axios.post(
					"/api/v1/query",
					{ userName, query }
				);
				setIsTextFlirty(response.data.isFlirty);
			} catch (error) {
				console.error("Error checking flirty text:", error);
			}
		};
		checkFlirtyText();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			{isTextFlirty === undefined ? (
				<div>
					Checking if your text is flirty... <Spin size="large" />
				</div>
			) : isTextFlirty ? (
				<p>Your text is flirty!</p>
			) : (
				<p>Your text is not flirty.</p>
			)}
		</>
	);
};

export default FlirtyTextChecker;
