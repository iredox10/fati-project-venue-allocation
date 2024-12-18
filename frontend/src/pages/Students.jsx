import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { path } from "../../lib/path";
import { useParams } from "react-router-dom";
import query from "../hooks/query";
import useFetch from "../hooks/useFetch";
import FormModel from "../components/FormModel";
import FormInput from "../components/FormInput";
import axios from "axios";
import StudentsTable from "../components/StudentsTable";

const Students = () => {
  const { id } = useParams();

  const { data: departments, loading, err } = useFetch(`/get-departments`);
  const { data: students, loading:sLoading, err:sErr } = useFetch(`/get-students/${id}`);
  console.log(students);
  const {
    data: levels,
    loading: lLoading,
    err: lErr,
  } = useFetch(`/get-levels/${id}`);

  const [showModel, setShowModel] = useState(false);
  const [fullName, setFullName] = useState("");
  const [candidateNo, setCandidateNo] = useState();
  const [department, setDepartment] = useState();
  const [level, setLevel] = useState();
  const [password, setPassword] = useState("pass");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${path}/add-student/${id}`, {
        fullName,
        candidateNo,
        department,
        level,
        password,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
    {students && 
    <StudentsTable  data={students.students}/> 
    }
      <div className="absolute bottom-0 right-0">
        <button onClick={() => setShowModel(true)}>add student</button>
      </div>
      {showModel && (
        <FormModel
          onsubmit={handleSubmit}
          title={"add course"}
          closeModel={() => setShowModel(false)}
        >
          <FormInput
            htmlFor={"fullName"}
            label={"fullName"}
            type={"text"}
            onchange={(e) => setFullName(e.target.value)}
          />
          <FormInput
            htmlFor={"candidateNo"}
            label={"candidateNo"}
            type={"text"}
            onchange={(e) => setCandidateNo(e.target.value)}
          />
          <div className="my-3 flex flex-col">
            <label htmlFor="select department"> department</label>
            <select
              name=""
              id=""
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option selected disabled>
                select department
              </option>
              {departments.map((d) => (
                <option value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="my-3 flex flex-col">
            <label htmlFor="select department">level</label>
            <select name="" id="" onChange={(e) => setLevel(e.target.value)}>
              <option selected disabled>
                select department
              </option>
              {levels &&
                levels.levels.map((l) => (
                  <option value={l.name}>{l.name}</option>
                ))}
            </select>
          </div>

          {/* <FormInput
            htmlFor={"password"}
            label={"password"}
            type={"password"}
            onchange={(e) => setPassword(e.target.value)}
          /> */}
          <button type="submit">add</button>
        </FormModel>
      )}
    </div>
  );
};

export default Students;
