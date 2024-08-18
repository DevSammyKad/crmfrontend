// Navbar.js
import React, { useState, useRef, useEffect } from 'react';
import Logo from '../icons/Logo';
import person from '../images/person.jpg';
import SvgDark from '../icons/Dark';
import SvgNotificationBing from '../icons/NotificationBing';
import SvgSearchStatus from '../icons/SearchStatus';
import SvgChevronDown from '../icons/ChevronDown';
import NavDropdown from './NavDropdown';
import useNetworkStatus from '../hooks/useNetworkStatus';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const isOnline = useNetworkStatus();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside); // Cleanup
  }, [showDropDown]);

  useEffect(() => {
    toast.dismiss();
  }, []);
  useEffect(() => {
    if (!isOnline) {
      // toast.loading('Please check your Network');
    } else {
      // toast.dismiss();
      // toast.success(`Network is Available now`);
    }
  }, [isOnline]);

  return (
    <div>
      <nav className="h-24 flex justify-between items-center mx-7 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-full w-11 flex justify-center items-center  object-cover object-center">
            <Logo />
          </div>
          <h2 className="font-semibold text-xl ">CRM</h2>
        </div>
        <div className="relative max-sm:hidden">
          <input
            type="text"
            className="rounded-lg pl-5 border border-border-stroke sm:w-[150px] md:w-[236px] lg:w-[450px] h-12 outline-none text-slate-500 text-base font-normal  lg:placeholder:pl-5 transition-all duration-300 ease-in-out "
            placeholder="Search..."
          />

          <SvgSearchStatus className="absolute right-4 top-3 w-5 h-5 " />
        </div>
        <div className="flex justify-center items-center gap-4">
          <button>
            <SvgDark className="w-6 h-6 " />
          </button>
          <button>
            <SvgNotificationBing className="w-6 h-6 " />
          </button>

          <div
            className="flex items-center gap-2 ml-2 relative"
            ref={dropdownRef}
          >
            <div className="relative">
              <img
                src={person}
                alt=""
                className="rounded-full object-cover w-12 h-12"
              />
              <div className="bg-white w-4 h-4 absolute rounded-full flex justify-center items-center bottom-0 right-1">
                <div
                  className={`${
                    isOnline ? 'bg-green-500' : 'bg-gray-500'
                  } z-10  w-2 h-2 rounded-full`}
                ></div>
              </div>
            </div>

            <div className="max-sm:hidden">
              <h4 className="font-medium text-base">Sammy kad</h4>
              <p className="text-gray-500">sameerkad2001@gmail.com</p>
            </div>
            <button onClick={handleDropDown}>
              <SvgChevronDown
                style={{ transform: showDropDown ? 'rotate(180deg)' : 'none' }}
              />
            </button>
            {showDropDown && <NavDropdown />}
          </div>
        </div>
        <Toaster />
      </nav>
    </div>
  );
};

export default Navbar;
