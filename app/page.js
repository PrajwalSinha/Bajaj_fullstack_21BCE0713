"use client";

import React, { useState } from "react";
import Select from "react-select";

const Page = () => {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    rollNumber: "",
    jsonInput: "",
    selectedOptions: [],
  }); 
  const [isValidJson, setIsValidJson] = useState(true);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJsonInput = (e) => {
    setFormData({ ...formData, jsonInput: e.target.value });
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData({ ...formData, selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      JSON.parse(formData.jsonInput);
      setIsValidJson(true);
    } catch (error) {
      setIsValidJson(false);
      return;
    }

    try {
      const response = await fetch("/api/bhfl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highestAlphabet", label: "Highest Lowercase Alphabet" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Submit Details
        </h2>
        <div className="mb-4">
          <label
            htmlFor="userId"
            className="block text-gray-700 font-semibold mb-2"
          >
            User ID:
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            College Email ID:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rollNumber"
            className="block text-gray-700 font-semibold mb-2"
          >
            College Roll Number:
          </label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="jsonInput"
            className="block text-gray-700 font-semibold mb-2"
          >
            JSON Input:
          </label>
          <textarea
            id="jsonInput"
            name="jsonInput"
            value={formData.jsonInput}
            onChange={handleJsonInput}
            required
            className={`w-full p-2 border ${
              isValidJson ? "border-gray-300" : "border-red-500"
            } rounded-lg focus:outline-none focus:border-blue-500`}
          />
          {!isValidJson && (
            <p className="text-red-500 mt-2">Invalid JSON format</p>
          )}
        </div>
        {response && (
          <div className="mb-4">
            <label
              htmlFor="dropdown"
              className="block text-gray-700 font-semibold mb-2"
            >
              Select Options:
            </label>
            <Select
              id="dropdown"
              isMulti
              options={options}
              onChange={handleSelectChange}
              className="w-full"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {response && (
        <div className="bg-white p-8 mt-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Response Data</h3>
          <ul className="bg-gray-100 p-4 rounded-lg list-disc list-inside">
            {formData.selectedOptions.map((option, index) => (
              <li key={option.value}>
                {option.label}: {response[option.value]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;