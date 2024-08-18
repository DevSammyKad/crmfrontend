import React from 'react';
// import { useHistory } from 'react-router-dom';

const Help = () => {
  return (
    <div className=" bg-bg-light-gray h-screen flex justify-center items-center ">
      <div className=" bg-white border shadow-xl border-border-stroke rounded-xl w-[440] flex justify-center p-10 flex-col">
        <div className="flex justify-between items-center ">
          <h1 className="my-4 font-semibold text-xl ">Need Some Help ?</h1>
          <button className="text-red-800 font-semibold text-lg">Close</button>
        </div>
        <p className="my-4 font-semibold text-base text-[#45474a]">
          Describe your question and our specialists will answer you within 24
          hours.
        </p>
        <label className="my-4 font-semibold text-xl" htmlFor="help">
          Request Subject
        </label>
        <select
          className="my-4 text-[#0A1629] cursor-pointer outline-none border border-border-stroke py-5 px-1 rounded-lg"
          type="text"
          name="help"
          id="help"
        >
          <option className="py-2 px-4 " value="Technical-Difficulties">
            Technical Difficulties
          </option>

          <option className="py-2 px-1" value="Technical-Difficulites">
            OnBoarding Difficulites
          </option>
          <option className="py-2 px-1" value="Technical-Difficulites">
            Other Difficulites
          </option>
        </select>
        <label className="my-6" htmlFor="help-sub">
          Request Description
        </label>
        <textarea
          className="outline-none my-4 font-[#0A1629] cursor-pointer border border-border-stroke py-5 px-7 rounded-lg"
          name="help-sub"
          cols="10"
          rows="5"
          placeholder="Add some description of the request"
        ></textarea>
        <button className="bg-[#3F8CFF] py-4 px-6 rounded-lg w-3/4 mx-auto mt-4 text-white font-semibold">
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default Help;
