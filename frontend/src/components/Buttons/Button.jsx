import React from "react";

const Button = ({ text, buttonFunc, design }) => {
  return (
    <button onClick={buttonFunc} className={`py-2 px-4 ${design} rounded-3xl `}>
      {text}
    </button>
  );
};

export default Button;
