import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import SvgCloseCircle from '../icons/CloseCircle';
import * as yup from 'yup';

const Receipt = ({ closeModal, initialData }) => {
  const baseUrl = import.meta.env.VITE_BASEURL;
  const [formData, setFormData] = useState({
    receiptId: 'RCPT-',
    clientName: '',
    phoneNumber: '',
    receiptDate: '',
    paymentMode: 'Cash',
    panCardAadhaarCardNo: '',
    depositTo: 'Palavi',
    amountReceived: '',
    receiptNote: 'Application Fee ',
  });

  const capitalizeFirstLetter = (value) => {
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    // For other inputs, update the state as usual
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === 'clientName' ? capitalizeFirstLetter(value) : value,
    }));
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const currentDate = new Date().toISOString().split('T')[0];
      setFormData((prevData) => ({
        ...prevData,
        receiptDate: currentDate,
      }));
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = initialData
      ? `${baseUrl}/api/receipts/update/${initialData._id}`
      : `${baseUrl}/api/receipts/create`;

    try {
      const method = initialData ? 'patch' : 'post';
      const response = await axios[method](url, formData);
      if (initialData) {
        toast.success('Receipt updated successfully!');

        console.log('id: ', response.data);
        console.log('Updated Data:', response.data);
        closeModal(true);
      } else {
        toast.success('Receipt created successfully!');
        console.log('Created Data:', response.data);
        closeModal(true);
      }
    } catch (error) {
      console.error('Error to updating receipt:', error);
      const errorMessage =
        error.response?.data?.message ||
        'Error submitting receipt. Please try again.';
      toast.error(errorMessage);
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    // Pad single digit month/day with a leading zero
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className=" fixed  inset-0 z-10 bg-black bg-opacity-5 backdrop-blur-sm  flex items-center justify-center">
        <div className=" border bg-white border-border-stroke p-20 rounded-3xl overflow-y-auto h-[90%] w-[90%]">
          <form action="">
            <div className="flex justify-between items-center mb-10">
              <h1 className="my-2 font-semibold text-xl text-blue-500 ">
                Add New Receipt
              </h1>
              <button
                className=" only:text-red-800 font-semibold text-lg outline-none"
                onClick={closeModal}
              >
                <SvgCloseCircle className="w-8 h-8 " />
              </button>
            </div>
            {/* First Section */}
            <div className="grid grid-cols-4 gap-10 max-md:grid-cols-2 ">
              <div className="grid ">
                <label
                  htmlFor="receiptId"
                  className="text-base font-normal mb-1 ml-2 text-black"
                >
                  Receipt ID
                </label>
                <input
                  type="text"
                  id="receiptId"
                  value={formData.receiptId}
                  onChange={handleChange}
                  placeholder="Receipt Id"
                  className="border border-border-stroke outline-none py-2 px-4 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-white block w-full  "
                />
              </div>
              <div className="grid ">
                <label
                  htmlFor="clientName"
                  className="text-base font-normal mb-1 ml-2 text-black "
                >
                  Client Name
                </label>
                <input
                  type="text"
                  id="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Client Name"
                  className="border border-border-stroke outline-none py-2 px-4 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-white block w-full  "
                />
              </div>
              <div className="grid ">
                <label
                  htmlFor="phoneNumber"
                  className="text-base font-normal mb-1 ml-2 text-black "
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border border-border-stroke outline-none py-2 px-4 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-white block w-full  "
                />
              </div>
              <div className="grid ">
                <h1 className="text-xl font-semibold mb-1 ml-2 text-black">
                  Amount Received
                </h1>
                <h2 className="font-medium text-xl text-green-500">
                  ₹ {formData.amountReceived}/-
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-10 mt-10 max-md:grid-cols-2">
              <div className="grid ">
                <label
                  htmlFor="receiptDate"
                  className="text-base font-normal mb-1 ml-2 text-black "
                >
                  Receipt Date
                </label>
                <input
                  type="date"
                  id="receiptDate"
                  value={formData.receiptDate}
                  defaultValue={getCurrentDate()}
                  onChange={handleChange}
                  className="border border-border-stroke outline-none py-2 px-4 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-white block w-full  "
                />
              </div>
              <div className="grid ">
                <label
                  htmlFor="paymentMode"
                  className="text-base font-normal mb-1 ml-2 text-black "
                >
                  Select Payment Mode
                </label>

                <select
                  name="paymentMode"
                  id="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="border border-border-stroke outline-none py-2 px-4
              rounded-md focus:ring-blue-500 focus:border-blue-500
              dark:text-white block w-full "
                >
                  <option value="Cash" default>
                    Cash
                  </option>
                  <option value="UPI">UPI</option>
                  <option value="Cheque">Cheque</option>
                  <option value="N/A">N/A</option>
                </select>
              </div>
              <div className="grid ">
                <label
                  htmlFor="panCardAadhaarCardNo"
                  className="text-base font-normal mb-1 ml-2 text-black "
                >
                  PanCard / AadhaarCard
                </label>
                <input
                  type="text"
                  id="panCardAadhaarCardNo"
                  value={formData.panCardAadhaarCardNo}
                  onChange={handleChange}
                  placeholder="Enter Pan Card / Aadhaar Card No"
                  className="border border-border-stroke outline-none py-2 px-4 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-white block w-full  "
                />
              </div>
              <div className="grid ">
                <label
                  htmlFor="depositTo"
                  className="text-base font-normal mb-1 ml-2 text-black "
                >
                  Deposit to
                </label>

                <select
                  id="depositTo"
                  value={formData.depositTo}
                  onChange={handleChange}
                  className="border border-border-stroke outline-none py-2 px-4
              rounded-md focus:ring-blue-500 focus:border-blue-500
              dark:text-white block w-full "
                >
                  <option value="Palavi" default>
                    Palavi
                  </option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
              <div className="grid ">
                <label
                  htmlFor="amountReceived"
                  className="text-base font-normal mb-1 ml-2 text-black "
                >
                  Amount Received (₹)
                </label>
                <input
                  type="number"
                  id="amountReceived"
                  value={formData.amountReceived}
                  onChange={handleChange}
                  placeholder="Enter Received Amount (₹)"
                  className="border border-border-stroke outline-none py-2 px-4 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-white block w-full  "
                />
              </div>
            </div>
            <div className="grid  mt-10">
              <div className="grid ">
                <label
                  htmlFor="receiptNote"
                  className="text-base font-normal mb-1 ml-2 text-black"
                >
                  Receipt Note
                </label>
                <textarea
                  id="receiptNote"
                  value={formData.receiptNote}
                  onChange={handleChange}
                  className="border border-border-stroke outline-none py-4 px-4 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-white block w-full  "
                  cols="30"
                  rows="6"
                  placeholder="Write your Note for this Receipt. "
                ></textarea>
              </div>
            </div>
            <div className="flex justify-between items-center gap-5 mt-10">
              <div className="text-left">
                <button
                  className=" py-2 px-4 rounded-md b border border-blue-500 text-sm font-semibold hover:text-white hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
              <div className="text-right">
                <button
                  className="  py-2 px-4 rounded-md b border border-blue-500 text-sm font-semibold hover:text-white hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button className="  ml-3 py-2 px-4 rounded-md b border border-blue-500 text-sm font-semibold hover:text-white hover:bg-blue-600">
                  Save & Next
                </button>
              </div>
            </div>
          </form>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Receipt;
