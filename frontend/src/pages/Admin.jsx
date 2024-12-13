import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Admin = () => {
  // const {data:departments, error, loading} = useFetch('/get-departments')
  // const { data, error, loading } = useQuery({
  //   queryKey: ["departments"],
  //   queryFn: () =>
  //     axios
  //       .get("http://localhost:3003/get-departments")
  //       .then((data) => console.log(data))
  //       .catch((err) => console.log(err)),
  // });
  const { isPending, error, data:departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () =>
      fetch("http://localhost:3003/get-departments").then((res) =>
        res.json()
      ),
  });
  console.log(departments);

  return (
    <div>
      <h1>departments</h1>
      {isPending && <p>Loading...</p>}
      {departments && departments.map(d => (
        <div>
          <Link to={`/department/${d.slug}`}>{d.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Admin;
