import React, { useState } from 'react';
import ClientProfile from '../components/ClientProfile';
import cartoon from '../images/cartoon.png';
import NewClientForm from '../components/NewClientForm';
import { Toaster } from 'react-hot-toast';
const Clients = () => {
  const [showModal, setshowmodal] = useState(false);

  const closeModal = () => setshowmodal(false);
  return (
    <div>
      <div className=" my-8 w-full border border-border-stroke rounded-lg p-5 bg-white lg:flex justify-between items-center">
        <div className="flex justify-center items-center gap-5">
          <div>
            <img src={cartoon} alt="" className="w-[80px]" />
          </div>
          <div>
            <h1 className="font-semibold text-lg my-3">Dashboard Overview</h1>
            <p className="text-sm text-gray font-light font-sans tracking-wide leading-4">
              Welcome to Your Counseling Services Dashboard
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          <button
            className="bg-indigo-500 text-sm font-semibold  text-white py-3 px-4 rounded-lg active:scale-90"
            onClick={() => setshowmodal(true)}
          >
            Add New Client
          </button>
          {showModal && <NewClientForm closeModal={closeModal} />}

          <button className="bg-blue-500 text-sm font-semibold  text-white py-3 px-4 rounded-lg active:scale-90">
            Download File
          </button>
        </div>
      </div>
      <div className="p-4">
        <ClientProfile />
      </div>

      <Toaster />
    </div>
  );
};

export default Clients;
