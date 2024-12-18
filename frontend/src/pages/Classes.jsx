import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Header from "../components/Header";
import Title from "../components/Title";
import AddBtn from "../components/AddBtn";
import FormModel from "../components/FormModel";
import FormInput from "../components/FormInput";
import { path } from "../../lib/path";
const Classes = () => {
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

  const [showModel, setShowModel] = useState(false);
  const [name, setName] = useState()
  const [noOfStudent, setNoOfStudent] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    newLevel.mutate({
      name,
      noOfStudent,
    });
  };

  const addLevel = async (data) => {
    try {
      const res = await axios.post(`${path}/add-level/${id}`, data);
      console.log(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const queryClient = useQueryClient()

  const newLevel = useMutation({
    mutationFn: addLevel,
    onSuccess: () => {
      queryClient.invalidateQueries(["department"]);
      setShowModel(false);
    },
    onError: (err) => {
      setErr(err.response.data);
      console.log(err);
    },
  });

  return (
    <div>
      <Header />
      {isPending && <p>Loading....</p>}
      <div className="p-6">
        <Title
          title={`${department && department.data.name} classes`}
          subtitle={`list of ${department && department.data.name} classes`}
        />
        <div className="flex gap-5 my-5">
          {department &&
            department.data.levels.map((level) => (
              <div className="bg-white shadow-lg p-4">
                <p className="text-2xl font-bold ">
                  <Link to={`/level/${level.slug}`}> {level.name}</Link>
                </p>
                {/* <p>
              <span>number of students : </span>
              {level.noOfStudent}
            </p> */}
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
            htmlFor={"noOfStudent"}
            label={"Number Of Student"}
            type={"number"}
            onchange={(e) => setNoOfStudent(e.target.value)}
          />
          <button type="submit">add</button>
        </FormModel>
      )}
    </div>
  );
};

export default Classes;
