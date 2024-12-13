import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { path } from "../../lib/path";
import { useParams } from "react-router-dom";
import FormModel from "../components/FormModel";
import FormInput from "../components/FormInput";

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

  const selectedCourse = (courseName) => {
    setCourseName(courseName);
    setQueryEnable(true);
  };

  return (
    <div>
      <h1>{data && data.data.name} courses</h1>
      <div className={venues && venues.length > 0 && `flex`}>
        <div>
          {data &&
            data.data.courses.map((course) => (
              <div
                key={course._id}
                className="my-2 bg-gray-200"
                onClick={() => selectedCourse(course.slug)}
              >
                <p>
                  <span className="font-bold">course name: </span>
                  {course.name}
                </p>
                <p>
                  <span className="font-bold">course code: </span>
                  {course.code}
                </p>
                <p>
                  <span className="font-bold">number of student: </span>
                  {course.noOfStudents}
                </p>
                <p>
                  <span className="font-bold">course duration: </span>
                  {course.duration}
                </p>
                <p>
                  <span className="font-bold">special requirements: </span>
                  {course.specialReq.length !== 0 ? course.specialReq : "none"}
                </p>
              </div>
            ))}
        </div>
        <div>
          {venues &&
            venues.map((venue) => (
              <div>
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
