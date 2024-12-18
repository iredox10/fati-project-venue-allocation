import React from "react";

const FormInput = ({ htmlFor, label, type ,onchange}) => {
  return (
      <div className="flex flex-col capitalize mb-3">
        <label className="text-blue-600 mb-2" htmlFor={htmlFor}>{label}</label>
        <input  type={type} onChange={onchange} className="border-2 capitalize border-blue-100 p-2" />
    </div>
  );
};

export default FormInput;
