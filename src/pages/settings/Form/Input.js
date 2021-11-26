import React, { Component, useState } from "react";

const Input = (props) => {
  const bottomNote = props.bottomNote || "";
  const inputWidth = props.inputWidth || "225%";
  const defaultValue = props.defaultValue || "";
  const placeholder = props.placeholder || "";
  return (
    <div className="settingItem">
      <label className="lb">{props.name}</label>
      <input
        type={props.type}
        value={props.value}
        placeholder={placeholder}
        style={{ width: inputWidth }}
        onChange={props.onChange}
      />
      <p className="hookInstruct">{bottomNote}</p>
    </div>
  );
};

export default Input;
