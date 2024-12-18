import React from "react";

const Btn = ({text}) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className="px-10 py-2 capitalize bg-blue-500 text-white"
      >
        {text}
      </button>
    </div>
  );
};

export default Btn;
