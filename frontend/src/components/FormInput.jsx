import React from "react";

const FormInput = ({ htmlFor, label, type ,onchange}) => {
  return (
      <div className="flex flex-col">
        <label htmlFor={htmlFor}>{label}</label>
        <input type={type} onChange={onchange} className="border-2" />
    </div>
  );
};

export default FormInput;
