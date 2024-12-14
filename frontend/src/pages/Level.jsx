import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { path } from "../../lib/path";
import { useParams } from "react-router-dom";
import FormModel from "../components/FormModel";
import FormInput from "../components/FormInput";
import Table from "../components/Table";

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
      if(res.status != 200){
        throw err
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
      <h1>{data && data.data.name} courses</h1>
      <div className={venues && venues.length > 0 && ``}>
        {data && <Table data={data.data.courses} onclick={selectedCourse} />}
        {venues && venues.length > 0 && (
          <div className="p-5">
            available venues for <span className="font-bold">{courseName}</span>
          </div>
        )}
        {venues && venues.length <= 0 && (
          <div className="p-5">
            No available venue for{" "}
            <span className="font-bold">{courseName}</span>
          </div>
        )}
        <div className="mx-5 flex my-4  gap-4">
          {venues &&
            venues.map((venue) => (
              <div
                className=" p-2 bg-white cursor-pointer "
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
              </div>
            ))}
        </div>
      </div>

      {showConfirmMode && (
        <div className="bg-white/50 absolute top-0 w-full h-screen">
          <div className="grid place-content-center m-60 bg-blue-300">
            {err && err}
            <div>
              <h1 className="capitalize text-xl text-center">
                assign
                <span className="font-bold block">
                  venue: {venueName}
                </span> to <span className="font-bold block">{courseName}</span>
              </h1>
            </div>
            <div>
              <button type="button" onClick={() => allocateVenue.mutate()}>
                yes
              </button>
              <button type="button" onClick={() => setShowConfirmMode(false)}>
                no
              </button>
            </div>
          </div>
        </div>
      )}
  <div>
        <div className="absolute bottom-0 right-0">
        <button onClick={() => setShowModel(true)}>add course</button>
        </div>
  </div>
      {showModel && (
        <FormModel
          onsubmit={handleSubmit}
          title={"add course"}
          closeModel={() => setShowModel(false)}
        >
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
          <button type="submit">add</button>
        </FormModel>
      )}
      
    </div>
  );
};

export default Level;
