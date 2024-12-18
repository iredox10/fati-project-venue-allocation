import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddBtn from "../components/AddBtn";
import FormModel from "../components/FormModel";
import FormInput from "../components/FormInput";
import { path } from "../../lib/path";
import axios from "axios";
import Title from "../components/Title";

const Admin = () => {
  const {
    isPending,
    error,
    data: departments,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: () =>
      fetch("http://localhost:3003/get-departments").then((res) => res.json()),
  });
  console.log(departments);

  const [showModel, setShowModel] = useState(false);
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [err, setErr] = useState();
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    newDeparment.mutate({
      name,
      desc,
    });
  };

  const addDepartment = async (data) => {
    try {
      const res = await axios.post(`${path}/add-department`, data);
      console.log(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const newDeparment = useMutation({
    mutationFn: addDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
      setShowModel(false);
    },
    onError: (err) => {
      setErr(err.response.data);
      console.log(err);
    },
  });

  return (
    <div>
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-sm">Welcome back,</p>
      </header>{" "}
      <div className="p-6">
       <Title title={'Departments'} subtitle={'List of departments'} /> 
        {isPending && <p>Loading...</p>}
        <div className="flex gap-3">
          {departments &&
            departments.map((d) => (
              <div className="bg-white shadow-lg p-5">
                <Link to={`/department/${d.slug}`}>{d.name}</Link>
              </div>
            ))}
        </div>
      </div>
      <AddBtn onclick={() => setShowModel(true)} />
      {showModel && (
        <FormModel
          onsubmit={handleSubmit}
          title={"add department"}
          closeModel={() => setShowModel(false)}
        >
          <FormInput
            htmlFor={"name"}
            label={"name"}
            type={"text"}
            onchange={(e) => setName(e.target.value)}
          />
          <FormInput
            htmlFor={"description"}
            label={"description"}
            type={"text"}
            onchange={(e) => setDesc(e.target.value)}
          />
          <button type="submit">add</button>
        </FormModel>
      )}
    </div>
  );
};

export default Admin;
