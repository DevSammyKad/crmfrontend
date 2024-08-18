import React from 'react';
import { IntegrationData, SettingData } from '../Data/SettingPage';
import SvgChevronDown from '../icons/ChevronDown';

const Setting = () => {
  function connect() {
    alert('Currently this feature in not available');
  }
  return (
    <div className="">
      <header className="mb-10">
        <h1 className="font-bold text-2xl">Settings</h1>
        <p className="font-semibold text-base my-4">Edit abilities of CRM</p>
      </header>

      <div className="grid grid-cols-4 gap-5">
        {SettingData.map((item, index) => {
          return (
            <div key={index}>
              <div className=" border bg-white border-border-stroke rounded-lg my-5 py-4 px-6 hover:border-blue-500 cursor-pointer shadow-lg ">
                <h1 className="font-semibold">{item.title}</h1>
                <p>{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      <header className="mb-10">
        <h1 className="font-bold text-2xl">Integration</h1>
        <p className="font-semibold text-base my-4">All Integration availble</p>
      </header>

      <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {IntegrationData.map((item, index) => {
          return (
            <div key={index}>
              <div className=" bg-white border h-56  border-border-stroke rounded-xl my-5 py-4 px-6 hover:border-blue-500  cursor-pointer shadow-lg transition-all delay-100">
                <div className="flex items-center justify-between">
                  <div className="">
                    {item.image && <item.image className="w-14 h-14" />}
                  </div>
                  <div>
                    <button
                      onClick={connect}
                      className="flex items-center border border-border-stroke rounded-lg px-4 py-2 mt-6 text-sm font-medium hover:border-blue-500 "
                    >
                      Connect
                      <SvgChevronDown className="-rotate-90 " />
                    </button>
                  </div>
                </div>
                <div className="mt-8">
                  <h1 className="font-semibold text-base">{item.title}</h1>
                  <p className="font-normal text-sm mt-2 text-gray">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Setting;
