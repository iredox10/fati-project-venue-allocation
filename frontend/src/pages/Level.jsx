import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { path } from "../../lib/path";
import { useParams } from "react-router-dom";
import FormModel from "../components/FormModel";
import FormInput from "../components/FormInput";
import Table from "../components/Table";
import Header from "../components/Header";
import Title from "../components/Title";
import AddBtn from "../components/AddBtn";
import Btn from "../components/Btn";
import ErrMsg from "../components/ErrMsg";

const Level = () => {
  const [showModel, setShowModel] = useState(false);
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [duration, setDuration] = useState();
  const [specialReq, setSpecialReq] = useState();
  const [noOfStudents, setNoOfStudents] = useState();
  const [err, setErr] = useState("");

  const queryClient = useQueryClient();

  const { level } = useParams();
  const { isPending, data, error } = useQuery({
    queryKey: ["level"],
    queryFn: () =>
      axios(`${path}/get-courses/${level}`)
        .then((data) => data)
        .catch((err) => err),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name ||!code || !duration || !noOfStudents){
      setErr('fields cannot be empty')
      return
    }
    newCourseMutate.mutate({
      name,
      code,
      duration,
      specialReq,
      noOfStudents,
    });
  };

  const addCourse = async (courseData) => {
    try {
      const response = await axios.post(
        `${path}/add-course/${level}`,
        courseData
      );
      return response.data; // Return the actual data if needed
    } catch (err) {
      console.error("Error adding course: ", err);
      throw err; // This will help react-query manage the error state
    }
  };

  const newCourseMutate = useMutation({
    mutationFn: addCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["level"]);
      setShowModel(false);
    },
    onError: (error) => {
      setErr(error.response.data);
      console.log(error.response.data);
    },
  });

  const [queryEnable, setQueryEnable] = useState(false);
  const [courseName, setCourseName] = useState("");

  const getAvailableVenues = async (courseName) => {
    try {
      const res = await axios(`${path}/find-available-venues/${courseName}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const {
    data: venues,
    loading,
    err: venuesErr,
  } = useQuery({
    queryKey: ["venues", courseName],
    queryFn: () => getAvailableVenues(courseName),
    enabled: queryEnable,
  });
  const handleAllocateVenue = async () => {
    try {
      const res = await axios.post(
        `${path}/allocate-venue/${venueName}/${courseName}`
      );
      if (res.status != 200) {
        throw err;
      }
      console.log(res);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const allocateVenue = useMutation({
    mutationFn: handleAllocateVenue,
    onSuccess: () => {
      queryClient.invalidateQueries(["level"]);
      setShowConfirmMode(false);
    },
    onError: (err) => {
      setErr(err.response.data.message);
      console.log(err);
    },
  });

  const selectedCourse = (courseName) => {
    setCourseName(courseName);
    setQueryEnable(true);
  };

  const handleCourse = (slug) => {
    selectedCourse(slug);
  };

  const [showConfirmMode, setShowConfirmMode] = useState(false);
  const [venueName, setVenueName] = useState();

  return (
    <div>
      <Header />
      <div className="p-6">
        <Title
          title={`${data && data.data.name} courses`}
          subtitle={`list of ${data && data.data.name} courses`}
        />

        <div className={venues && venues.length > 0 && ``}>
          {data && <Table data={data.data.courses} onclick={selectedCourse} />}
          {venues && venues.length > 0 && (
            <div className="p-5">
              available venues for{" "}
              <span className="font-bold">{courseName}</span>
            </div>
          )}
          {venues && venues.length <= 0 && (
            <div className="p-5">
              No available venue for{" "}
              <span className="font-bold">{courseName}</span>
            </div>
          )}

          <div className="mx-5 grid grid my-4 bg-green-200 justify- gap-4">
            {venues &&
              venues.map((venue) => (
                <div
                  className=" p-5 bg-white  cursor-pointer shadow-lg w-full capitalize"
                  onClick={() => {
                    setShowConfirmMode(true);
                    setVenueName(venue.name);
                  }}
                >
                  <p>
                    <span>name:</span> {venue.name}
                  </p>
                  <p>
                    <span>block:</span> {venue.block}
                  </p>
                  <p>
                    <span>capacity:</span> {venue.capacity}
                  </p>
                  <p>
                    <span>allocated:</span>{" "}
                    {venue.isAllocated ? "is allocated" : "no"}
                  </p>
                  <p>
                    <span>course:</span> {venue.allocatedCourse}
                  </p>
                  <p>
                    <span>equipments:</span>{" "}
                    {venue.equipments
                      ? venue.equipments.map((e) => <p>{e},</p>)
                      : ""}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {showConfirmMode && (
          <div className="bg-white/50 absolute top-0 left-0 w-full h-screen">
            <div className="grid place-content-center m-60 p-5 bg-white shadow-lg">
              {err && err}
              <div>
                <h1 className="capitalize text-xl text-center">
                  <span className="font-bold block">assign</span>
                </h1>
                <h1 className="text-2xl capitalize my-5">
                  venue: {venueName}
                  <span className="font-bold"> to </span> {courseName}
                </h1>
              </div>
              <div className="flex justify-center items-center gap-5">
                <button
                  className="px-6 py-2 capitalize font-bold bg-blue-600 text-white"
                  type="button"
                  onClick={() => allocateVenue.mutate()}
                >
                  yes
                </button>
                <button
                  className="px-6 py-2 capitalize font-bold bg-black text-white"
                  type="button"
                  onClick={() => setShowConfirmMode(false)}
                >
                  no
                </button>
              </div>
            </div>
          </div>
        )}
        <AddBtn onclick={() => setShowModel(true)} />
        {showModel && (
          <FormModel
            onsubmit={handleSubmit}
            title={"add course"}
            closeModel={() => setShowModel(false)}
          >
            {err && <ErrMsg err={err}/>}
            <FormInput
              htmlFor={"courseName"}
              label={"course name"}
              type={"text"}
              onchange={(e) => setName(e.target.value)}
            />
            <FormInput
              htmlFor={"courseCode"}
              label={"course code"}
              type={"text"}
              onchange={(e) => setCode(e.target.value)}
            />
            <FormInput
              htmlFor={"number of students"}
              label={"number of students code"}
              type={"text"}
              onchange={(e) => setNoOfStudents(e.target.value)}
            />
            <FormInput
              htmlFor={"duration"}
              label={"duration"}
              type={"text"}
              onchange={(e) => setDuration(e.target.value)}
            />
            <FormInput
              htmlFor={"specialReq"}
              label={"special requirment"}
              type={"text"}
              onchange={(e) => setSpecialReq(e.target.value.split(","))}
            />
           <Btn text={'add course'}/> 
          </FormModel>
        )}
      </div>{" "}
    </div>
  );
};

export default Level;
