import React from 'react';
import { visitorsData } from '../Data/Dashboard';

const VisitorsBars = () => {
  return (
    <div className="w-full">
      <h1 className="font-bold font-lg">Visitors Analytics</h1>
      {visitorsData.map((item, index) => (
        <div className=" " key={index}>
          <div className="mt-10 flex justify-between items-center">
            <h1>{item.title}</h1>
            <span>{item.percentage}%</span>
          </div>
          <div className="bg-slate-200 rounded-lg flex mt-2">
            <div
              className={`${item.color} rounded-full h-2 `}
              style={{
                width: `${item.percentage}% `,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisitorsBars;
