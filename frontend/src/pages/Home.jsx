import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 flex flex-col justify-between">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <h1 className="text-xl font-bold text-blue-600">
                Venue Allocation
              </h1>
            </div>
            <div className="hidden md:flex md:space-x-8">
              <Link to="#" className="text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <Link
                to="#features"
                className="text-gray-500 hover:text-gray-900"
              >
                Features
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-500 text-white flex-1">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold">Welcome to Venue Allocation</h2>
          <p className="mt-4 text-lg">
            Efficiently allocate venue to courses with our seamless platform.
          </p>
          <Link
            to="/login"
            className="mt-8 inline-block bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200"
          >
            Login
          </Link>
        </div>
      </header>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 absolute bottom-0 w-full">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2024 Student Allocation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
