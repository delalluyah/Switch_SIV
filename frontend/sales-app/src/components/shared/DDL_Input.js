import React from "react";
import Select from "react-select";

export default ({
  onChange = () => {},
  value,
  placeholder = "",
  name,
  type = "text",
  label,
  data,

  ...rest
}) => {
  const onChangeInput = (inputVal, actionMeta) => {
    onChange(inputVal.value);
  };
  return (
    <>
      <label>
        {label}
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={data[0]}
          isSearchable={true}
          name={name}
          options={data}
          onChange={onChangeInput}
          {...rest}
        />
      </label>
    </>
  );
};
