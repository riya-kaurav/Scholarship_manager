// import { useEffect, useState } from "react";
// import api from "../api/axios";

// const Scholarships = () => {
//   const [data, setData] = useState([]);
//   const [state, setState] = useState("");

//   useEffect(() => {
//     api.get(`/scholarships?state=${state}`).then((res) => {
//       setData(res.data);
//     });
//   }, [state]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Scholarships</h2>

//       <select
//         className="border p-2 mb-4"
//         onChange={(e) => setState(e.target.value)}
//       >
//         <option value="">All States</option>
//         <option value="MP">MP</option>
//         <option value="UP">UP</option>
//       </select>

//       <div className="space-y-3">
//         {data.map((s) => (
//           <div key={s._id} className="border p-4">
//             <h3 className="font-medium">{s.title}</h3>
//             <p className="text-sm text-gray-600">{s.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Scholarships;


import { useState } from "react";

const scholarshipsData = [
  {
    id: 1,
    title: "Central Sector Scholarship",
    type: "gov",
    state: "All",
    gender: "any",
    description: "Merit-based scholarship for undergraduate students."
  },
  {
    id: 2,
    title: "Post Matric Scholarship",
    type: "gov",
    state: "MP",
    gender: "any",
    description: "Financial assistance for SC/ST students."
  },
  {
    id: 3,
    title: "Women in Tech Scholarship",
    type: "non-gov",
    state: "All",
    gender: "female",
    description: "Support for women pursuing technical education."
  }
];

const Scholarships = () => {
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");

  const filteredScholarships = scholarshipsData.filter((s) => {
    return (
      (type === "" || s.type === type) &&
      (state === "" || s.state === state || s.state === "All") &&
      (gender === "" || s.gender === gender || s.gender === "any")
    );
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">
          Available Scholarships
        </h1>
        <p className="text-gray-600 text-sm">
          Browse scholarships based on eligibility and category.
        </p>
      </div>

      {/* Filters */}
      <div className="border p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          className="border p-2 text-sm"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="gov">Government</option>
          <option value="non-gov">Non-Government</option>
        </select>

        <select
          className="border p-2 text-sm"
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">All States</option>
          <option value="MP">Madhya Pradesh</option>
          <option value="UP">Uttar Pradesh</option>
        </select>

        <select
          className="border p-2 text-sm"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Important Scholarships */}
      <h2 className="text-lg font-medium mb-3">
        Important Scholarships
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredScholarships.map((s) => (
          <div key={s.id} className="border p-4">
            <h3 className="font-medium mb-1">{s.title}</h3>

            <p className="text-sm text-gray-600 mb-2">
              {s.description}
            </p>

            <div className="text-xs text-gray-500 mb-3">
              <span>Type: {s.type === "gov" ? "Government" : "Non-Government"}</span>
              <span className="mx-2">|</span>
              <span>State: {s.state}</span>
            </div>

            <button className="text-sm border px-4 py-1">
              View Details
            </button>
          </div>
        ))}
      </div>

      {filteredScholarships.length === 0 && (
        <p className="text-sm text-gray-500 mt-6">
          No scholarships found for selected filters.
        </p>
      )}
    </div>
  );
};

export default Scholarships;
