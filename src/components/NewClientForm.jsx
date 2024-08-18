import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import SvgCloseCircle from '../icons/CloseCircle';

const NewClientForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    address: '',
    area_second: '',
    phone_number: '',
    email: '',
    job_profile: '',
    annualincome: '',
    age: '',
    reference_name: '',
    opp_first_name: '',
    opp_middle_name: '',
    opp_last_name: '',
    opp_address: '',
    opp_area_second: '',
    opp_phone_number: '',
    opp_email: '',
    opp_job_profile: '',
    opp_annualincome: '',
    opp_age: '',
    onboardingdate: '',
    problem: 'MarrigeProblems', // default value
    relation: '',
    summary: '',
  });

  // Function to update form data on input change
  const handleChange = (e) => {
    const { id, value } = e.target;

    // If the input is the date field, handle it separately
    if (id === 'onboardingdate') {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      setFormData((prevData) => ({
        ...prevData,
        onboardingdate: formattedDate,
      }));
    } else {
      // For other inputs, update the state as usual
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    setFormData((prevData) => ({
      ...prevData,
      onboardingdate: formattedDate,
    }));
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/add-client',
        formData
      );
      toast.success('Form submitted successfully!');
      closeModal();

      // You can now access the form data in the formData state
      console.log('Form Data:', JSON.stringify(formData, null, 2));

      // Add logic to send the data to the server or perform other actions
    } catch (error) {
      console.error('error to submit', error);

      toast.error('Error submitting form. Please try again.');
    }
  };

  return (
    <div>
      <div className="modal">
        <div className="grid gap-6 my-5 max-w-6xl mx-auto border border-border-stroke rounded-2xl p-5 bg-slate-100">
          <form action="post" onSubmit={handleSubmit} className="my-5 mx-10">
            {/* ############### Personal Details  ########## */}
            <div className="border border-border-stroke p-6 rounded-2xl my-10 bg-white">
              <div className="flex justify-between items-center">
                <p className="text-sm text-red-500 font-semibold pb-2">
                  Please be sure to fully and accurately complete all sections
                  of the attached form. *
                </p>
                <button onClick={closeModal}>
                  <SvgCloseCircle className="w-8 h-8" />
                </button>
              </div>
              <h1 className="font-semibold text-lg text-blue-500">
                Personal Details
              </h1>
              <div className="grid grid-cols-3 gap-5 my-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="First Name"
                    // required
                  />
                </div>
                <div>
                  <label
                    htmlFor="middle_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Middle name
                  </label>
                  <input
                    type="text"
                    id="middle_name"
                    value={formData.middle_name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Middle name"
                    // required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Last Name"
                    // required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 my-4">
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Address"
                    // required
                  />
                </div>
                <div>
                  <label
                    htmlFor="area_second"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Area
                  </label>
                  <input
                    type="text"
                    id="area_second"
                    value={formData.area_second}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Area"
                    // required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 my-4">
                <div>
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill=""
                        viewBox="0 0 19 18"
                      >
                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={formData.phone_number}
                      onChange={handleChange}
                      id="phone_number"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                      placeholder="123-456-7890"
                      // required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="sam@email.com"
                    // required
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-5 my-4">
                <div className="col-1">
                  <label
                    htmlFor="job_profile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Job Profile
                  </label>
                  <input
                    type="text"
                    id="job_profile"
                    value={formData.job_profile}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Job Profile"
                    // required
                  />
                </div>
                <div className="col-1">
                  <label
                    htmlFor="annualincome"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Annual Income
                  </label>
                  <input
                    type="number"
                    id="annualincome"
                    value={formData.annualincome}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Annual Income"
                    // required
                  />
                </div>
                <div className="col-1">
                  <label
                    htmlFor="age"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Age"
                    // required
                  />
                </div>
                <div className="col-1">
                  <label
                    htmlFor="reference_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Reference name
                  </label>
                  <input
                    type="text"
                    id="reference_name"
                    value={formData.reference_name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Reference name"
                    // required
                  />
                </div>
              </div>
            </div>
            {/* ############### Opponent Details  ########## */}
            <div className="border border-border-stroke p-6 rounded-2xl my-10 bg-white">
              <h1 className="font-semibold text-lg text-blue-500 mb-4">
                Opponent Details
              </h1>

              <div className="grid grid-cols-3 gap-5 my-4">
                <div>
                  <label
                    htmlFor="opp_first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="opp_first_name"
                    value={formData.opp_first_name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="First Name"
                    // required
                  />
                </div>
                <div>
                  <label
                    htmlFor="opp_middle_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Middle name
                  </label>
                  <input
                    type="text"
                    value={formData.opp_middle_name}
                    onChange={handleChange}
                    id="opp_middle_name"
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Middle name"
                    // required
                  />
                </div>
                <div>
                  <label
                    htmlFor="opp_last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="opp_last_name"
                    value={formData.opp_last_name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Last Name"
                    // required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 my-4">
                <div>
                  <label
                    htmlFor="opp_address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.opp_address}
                    onChange={handleChange}
                    id="opp_address"
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Address"
                    // required
                  />
                </div>
                <div>
                  <label
                    htmlFor="opp_area_second"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Area
                  </label>
                  <input
                    type="text"
                    value={formData.opp_area_second}
                    onChange={handleChange}
                    id="opp_area_second"
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Area"
                    // required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 my-4">
                <div>
                  <label
                    htmlFor="opp_phone_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill=""
                        viewBox="0 0 19 18"
                      >
                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={formData.opp_phone_number}
                      onChange={handleChange}
                      id="opp_phone_number"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                      placeholder="123-456-7890"
                      // required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="opp_email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.opp_email}
                    onChange={handleChange}
                    id="opp_email"
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="sam@email.com"
                    // required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5 my-4">
                <div className="col-1">
                  <label
                    htmlFor="opp_job_profile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Job Profile
                  </label>
                  <input
                    type="text"
                    value={formData.opp_job_profile}
                    onChange={handleChange}
                    id="opp_job_profile"
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Job Profile"
                    // required
                  />
                </div>
                <div className="col-1">
                  <label
                    htmlFor="opp_annualincome"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Annual Income
                  </label>
                  <input
                    type="number"
                    id="opp_annualincome"
                    value={formData.opp_annualincome}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Annual Income"
                    // required
                  />
                </div>
                <div className="col-1">
                  <label
                    htmlFor="opp_age"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.opp_age}
                    onChange={handleChange}
                    id="opp_age"
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Age"
                    // required
                  />
                </div>
              </div>
            </div>
            {/* ############### More Details ########## */}
            <div className="border border-border-stroke p-6 rounded-2xl my-10  bg-white">
              <h1 className="font-semibold text-lg text-blue-500 mb-4">
                More Details
              </h1>
              <div className="grid grid-cols-3 gap-5 my-4">
                <div className="col-span-1">
                  <label
                    htmlFor="onboardingdate"
                    className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Onboarding Date
                  </label>
                  <input
                    id="onboardingdate"
                    type="date"
                    value={formData.onboardingdate}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="problem"
                    className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select an Problem or Other?
                  </label>
                  <select
                    id="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option value="MarrigeProblems" defaultValue>
                      Marrige Problems
                    </option>
                    <option value="PropertyFraud">Property Fraud</option>
                    <option value="DivorceCase">Divorce Case</option>
                    <option value="FamilyCounselling">
                      Family Counselling
                    </option>
                    <option value="OldAgeHome">Old Age Home</option>
                    <option value="BachatGat">Bachat Gat</option>
                    <option value="harassment">Harassment</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="relation"
                    className="block mb-2  mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Relation
                  </label>
                  <input
                    type="text"
                    value={formData.relation}
                    onChange={handleChange}
                    id="relation"
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Relation"
                    // required
                  />
                </div>
              </div>
              <label
                htmlFor="summary"
                className="block mb-2  mt-4 text-sm font-medium text-gray-900 dark:text-white"
              >
                Case Summary
              </label>
              <textarea
                className="border border-border-stroke rounded-lg p-4   outline-none
              focus:ring-blue-500 focus:border-blue-500 "
                cols="130"
                rows="8"
                id="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Write about case "
              ></textarea>
            </div>
            {/* ############### Documents ########## */}
            {/* <div className="border border-border-stroke p-6 rounded-2xl my-10  bg-white">
            <h1 className="font-semibold text-lg text-blue-500 mb-4">
              Upload Releted Document
            </h1>
            <div className="flex items-center justify-center w-full mt-4">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-border-stroke border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div> */}

            <div className="grid grid-cols-2 gap-5 my-4">
              <button
                type="submit"
                className="bg-bg-purple py-4 px-6 rounded-xl text-purple-600 font-semibold hover:scale-95"
              >
                Submit
              </button>
              <button
                className="bg-red-300 py-4 px-6 rounded-xl text-red-800 font-semibold hover:scale-95"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster className="fixed inset-0" />
    </div>
  );
};

export default NewClientForm;
