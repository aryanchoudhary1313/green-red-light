"use client";

import React, { useState } from "react";
import CustomDropdown from "../resuableComponents/CustomSelect";

interface RegistrationFormProps {
  onStartGame: (formData: {
    name: string;
    email: string;
    mobile: string;
    difficulty: string;
  }) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onStartGame }) => {
  // State to hold form data and selected difficulty error flag
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    difficulty: "",
  });

  const [selectedDifficultyError, setSelectedDifficultyError] = useState(false);

  // Handle input field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Limit mobile number to 10 characters
    if (name === "mobile" && value.length > 10) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (option: string) => {
    setFormData({ ...formData, difficulty: option });
    setSelectedDifficultyError(false); // Reset the error when the user selects an option
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.difficulty === "") {
      setSelectedDifficultyError(true); // Show the error if no difficulty is selected
    } else {
      setSelectedDifficultyError(false); // Reset the error if a valid difficulty is selected
      onStartGame(formData);
    }
  };

  return (
    <div className="mt-16 flex flex-col justify-center gap-5 border border-black p-2 rounded w-[65%] m-auto max-md:w-[70%] max-sm:w-[90%]">
      <h2 className="font-bold text-2xl text-center capitalize">
        mugunghwa kkoci pieot seumnida (DON&apos;T MOVE !)
      </h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className=" rounded border bg-gray-100 px-3 py-2  mb-4 hover:border-black transition-colors duration-300 focus:border-black focus:outline-none"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="rounded border bg-gray-100 px-3 py-2  mb-4 hover:border-black transition-colors duration-300 focus:border-black focus:outline-none"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="rounded border bg-gray-100 px-3 py-2  mb-4 hover:border-black transition-colors duration-300 focus:border-black focus:outline-none"
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <CustomDropdown
          options={["Easy", "Medium", "Hard"]}
          selectedOption={formData.difficulty}
          onSelect={handleDropdownChange}
        />
        {selectedDifficultyError && (
          <p className="text-red-500 text-sm">Please select a difficulty.</p>
        )}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className=" bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 hover:text-gray-100 transition-colors duration-300"
          >
            Start Game
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
