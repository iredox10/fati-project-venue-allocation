// src/LoginPage.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../lib/path";
import axios from "axios";

const LoginPage = () => {
  const [candidateNo, setCandidateNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${path}/student-login`,{candidateNo,password});
      if (res.status == 200) {
        navigate(`/student-page/${res.data._id}`);
      }
      console.log(res)
    } catch (err) {
      console.log(err);
    }
    // setCandidateNumber("");
    // setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Student Login
        </h2>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="candidate-number"
            >
              Candidate Number
            </label>
            <input
              type="text"
              id="candidate-number"
              placeholder="Enter your candidate number"
              value={candidateNo}
              onChange={(e) => setCandidateNumber(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          >
            Login
          </button>
          <p className="my-3">Admin? <Link className="text-blue-500" to='/admin-login'>Admin Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
