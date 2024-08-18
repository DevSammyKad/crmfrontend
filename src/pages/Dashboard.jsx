import React, { useState } from 'react';

import NewClientForm from '../components/NewClientForm';
import { OverViewCards } from '../Data/Dashboard';
import Cutegirl from '../images/Cutegirl.png';
import cartoon from '../images/cartoon.png';
import VisitorsBars from '../components/VisitorsBars';
import FinancialInsights from '../components/FinancialInsights';

const Dashboard = () => {
  const [showModal, setshowmodal] = useState(false);

  const closeModal = () => setshowmodal(false);

  return (
    <div className="">
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
      {/* DashBoard Overview Cards */}
      <div className=" grid sm:grid-cols-2 lg:grid-cols-4 gap-10   mt-14">
        {OverViewCards.map((item, index) => {
          return (
            <div
              key={index}
              className="flex  flex-col items-center justify-between cursor-pointer text-gray-dark p-4 bg-white hover:shadow-lg rounded-2xl "
            >
              <div className="flex justify-between items-center gap-10">
                <div className={`${item.color} w-2 h-28 rounded-lg`}></div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold  text-lg">{item.count}</h1>
                  <span className="font-semibold  text-gray text-base">
                    {item.heading}
                  </span>
                </div>
                <div className="relative">
                  <item.icon
                    className="mx-4 bg-bg-purple rounded-full p-3 hover:text-text-purple  mb-5"
                    style={{ width: '65px', height: '65px' }}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-green-500 font-semibold text-medium">
                  {item.percentage}
                </span>
                <h1>Since last Month</h1>
              </div>
            </div>
          );
        })}
      </div>
      {/* Dashboard Charts */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
        <div className=" sm:col-span-2 lg:col-span-3 bg-white rounded-lg  py-4 px-6">
          <FinancialInsights />
        </div>
        <div className=" sm:col-span-2   lg:col-span-1 w-full bg-white rounded-lg  py-4 px-6">
          <VisitorsBars />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
