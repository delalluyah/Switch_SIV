import React from "react";

let inputStyle = {
  width: "100%",
  padding: "4px 10px",
  height: "35px",
  marginBottom: "20px",
  marginTop: "5px",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: "3px",
};

export default ({
  onChange = () => {},
  value = "",
  placeholder = "",
  name,
  label,
  data = [{}],
  valueFieldName = "id",
  textFieldName = "name",
  optionLabel = "-- SELECT --",
}) => {
  return (
    <div className="form-input">
      <label>{label}</label>
      <br />
      <select
        style={inputStyle}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        value={value}
      >
        <option value="" disabled="disabled">
          {optionLabel}
        </option>
        {data.map((el, index) => {
          /* if (el[valueFieldName] === value)
            return (
              <option value={el[valueFieldName]} selected>
                {el[textFieldName]}
              </option>
            ) */

          return (
            <option key={index} value={el[valueFieldName]}>
              {el[textFieldName]}
            </option>
          );
        })}
      </select>
    </div>
  );
};
