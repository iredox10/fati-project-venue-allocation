import React from "react";

const VenueTable = ({ data, onclick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Block Name</th>
            <th className="py-3 px-6 text-left">Capacity</th>
            <th className="py-3 px-6 text-left">is Allocated</th>
            <th className="py-3 px-6 text-left">course allocated </th>
            <th className="py-3 px-6 text-left">equipment</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light cursor-pointer">
          {data && data.map((venue, i) => (
            <tr
              onClick={() => onclick(venue.slug)}
              key={venue._id}
              className="border-b border-gray-300 hover:bg-gray-100"
            >
              <td className="py-3 px-6">{i + 1}</td>
              <td className="py-3 px-6">{venue.name}</td>
              <td className="py-3 px-6">{venue.block}</td>
              <td className="py-3 px-6">{venue.capacity}</td>
              <td className="py-3 px-6">{venue.isAllocated ? "Yes" : "No"}</td>
              <td className="py-3 px-6">
                {venue.allocatedCourse ? venue.allocatedCourse : "nill"}
              </td>
              <td className="py-3 px-6">
                {venue.equipments.length >0 ? venue.equipments.map(e => <p>{e},</p>) : "nill"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VenueTable;
