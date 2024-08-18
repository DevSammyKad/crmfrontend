import React from 'react';
import { Link } from 'react-router-dom';
import { UilAngleRightB, UilAngleLeftB } from '@iconscout/react-unicons';
// import Logo from '../images/logo.jpg';
import { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

import { PalaviProjects, SidebarData, SidebarFooter } from '../Data/Data';

const Sidebar = () => {
  const [isExpanded, setExpanded] = useState(true);

  const handleTogglesidebar = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex flex-col justify-evenly h-full ${
        isExpanded ? 'w-72' : 'w-20'
      }  pl-1 bg-white  border-r border-border-stroke `}
    >
      <div className="relative flex gap-4 items-center">
        <div className="absolute top-10 -right-4 bg-gray-300 rounded-full shadow-2xl  flex items-center justify-center cursor-pointer">
          <button onClick={handleTogglesidebar}>
            {isExpanded ? (
              <UilAngleLeftB className="text-white" size="28" />
            ) : (
              <UilAngleRightB className="text-white" size="28" />
            )}
          </button>
        </div>
      </div>

      <p
        className={`${
          isExpanded ? 'ml-5' : 'ml-0'
        } text-gray-400 leading-3 text-sm font-semibold p-1`}
      >
        Main
      </p>

      {SidebarData.map((item, index) => (
        <Link to={item.path} key={index}>
          <div
            data-tooltip-content={item.heading}
            data-for={`tooltip-${item.heading}`}
            data-place="right"
            className="flex mx items-center cursor-pointer text-gray-500 leading-4 text-base font-normal p-4  ease-in-out hover:text-text-purple hover:bg-bg-menu"
          >
            <item.icon
              className={` ${isExpanded ? 'w-6 h-6 mx-3' : 'w-6 h-6 mx-1'} `}
            />
            <span
              className={`text-base ${
                isExpanded
                  ? 'flex  opacity-100 transition-transform delay-1000'
                  : 'hidden opacity-0'
              }  font-sans font-semibold `}
            >
              {item.heading}
            </span>
          </div>
          <ReactTooltip
            id={`tooltip-${item.heading}`} // Same unique identifier as data-for
            effect="solid"
          />
        </Link>
      ))}

      <hr className="w-3/4 mx-auto border-border-stroke my-2" />

      {/* palavi projects menu */}
      <p
        className={`${isExpanded ? 'ml-5' : 'ml-0'} text-gray-400
        -light leading-3 text-sm font-semibold `}
      >
        Projects
      </p>

      {PalaviProjects.map((item, index) => {
        return (
          <Link to={item.path} key={index}>
            <div
              key={index}
              className="flex mx  items-center cursor-pointer text-gray-500 leading-4	text-base font-normal p-4 ease-in-out hover:text-text-purple hover:bg-bg-menu"
            >
              <item.icon
                className={` ${isExpanded ? 'w-25 h-25 mx-3' : 'w-6 h-6 mx-1'}`}
              />
              <span
                className={`text-sm ${
                  isExpanded ? 'flex' : 'hidden'
                } font-sans font-semibold  `}
              >
                {item.heading}
              </span>
            </div>
          </Link>
        );
      })}
      <hr className="w-3/4 mx-auto border-border-stroke my-1" />
      {/* Setting */}
      {SidebarFooter.map((item, index) => {
        return (
          <Link to={item.path} key={index}>
            <div className="flex mx  items-center cursor-pointer text-gray-500 leading-4	text-sm font-normal p-4 ease-in-out hover:text-text-purple hover:bg-bg-menu">
              <item.icon
                className={` ${isExpanded ? 'w-25 h-25 mx-3' : 'w-6 h-6 mx-1'}`}
              />
              <span
                className={`text-base ${
                  isExpanded ? 'flex' : 'hidden'
                } font-sans font-semibold `}
              >
                {item.heading}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
