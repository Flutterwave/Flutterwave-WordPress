import React, { Component } from "react";

const Select = (props) => {
	const optionsList = props.options || null;
	const bottomNote = props.bottomNote || "";
	return (
		<div className="flw_dropdown_comp" style={{ width: "100%" }}>
			<label className="lb">{props.name}</label>
			<select
				onChange={props.onChange}
				style={{ width: "100%" }}
				value={props.value}
			>
				{optionsList.map((options) => {
					return (
						<option
							key={options.key}
							id={options.key}
							value={options.key}
						>
							{options.value}
						</option>
					);
				})}
			</select>
			<p className="hookInstruct">{bottomNote}</p>
		</div>
	);
};

export default Select;
