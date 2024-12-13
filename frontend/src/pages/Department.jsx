import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
      {/* {isPending && <p>Loading....</p>} */}
      {department &&
        department.data.levels.map((level) => (
          <div>
            <p>
              <span>classname: </span>
              <Link to={`/level/${level.slug}`}> {level.name}</Link>
            </p>
            <p>
              <span>number of students : </span>
              {level.noOfStudent}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Department;
