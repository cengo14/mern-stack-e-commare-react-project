import React, { useState } from "react";

const QuantityButton = ({ quantity, increment, decrement }) => {
  return (
    <div className="flex items-center justify-center gap-2 w-2/12">
      <button
        onClick={decrement}
        className="border-2 p-1 w-6 rounded-md bg-red-200"
      >
        -
      </button>
      <span className="font-extrabold text-2xl">{quantity}</span>
      <button
        onClick={increment}
        className="border-2 p-1 w-6 rounded-md bg-green-200"
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
