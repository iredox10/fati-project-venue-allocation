import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Header from "../components/Header";
import Title from "../components/Title";
const Department = () => {
  // const {data:department, error, loading} = useFetch(`/get-department/${id}`)
  const { id } = useParams();
  const {
    isPending,
    data: department,
    error,
  } = useQuery({
    queryKey: ["department", id],
    queryFn: () =>
      axios
        .get(`http://localhost:3003/get-department/${id}`)
        .then((data) => data)
        .catch((err) => err),
  });
  console.log(department);
  return (
    <div>
      <Header />
      {isPending && <p>Loading....</p>}
      <div className="p-6">
        <Title
          title={department && department.data.name}
          subtitle={"department page"}
        />

        <div className="flex gap-4 my-5">
          <Link className="bg-white hover:bg-gray-100 shadow-lg p-10" to={`/department/classes/${id}`}>
            Classes
          </Link>
          <Link className="bg-white hover:bg-gray-100 shadow-lg p-10" to={`/department/students/${id}`}>
            Students
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Department;
