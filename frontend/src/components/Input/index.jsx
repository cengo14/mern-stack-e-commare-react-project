import React from "react";

const Input = ({
  placeholder,
  value,
  type,
  name,
  id,
  onChange,
  design,
  multiple,
  accept,
  dValue,
}) => {
  return (
    <input
      defaultValue={dValue}
      onChange={onChange}
      className={`${design} p-2 outline-none rounded-md border`}
      placeholder={placeholder}
      value={value}
      name={name}
      type={type}
      id={id}
      multiple={multiple}
      accept={accept}
    />
  );
};

export default Input;
