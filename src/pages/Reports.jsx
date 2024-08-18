import React, { useEffect } from 'react';
import Invoice from '../components/Invoice';
import { useState } from 'react';
import invoiceData from '../Data/Invoice_data.json';
import InvoiceCountTabs from '../components/InvoiceCountTabs';
import SvgMore from '../icons/More';
import SvgSearchStatus from '../icons/SearchStatus';
import SvgFilter from '../icons/Filter';
import SvgSend from '../icons/Send';
import SvgNote from '../icons/Note';
import SvgDelete from '../icons/Delete';

const Reports = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const [isOpenMore, setIsOpenMore] = useState(false);
  const [filteredData, setFilteredData] = useState(invoiceData);

  const [isFilterHidden, setIsFilterHidden] = useState(true);

  const HandleToggleFilter = () => {
    setIsFilterHidden(!isFilterHidden);
  };

  const handleClickMore = () => {
    setIsOpenMore((prevStates) => !prevStates);
  };
  useEffect(() => {
    setFilteredData(invoiceData);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center  my-8 bg-white py-8 px-5 rounded-lg border border-border-stroke shadow-sm ">
        <div>All Invoice </div>
        <div className="flex gap-4">
          <button className="bg-indigo-500 text-sm font-semibold  text-white py-3 px-4 rounded-lg">
            Import Invoice
          </button>
          <button
            className="bg-blue-500 text-sm font-semibold  text-white py-3 px-4 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Create Invoice
          </button>
        </div>
      </div>
      {showModal && <Invoice closeModal={closeModal} />}

      {/* Invoice Table */}
      <div className="bg-white border border-border-stroke rounded-lg overflow-x-auto">
        {/* Table Header Search and Filter */}
        <div className="flex justify-between items-center px-4 mx-auto my-5">
          {/* Search box */}
          <div className="my-4 relative">
            <input
              type="text"
              placeholder="Enter Invoice Number"
              className="bg-gray-100 rounded-xl py-3 px-4 outline-none "
            />
            <SvgSearchStatus className="absolute top-[35%] right-4  stroke-gray-100" />
          </div>
          {/* Invoice Count Tabs*/}
          <div className="flex items-center justify-between">
            <InvoiceCountTabs
              invoiceData={invoiceData}
              setFilteredData={setFilteredData}
            />
            <div className="flex items-center space-x-3 ml-5 ">
              {' '}
              <button
                onClick={HandleToggleFilter}
                className=" outline-none border border-border-stroke bg-blue-600 text-white font-semibold text-sm rounded-2xl py-2 px-4 flex items-center gap-2"
              >
                <SvgFilter className="stroke-white" /> Filter
              </button>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left  overflow-x-auto table-auto ">
          <thead className="text-xs uppercase ">
            <tr className="text-xs text-gray-400">
              <th scope="col" className="py-3 px-6 font-medium  ">
                Invoice ID
              </th>
              <th
                scope="col"
                className="py-3 px-6  font-medium text-xs text-slate-500"
              >
                Customer Name
              </th>
              <th
                scope="col"
                className="py-3 px-6 font-medium text-xs text-slate-500"
              >
                Invoice Date
              </th>
              <th
                scope="col"
                className="py-3 px-6 font-medium text-xs text-slate-500"
              >
                Due Date
              </th>
              <th
                scope="col"
                className="py-3 px-4 font-medium text-xs text-slate-500"
              >
                Status
              </th>
              <th
                scope="col"
                className="py-3 px-6 font-medium text-xs text-slate-500"
              >
                Amount
              </th>
              <th
                scope="col"
                className="py-3 px-6 font-medium text-xs text-slate-500"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody className="py-10 ">
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className="py-6 border-b   border-b-slate-300 font-medium text-sm text-gray hover:bg-indigo-50 cursor-pointer"
              >
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item['Invoice ID']}
                </td>
                <td className="py-3 px-6  font-medium text-gray-900 whitespace-nowrap">
                  {item['Customer Name']}
                </td>
                <td className="py-3 px-6 ">{item['Invoice Date']}</td>
                <td className="py-3 px-6 ">2023-05-10</td>
                <td>
                  <span
                    className={`py-1 px-4 ml-2 rounded-lg text-sm font-normal  ${
                      item.Status == 'Paid'
                        ? 'bg-green-100 text-green-600'
                        : item.Status == 'Pending'
                        ? 'bg-yellow-200 text-yellow-600'
                        : item.Status == 'Draft'
                        ? 'bg-slate-200 text-slate-600'
                        : ''
                    }`}
                  >
                    {' '}
                    {item.Status}
                  </span>
                </td>

                <td className="py-3 px-6 ">{item.Amount}</td>
                <td className="py-3 px-6  ">
                  <div className="relative">
                    <button
                      onClick={handleClickMore}
                      className="font-semibold  text-white py-2 px-2 rotate-90 rounded-lg outline-none"
                    >
                      <SvgMore />
                    </button>

                    {isOpenMore && (
                      <ul className="absolute top-full right-[50%] bg-white rounded-lg shadow-md overflow-hidden w-40">
                        <li
                          className="hover:bg-gray-100 px-4 py-2 text-sm font-medium flex items-center gap-2"
                          onClick={() => {
                            /* Send functionality */
                          }}
                        >
                          <SvgSend width="18" height="18" />
                          Send
                        </li>
                        <li
                          className="hover:bg-gray-100 px-4 py-2 text-sm font-medium flex items-center gap-2"
                          onClick={() => {
                            /* Edit functionality */
                          }}
                        >
                          <SvgNote width="18" height="18" />
                          Edit
                        </li>
                        <li
                          className="hover:bg-gray-100 px-4 py-2 text-sm font-medium text-red-500 flex items-center gap-2"
                          onClick={() => {
                            /* Delete functionality */
                          }}
                        >
                          <SvgDelete />
                          Delete
                        </li>
                        <li
                          className="hover:bg-gray-100 px-4 py-2 text-sm font-medium"
                          onClick={() => {
                            /* Download functionality */
                          }}
                        >
                          Download
                        </li>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
