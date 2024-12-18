import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Title from "../components/Title";

const AdminMainPage = () => {
  return (
    <div>
      <Header />
      <div className="m-5">
        <Title title={"Admin welcome"} subtitle={"welcome back admin,"} />
        <div className="my-10 flex gap-5">
          <Link className="p-5 bg-white shadow-lg hover:bg-gray-100" to={`/venues`}>Venues</Link>
          <Link className="p-5 bg-white shadow-lg hover:bg-gray-100" to={`/departments`}>Departments</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;
