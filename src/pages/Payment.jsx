import React, { useEffect, useState } from 'react';
import Receipt from '../components/Receipt';
import * as XLSX from 'xlsx';
import toast, { Toaster } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
// import PaymentData from '../Data/PaymentData.json';
import InvoiceCountTabs from '../components/InvoiceCountTabs';
import paymentIMG from '../icons/paymentIMG.png';
import SvgMore from '../icons/More';
import SvgSearchStatus from '../icons/SearchStatus';
import useNetworkStatus from '../hooks/useNetworkStatus';

import SvgFilter from '../icons/Filter';

import {
  HiOutlineDownload,
  HiPencilAlt,
  HiOutlineTrash,
  HiPaperAirplane,
} from 'react-icons/hi';

import axios from 'axios';

const Payment = () => {
  const isOnline = useNetworkStatus();
  const [showModal, setShowModal] = useState(false);
  const [receiptsData, setReceiptsData] = useState([]);
  const [receiptDataForUpdate, setReceiptDataForUpdate] = useState(null);
  const [isOpenMore, setIsOpenMore] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  // const [filteredData, setFilteredData] = useState(PaymentData);

  const debounceSearchTerm = useDebounce(searchText, 500);

  const handleClickMore = (index, event) => {
    console.log('Clicked on index:', index);
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    setIsOpenMore(true);
  };

  const baseUrl = import.meta.env.VITE_BASEURL;

  useEffect(() => {
    const fetchAllReceiptData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/receipts/get/`);
        setReceiptsData(response.data.receipts);
      } catch (error) {
        console.error('Error While fetching Receipts ', error);
      }
    };
    fetchAllReceiptData();
  }, []);

  const handleUpdateReceipt = (data) => {
    setShowModal(true);
    setReceiptDataForUpdate(data);
    setIsOpenMore(false);
  };

  const handleDeleteReceipt = async (receiptId) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/api/receipts/delete/${receiptId}`
      );

      if (response.status === 200) {
        setReceiptsData(
          receiptsData.filter((receipt) => receipt._id !== receiptId)
        );
        toast.success('Receipt deleted successfully!');
      } else {
        console.error('Error deleting receipt:', response.data);
        toast.error('Failed to delete receipt. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting receipt:', error);
      toast.error('Failed to delete receipt. Please try again.');
    } finally {
      setIsOpenMore(null); // Close More options after deletion
    }
  };

  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { Receipts: ws }, SheetNames: ['Receipts'] };
    XLSX.writeFile(wb, 'ReceiptsData.XLSX');
    toast.success('All Receipts Download ');
  };

  const sendOnWhatsapp = () => {
    const whatsappNo = response;
    // how can send on whatsapp
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    // Check if there's a search term
    const searchTermLower = searchText.toLowerCase();

    if (searchTermLower) {
      // Filter receipts based on the search term
      const filterData = receiptsData.filter(
        (receipt) =>
          receipt.receiptId.toLowerCase().includes(searchTermLower) ||
          receipt.clientName.toLowerCase().includes(searchTermLower) ||
          receipt.phoneNumber.includes(searchTermLower) ||
          receipt.paymentMode.toLowerCase().includes(searchTermLower)
      );
      // Update the state with the filtered data
      setFilteredReceipts(filterData);
    } else {
      // If there's no search term, reset to show all data
      setFilteredReceipts(receiptsData);
    }
  }, [searchText, receiptsData]);

  const closeModal = () => {
    setShowModal(false);
    setReceiptDataForUpdate(null);
  };

  return (
    <div>
      <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-4 xl:p-0 gap-y-4 md:gap-6">
        <div class="md:col-span-2 xl:col-span-3 bg-white p-6 rounded-2xl border border-gray-50">
          <div class="flex flex-col space-y-6 md:h-full md:justify-between">
            <div class="flex justify-between">
              <span class="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Main Account
              </span>
              <span class="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Available Funds
              </span>
            </div>
            <div class="flex gap-2 md:gap-4 justify-between items-center">
              <div class="flex flex-col space-y-4">
                <h2 class="text-gray-800 font-bold tracking-widest leading-tight">
                  Palavi Savings Account
                </h2>
                <div class="flex items-center gap-4">
                  <p class="text-lg text-gray-600 tracking-wider">
                    **** **** *321
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
              <h2 class="text-lg md:text-xl xl:text-3xl text-gray-700 font-black tracking-wider">
                <span class="md:text-xl">₹</span>
                92,817.45
              </h2>
            </div>
            <div class="flex gap-2 md:gap-4">
              <a
                href="#"
                class="bg-blue-600 px-5 py-3 w-full text-center md:w-auto rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-800"
              >
                Transfer Money
              </a>
              <a
                href="#"
                class="bg-blue-50 px-5 py-3 w-full text-center md:w-auto rounded-lg text-blue-600 text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white"
              >
                Link Account
              </a>
            </div>
          </div>
        </div>
        <div class="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-800 flex flex-col justify-between">
          <div class="flex flex-col">
            <p class="text-white font-bold">Lorem ipsum dolor sit amet</p>
            <p class="mt-1 text-xs md:text-sm text-gray-50 font-light leading-tight max-w-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              soluta saepe consequuntur facilis ab a. Molestiae ad saepe
              assumenda praesentium rem dolore? Exercitationem, nequeobcaecati?
            </p>
          </div>
          <div class="flex justify-between items-end">
            <a
              href="#"
              class="bg-blue-800 px-4 py-3 rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white"
            >
              Learn More
            </a>
            <img
              src="https:/atom.dzulfarizan.com/assets/calendar.png"
              alt="calendar"
              class="w-auto h-24 object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex-wrap max-sm:gap-y-5 flex justify-between items-center my-8 bg-white py-8 px-5 rounded-lg border border-border-stroke shadow-sm ">
        <div>All Payment </div>
        <div className="flex gap-4">
          <button
            className="bg-indigo-500 text-sm font-semibold  text-white py-3 px-4 rounded-lg shadow-xl"
            onClick={() => setShowModal(true)}
          >
            New Payment
          </button>
          <button
            onClick={() => exportToExcel(receiptsData)}
            className="bg-blue-500 text-sm font-semibold  text-white py-3 px-4 rounded-lg shadow-xl"
          >
            Export Payment
          </button>
        </div>
      </div>
      {showModal && (
        <Receipt closeModal={closeModal} initialData={receiptDataForUpdate} />
      )}

      {/* Invoice Table */}
      <div className="bg-white border border-border-stroke rounded-lg overflow-x-auto">
        {/* Table Header Search and Filter */}
        <div className="flex justify-between items-center px-4 mx-auto my-5">
          {/* Search box */}
          <div className="my-4 relative">
            <input
              type="text"
              placeholder="Enter Invoice Number"
              onChange={(e) => handleSearch(e)}
              className="bg-gray-100 rounded-xl py-3 px-4 outline-none sm:w-52 lg:w-80  "
            />
            <SvgSearchStatus className="absolute top-[35%] right-4  stroke-gray-100" />
          </div>
          {/* Invoice Count Tabs*/}
          <div className="flex items-center justify-between">
            <InvoiceCountTabs
              invoiceData={receiptsData}
              setFilteredData={filteredReceipts}
            />
            <div className="flex items-center space-x-3 ml-5 ">
              {' '}
              <button className=" outline-none border border-border-stroke bg-blue-600 text-white font-semibold text-sm rounded-2xl py-2 px-4 flex items-center gap-2">
                <SvgFilter className="stroke-white" /> Filter
              </button>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left  overflow-x-auto table-auto ">
          <thead className="text-xs uppercase ">
            <tr className="text-xs text-gray-400">
              <th scope="col" className="py-3 px-6 font-medium  ">
                Receipt Id
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
                Receipt Date
              </th>

              <th
                scope="col"
                className="py-3 px-4 font-medium text-xs text-slate-500"
              >
                Payment Mode
              </th>
              <th
                scope="col"
                className="py-3 px-4 font-medium text-xs text-slate-500"
              >
                Deposit To
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
            {filteredReceipts.length > 0 ? (
              filteredReceipts.map((item, index) => (
                <tr
                  key={index}
                  className="py-6 border-b border-b-slate-300 font-medium text-sm text-gray"
                >
                  <td
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.receiptId}
                  </td>
                  <td className="py-3 px-6 rounded-lg font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={paymentIMG}
                          className="max-w-10 "
                          sizes="22"
                          alt=""
                        />
                      </div>
                      <div>
                        <span>{item.clientName}</span>
                        <br />
                        <span className="text-gray-300">
                          {item.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 rounded-lg">{item.receiptDate}</td>

                  <td>
                    <span
                      className={`py-1 px-4 ml-2 rounded-lg text-sm font-normal  ${
                        item.paymentMode == 'UPI'
                          ? 'bg-blue-100 text-blue-600'
                          : item.paymentMode == 'Cheque'
                          ? 'bg-yellow-200 text-yellow-600'
                          : item.paymentMode == 'Cash'
                          ? 'bg-green-100 text-green-600'
                          : ''
                      }`}
                    >
                      {' '}
                      {item.paymentMode}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`py-1 px-4 ml-2 rounded-lg text-sm font-normal  ${
                        item.deposit_to == 'Paid'
                          ? 'bg-green-100 text-green-600'
                          : item.deposit_to == 'Pending'
                          ? 'bg-yellow-200 text-yellow-600'
                          : item.deposit_to == 'Draft'
                          ? 'bg-slate-200 text-slate-600'
                          : ''
                      }`}
                    >
                      {' '}
                      {item.depositTo}
                    </span>
                  </td>

                  <td className="py-3 px-6 rounded-lg text-green-500">{`₹ ${item.amountReceived}`}</td>
                  <td className="py-3 px-6 rounded-lg ">
                    <div className="relative">
                      <button
                        onClick={() => handleClickMore(index)}
                        className="font-semibold  text-white py-2 px-2 rotate-90 rounded-lg outline-none"
                      >
                        <SvgMore />
                      </button>

                      {isOpenMore && openIndex === index && (
                        <ul className="absolute top-full right-[50%] z-10 bg-white rounded-lg shadow-md overflow-hidden w-40">
                          <li
                            className="hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm font-medium flex items-center gap-2"
                            onClick={() => {
                              /* Send functionality */
                            }}
                          >
                            <HiPaperAirplane size={20} className="rotate-90" />
                            Send
                          </li>
                          <li
                            className="hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm font-medium flex items-center gap-2"
                            onClick={() => handleUpdateReceipt(item)}
                          >
                            <HiPencilAlt size={20} />
                            Edit
                          </li>
                          <li
                            className="hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm font-medium text-red-500 flex items-center gap-2"
                            onClick={() => handleDeleteReceipt(item._id)}
                          >
                            <HiOutlineTrash size={20} />
                            Delete
                          </li>
                          <li
                            className="hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm font-medium flex items-center gap-2"
                            onClick={() => {
                              /* Download functionality */
                            }}
                          >
                            <HiOutlineDownload size={20} />
                            Download
                          </li>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">
                  {isOnline
                    ? 'Data Not Available'
                    : 'Please check your network'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default Payment;
