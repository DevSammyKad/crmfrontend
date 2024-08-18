// Breadcrumbs.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SvgChevronDown from '../icons/ChevronDown';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="bg-gray-100 p-4">
      <ol className="list-none p-0 inline-flex">
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={routeTo} className="flex items-center">
              <Link to="/" className="text-blue-500 font-semibold ">
                Home
              </Link>
              <span className="mx-2 flex items-center">
                <SvgChevronDown className="-rotate-90" />
              </span>
              <Link
                to={routeTo}
                className={`text-gray-500 ${
                  isLast
                    ? 'font-semibold capitalize text-blue-500'
                    : 'hover:text-gray-700'
                }`}
              >
                {name}
              </Link>
              {!isLast && <span className="mx-2">&#8594;</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
