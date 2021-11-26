// import React, { useState, useEffect } from "react";
import { useCallback, useState, useEffect } from "@wordpress/element";
import axios from "axios";
const Checkbox = (props) => {
  //const [isChecked, setIsChecked] = useState(props.checked);

  useEffect(() => {
    // console.log("hey");
  });

  return (
    <div className="settingItem">
      <label className="lb">{props.name}</label>
      <div className="cb">
        <input
          checked={props.value}
          type="checkbox"
          name={props.sname}
          //   onChange={() =>
          //     props.checked ? checkEvent : console.log(props.checked)
          //   }
          onChange={props.onChange}
        />
        <p>{props.details}</p>
      </div>
    </div>
  );
};

export default Checkbox;
