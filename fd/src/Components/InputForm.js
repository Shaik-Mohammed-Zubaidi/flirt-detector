// src/components/Form1.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InputForm = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		userName: "",
		query: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Check if any form field is empty
		const isEmptyField = Object.values(formData).some(
			(value) => value === ""
		);
		if (isEmptyField) {
			alert("Please fill in all fields");
			return; // Exit the function if any field is empty
		}

		// Proceed with form submission if all fields are filled
		// console.log("Form 1 data:", formData); // For testing purposes
		// navigate("/form2");
		navigate("/result", { state: formData });
	};

	return (
		<div className="form-container">
			<h1>Flirty finder</h1>
			<form onSubmit={handleSubmit} className="form">
				<div>Check below if your messages is flirty enough</div>

				<label>
					Name: &nbsp;&nbsp;
					<input
						type="text"
						name="userName"
						value={formData.name}
						onChange={handleChange}
					/>
				</label>
				<label>
					Query: &nbsp;&nbsp;
					<input
						type="text"
						name="query"
						value={formData.address}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Check!</button>
			</form>
		</div>
	);
};

export default InputForm;
