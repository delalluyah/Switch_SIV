import React from "react";

let inputStyle = {
  width: "100%",
  padding: "4px 10px",
  height: "35px",
  marginBottom: "20px",
  marginTop: "5px",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: "3px",
  backgroundColor: "#fff",
};

export default ({
  onChange = () => {},
  value,
  placeholder = "",
  name,
  type = "text",
  label,
  ...rest
}) => {
  return (
    <div className={type !== "hidden" ? "form-input" : ""}>
      {type !== "hidden" ? (
        <>
          {" "}
          <label>{label}</label>
          <br />
        </>
      ) : null}
      <input
        style={inputStyle}
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        {...rest}
      />
    </div>
  );
};
