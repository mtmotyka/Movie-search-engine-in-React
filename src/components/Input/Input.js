import React from "react";

import "./input.scss";

const Input = (props) => {
  const {
    type,
    name,
    id,
    placeholder,
    value,
    onChange,
    required,
    className,
  } = props;
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;
