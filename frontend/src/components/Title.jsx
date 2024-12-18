import React from "react";

const Title = ({title,subtitle}) => {
  return (
    <div className="capitalize">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default Title;
