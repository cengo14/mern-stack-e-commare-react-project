import React from "react";
import { MdClose } from "react-icons/md";
import Button from "../Buttons/Button";
import { useDispatch } from "react-redux";

const Modal = ({ title, content, close, handleProductAdd }) => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex justify-center items-center">
      <div className="bg-white w-2/4 min-h-[60vh] max-md:w-2/3  p-5 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{title}</h1>
          <MdClose
            onClick={close}
            size={30}
            className=" border border-transparent rounded-full hover:border-black cursor-pointer"
          />
        </div>
        {content}
        <Button
          text={title}
          design={"bg-green-500 hover:bg-green-600 text-white w-full "}
          buttonFunc={handleProductAdd}
        />
      </div>
    </div>
  );
};

export default Modal;
