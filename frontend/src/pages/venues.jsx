import React, { useState } from "react";
import Header from "../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { path } from "../../lib/path";
import Title from "../components/Title";
import AddBtn from "../components/AddBtn";
import FormModel from "../components/FormModel";
import FormInput from "../components/FormInput";
import VenueTable from "../components/VenueTable";

const venues = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["venues"],
    queryFn: () =>
      axios(`${path}/get-venues`)
        .then((data) => data)
        .catch((err) => err),
  });

  console.log(data);
  const [showModel, setShowModel] = useState(false);
  const [name, setName] = useState();
  const [block, setBlock] = useState();
  const [capacity, setCapacity] = useState();
  const [equipments, setEquipments] = useState();
  const [err, setErr] = useState();

  const handleSubmit = (e) => {
    if (!block || !capacity) {
      setErr("please fill all fields");
    }
    e.preventDefault();
    newVenue.mutate({
      name,
      block,
      capacity,
      equipments,
    });
  };

  const addVenue = async (data) => {
    try {
      const res = await axios.post(`${path}/add-venue`, data);
    } catch (err) {
      throw err;
    }
  };

  const queryClient = useQueryClient();

  const newVenue = useMutation({
    mutationFn: addVenue,
    onSuccess: () => {
      queryClient.invalidateQueries(["venues"]);
      setShowModel(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div>
      <Header />
      <div className="p-6">
        {isPending && <p>loading...</p>}
        <Title title={`venues`} subtitle={"list of venues"} />

        <div>
         <VenueTable data={data && data.data} />   
        </div>
        <AddBtn onclick={() => setShowModel(true)} />
        {showModel && (
          <FormModel
            onsubmit={handleSubmit}
            title={"add course"}
            closeModel={() => setShowModel(false)}
          >
            {err && err}
            <FormInput
              htmlFor={"name"}
              label={"name"}
              type={"text"}
              onchange={(e) => setName(e.target.value)}
            />
            <FormInput
              htmlFor={"block"}
              label={"block"}
              type={"text"}
              onchange={(e) => setBlock(e.target.value)}
            />
            <FormInput
              htmlFor={"capacity"}
              label={"capacity"}
              type={"number"}
              onchange={(e) => setCapacity(e.target.value)}
            />
            <FormInput
              htmlFor={"equipment"}
              label={"equipment"}
              type={"text"}
              onchange={(e) => setEquipments(e.target.value.split(","))}
            />
            <button type="submit">add</button>
          </FormModel>
        )}
      </div>
    </div>
  );
};

export default venues;
