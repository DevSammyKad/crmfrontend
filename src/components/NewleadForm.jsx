import React, { useState, useEffect } from 'react';
import SvgCloseCircle from '../icons/CloseCircle';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import SvgInstagram from '../icons/Instagram';

const NewleadForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    lead_name: '',
    lead_contact: '',
    lead_email: '',
    gender: '',
    date: '',
    problem: '',
    source: '',
    status: '',
    note: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    // If the input is the date field, handle it separately
    if (id === 'date') {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      setFormData((prevData) => ({
        ...prevData,
        date: formattedDate,
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
      date: formattedDate,
    }));
  }, []);

  // Validation

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/leads/create', formData);
      toast.success('Lead submitted successfully!');
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
      <div className=" fixed  inset-0 z-10 bg-black bg-opacity-5 backdrop-blur-sm  flex items-center justify-center">
        <div className="bg-white border border-border-stroke shadow-xl rounded-lg w-[1000px] h-[90%] overflow-y-auto p-10 flex flex-col mt-1">
          <div className="flex justify-between items-center">
            <h1 className="my-2 font-semibold text-xl text-blue-500 ">
              Add New Lead
            </h1>
            <button
              className=" only:text-red-800 font-semibold text-lg outline-none"
              onClick={closeModal}
            >
              <SvgCloseCircle className="w-8 h-8 " />
            </button>
          </div>
          <p className="my-4 font-semibold text-base text-[#45474a]">
            Basic Details of Lead
          </p>
          <hr className="mb-8 border border-border-stroke" />
          <form action="">
            <div className="flex w-full gap-7">
              <div className="w-full">
                <label
                  htmlFor="lead_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lead Name
                </label>
                <input
                  type="text"
                  id="lead_name"
                  required
                  value={formData.lead_name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lead_contact"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lead Contact
                </label>
                <input
                  type="tel"
                  id="lead_contact"
                  required
                  value={formData.lead_contact}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
              </div>
            </div>
            <div className="flex w-full gap-7">
              <div className="w-full">
                <label
                  htmlFor="lead_email"
                  className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lead Email
                </label>
                <input
                  type="email"
                  id="lead_email"
                  required
                  value={formData.lead_email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
              </div>
              <div className="w-full">
                <label
                  className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="status"
                >
                  Select Status
                </label>
                <select
                  id="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="New" defaultValue>
                    New
                  </option>
                  <option value="Confused">Confused</option>
                  <option value="Interested">Interested</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Onboard">Onboard</option>
                  <option value="Close">Close</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex w-full gap-7">
              <div className="w-full">
                <label
                  className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="gender"
                >
                  Select Gender
                </label>
                <div className="flex gap-2 justify-start items-center">
                  <input
                    type="radio"
                    id="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                  />
                  <label>Male</label>

                  <input
                    type="radio"
                    id="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                  />
                  <label>Female</label>

                  <input
                    type="radio"
                    id="gender"
                    value="Other"
                    checked={formData.gender === 'Other'}
                    onChange={handleChange}
                  />
                  <label>Other</label>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="date"
                    className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>
              </div>
            </div>

            {/* // //// second Div for selection */}
            <div className="flex w-full gap-7">
              <div className="w-full">
                <label
                  className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="problem"
                >
                  Select Problem
                </label>
                <select
                  id="problem"
                  required
                  value={formData.problem}
                  onChange={handleChange}
                  className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="MarrigeProblems" defaultValue>
                    Marrige Problems
                  </option>
                  <option value="Property Fraud">Property Fraud</option>
                  <option value="Divorce Case">Divorce Case</option>
                  <option value="Family Counselling">Family Counselling</option>
                  <option value="Old Age Home">Old Age Home</option>
                  <option value="Bachat Gat">Bachat Gat</option>
                  <option value="Domestic Violence">Domestic Violence</option>
                  <option value="Harassment">Harassment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="source"
                >
                  Select Source
                </label>
                <select
                  id="source"
                  required
                  value={formData.source}
                  onChange={handleChange}
                  className="bg-gray-50 border border-border-stroke text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="MarrigeProblems" defaultValue>
                    Facebook
                  </option>
                  <option value="Instagram">
                    <img
                      src={SvgInstagram || <SvgInstagram />}
                      alt=""
                      className="w-20"
                    />
                    Instagram{' '}
                  </option>
                  <option value="Whatsapp">Whatsapp</option>
                  <option value="Office">Office</option>
                  <option value="Website">Website</option>
                  <option value="Referal">Referal</option>
                  <option value="Other Platform">Other Platform</option>
                </select>
              </div>
            </div>
            <label
              className="
              block
              mt-4
              mb-2
              text-sm
              font-medium
              text-gray-900
              dark:text-white"
              htmlFor="note"
            >
              Note
            </label>
            <textarea
              className="outline-none mt-4 font-[#0A1629] cursor-pointer border border-border-stroke py-5 px-7 rounded-lg  focus:ring-blue-500 focus:border-blue-500 w-full"
              name="help-sub"
              rows="5"
              id="note"
              required
              value={formData.note}
              onChange={handleChange}
              placeholder="Write basic Note"
            ></textarea>
            <button
              className="bg-[#3F8CFF] py-3 px-5 rounded-lg  mx-auto mt-4 text-white font-semibold outline-none"
              onClick={handleSubmit}
            >
              Submit New Lead
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default NewleadForm;
