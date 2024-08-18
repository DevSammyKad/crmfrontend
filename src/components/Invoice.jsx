import React, { useEffect } from 'react';
import { UilTrashAlt, UilPlusCircle } from '@iconscout/react-unicons';
import { useState, useRef } from 'react';
import SvgCloseCircle from '../icons/CloseCircle';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Invoice = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    invoiceId: '',
    Issued: '',
    DueDate: '',
    compName: '',
    compAddress: '',
    compSecAddress: '',
    phoneNumber: '',
    itemId: '',
    itemPrice: '',
    quantity: '',
    gst: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/create-receipt',
        formData
      );
      toast.success('Invoice Data store succesfully');
      console.log('Form Data:', JSON.stringify(formData, null, 2));
    } catch (error) {
      console.error('error to submit Data', error);
      toast.error(' Please retry  ');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'date') {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      setFormData((prevData) => ({
        ...prevData,
        date: formattedDate,
      }));
    } else {
      // For other inputs, update the state as usual
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };
  const [invoiceItems, setInvoiceItems] = useState([
    { sr: 1, item: '', price: '', quantity: '', total: '' },
  ]);

  const invoiceContainerRef = useRef(null);

  const [issuedDate, setissuedDate] = useState('');

  useEffect(() => {
    // Function to get the current date and format it
    const getCurrentDate = () => {
      const currentDate = new Date();
      const formattedDate =
        currentDate.getFullYear() +
        '-' +
        String(currentDate.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(currentDate.getDate()).padStart(2, '0');
      return formattedDate;
    };
    setissuedDate(getCurrentDate());
  }, []);
  const addRow = () => {
    setInvoiceItems((prevItems) => [
      ...prevItems,
      {
        sr: prevItems.length + 1,
        item: '',
        price: '',
        quantity: '',
        total: '',
      },
    ]);
  };

  const deleteRow = (sr) => {
    setInvoiceItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.sr !== sr);

      // Update the sr values based on the new index
      return updatedItems.map((item, index) => ({
        ...item,
        sr: index + 1,
      }));
    });
  };

  const handleInputChange = (sr, field, value) => {
    setInvoiceItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.sr === sr
          ? {
              ...prevItem,
              [field]: value,
              total:
                field === 'price' || field === 'quantity'
                  ? calculateTotal(prevItem.price, prevItem.quantity)
                  : prevItem.total,
            }
          : prevItem
      )
    );
  };

  const calculateTotal = (price, quantity) => {
    // Convert price and quantity to numbers
    const numericPrice = parseFloat(price);
    const numericQuantity = parseFloat(quantity);

    // Check if the inputs are valid numbers
    if (isNaN(numericPrice) || isNaN(numericQuantity)) {
      return ''; // or any default value you want to display
    }

    // Check if quantity is not zero to avoid division by zero
    if (numericQuantity === 0) {
      return 0; // or any default value you want to display
    }

    // Calculate the total
    const total = numericPrice * numericQuantity;

    // Return the total
    return total;
  };

  const calculateSubtotal = () => {
    let subtotal = 0;

    // Iterate through each item in the invoiceItems array
    invoiceItems.forEach((item) => {
      // Convert price and quantity to numbers
      const numericPrice = parseFloat(item.price);
      const numericQuantity = parseFloat(item.quantity);

      // Check if the inputs are valid numbers
      if (!isNaN(numericPrice) && !isNaN(numericQuantity)) {
        subtotal += numericPrice * numericQuantity;
      }
    });

    // Return the calculated subtotal
    return subtotal.toFixed(2); // Adjust to the desired number of decimal places
  };
  const [selectedGST, setSelectedGST] = useState(5);

  const handleGSTchange = (event) => {
    setSelectedGST(parseInt(event.target.value, 10));
  };

  const tax = () => {
    // Convert subtotal to a number
    const numericSubtotal = parseFloat(calculateSubtotal());

    // Check if the subtotal is a valid number
    if (isNaN(numericSubtotal)) {
      return ''; // or any default value you want to display
    }

    // Calculate tax based on selected GST rate
    const taxAmount = (numericSubtotal * selectedGST) / 100;

    // Return the calculated tax amount
    return taxAmount.toFixed(2); // Adjust to the desired number of decimal places
  };
  const netTotal = () => {
    const numericSubtotal = parseFloat(calculateSubtotal());
    const numericTax = parseFloat(tax());

    if (isNaN(numericSubtotal) || isNaN(numericTax)) {
      return '';
    }
    const total = numericSubtotal + numericTax;

    return total.toFixed(2);
  };
  const printInvoice = () => {
    if (invoiceContainerRef.current) {
      const originalDisplay = invoiceContainerRef.current.style.display;
      invoiceContainerRef.current.style.display = 'block';
      window.print();
      invoiceContainerRef.current.style.display = originalDisplay || '';
    } else {
      console.error("Ref 'invoiceContainerRef' not found.");
    }
  };

  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  console.log(phoneNumber);

  return (
    <div className="fixed inset-0 overflow-auto bg-white bg-opacity-5  backdrop-blur-sm  flex items-center justify-center z-10">
      <div className="max-w-full max-h-full overflow-auto">
        <div
          id="invoice-container"
          ref={invoiceContainerRef}
          className="invoice-container flex flex-col justify-between mt-6 border border-border-stroke rounded-lg p-8 bg-white shadow-lg"
        >
          <header className="flex justify-between ">
            <div>
              <h1 className="text-gray leading-7 tracking-wide font-semibold ">
                Palavi Samajik Sanstha
              </h1>
              <h1 className="text-gray leading-7 tracking-wide font-semibold ">
                palaviSanstha.org@gmail.com
              </h1>
              <h1 className="text-gray leading-7 tracking-wide font-semibold ">
                91+8459324821
              </h1>
            </div>
            <div>
              <h1 className="text-gray leading-7 tracking-wide font-semibold ">
                Flat No 1, Sagar Apartment, Rakshewadi Rd,
              </h1>
              <h1 className="text-gray leading-7 tracking-wide font-semibold ">
                Rajgurunagar ,Pune
              </h1>
              <h1 className="text-gray leading-7 tracking-wide font-semibold ">
                GST NO
              </h1>
            </div>
          </header>
          <hr className="my-10 print:my-2" />
          <div className="flex flex-row justify-between gap-4 w-full my-4 ">
            <div className="flex  gap-4">
              <span className="bg-gray-light py-2 px-4 rounded-md font-semibold">
                Invoice ID{' '}
              </span>
              <input
                className="border-border-stroke w-[250px] border rounded-lg py-2 px-4 outline-none focus:border-indigo-400"
                type="number"
                placeholder="Enter Invoice Number"
                id="invoiceId"
                value={formData.invoiceId}
                onChange={handleChange}
              />
            </div>
            <div className="flex  gap-4">
              <span className=" w-[100px] text-center  bg-gray-light py-2 px-4 rounded-md font-semibold">
                Issued{' '}
              </span>
              <input
                className=" w-[250px] border-border-stroke border rounded-lg py-2 px-4 outline-none focus:border-indigo-400"
                type="date"
                placeholder="Issued Date"
                id="Issued"
                value={issuedDate}
                onChange={(e) => setissuedDate(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <span className="  text-center bg-gray-light py-2 px-4 rounded-md font-semibold">
                Due{' '}
              </span>
              <input
                className="border-border-stroke border rounded-lg py-2 px-4 outline-none focus:border-indigo-400"
                type="date"
                placeholder="Enter Due Date"
                id="DueDate"
                value={formData.DueDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr className="text-slate-500 border-dashed my-4 w-10/12 mx-auto print:hidden print:my-0" />

          <div className="flex flex-row justify-start gap-14 w-full my-4">
            <div className="flex  gap-4">
              <span className="w-[100px] h-[43px] text-center bg-gray-light py-2 px-4 rounded-md font-semibold">
                Bill To{' '}
              </span>
              <div className="flex flex-col">
                <input
                  className="w-[250px] border-border-stroke border rounded-lg py-2 px-4 outline-none focus:border-indigo-400"
                  type="text"
                  placeholder="Enter Company Name"
                  id="compName"
                  value={formData.compName}
                  onChange={handleChange}
                />
                <input
                  className="w-[250px] border-border-stroke border rounded-lg py-2 px-4 outline-none focus:border-indigo-400"
                  type="text"
                  placeholder="Enter Address"
                  id="compAddress"
                  value={formData.compAddress}
                  onChange={handleChange}
                />
                <input
                  className="w-[250px] border-border-stroke border rounded-lg py-2 px-4 outline-none focus:border-indigo-400"
                  type="text"
                  placeholder="Enter Second Address"
                  id="compSecAddress"
                  value={formData.compSecAddress}
                  onChange={handleChange}
                />
                <input
                  className="w-[250px] border-border-stroke border rounded-lg py-2 px-4 outline-none focus:border-indigo-400"
                  type="text"
                  placeholder="Enter Phone Number"
                  id="phoneNumber"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={handlePhoneInputChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            Invoice Items
            <div className="rounded-lg">
              <table className="w-full border border-border-stroke rounded-lg ">
                <thead className=" border border-border-stroke rounded-lg ">
                  <tr>
                    <th className="py-2 px-4"># Sr </th>
                    <th className="py-2 px-4">Details</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Total Price</th>
                  </tr>
                </thead>
                <tbody id="tBody">
                  {invoiceItems.map((item, index) => (
                    <tr
                      key={index}
                      className="text-center items-center border border-border-stroke"
                    >
                      <td>{item.sr}</td>
                      <td>
                        <input
                          className="py-2 px-4 border border-border-stroke focus:border-indigo-400 outline-none rounded-md my-2"
                          type="text"
                          placeholder="Item"
                          id="itemId"
                          value={item.item}
                          onChange={(e) =>
                            handleInputChange(item.sr, 'item', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="py-2 px-4 border border-border-stroke focus:border-indigo-400 outline-none rounded-md "
                          type="number"
                          id="itemPrice"
                          placeholder="Price"
                          value={item.price}
                          onChange={(e) =>
                            handleInputChange(item.sr, 'price', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="py-2 px-4 border border-border-stroke focus:border-indigo-400 outline-none rounded-md "
                          type="number"
                          id="quantity"
                          placeholder="Quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            handleInputChange(
                              item.sr,
                              'quantity',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>{calculateTotal(item.price, item.quantity)}</td>
                      <td>
                        <button
                          onClick={() => deleteRow(item.sr)}
                          className="py-2 px-4 rounded-md b border border-white text-sm font-semibold my-5 text-white bg-red-500"
                        >
                          <UilTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={addRow}
                className=" print:hidden flex  gap-3 items-center py-2 px-4 rounded-md b border border-white text-sm font-semibold my-5 text-white bg-blue-600"
              >
                <UilPlusCircle />
                Add Item
              </button>
            </div>
            <div className="my-10 flex   mr-20">
              <h1 className="py-2 px-4 print:hidden ">Please Select GST</h1>
              <select
                className=" print:hidden w-72 border-border-stroke border py-2 px-4 rounded-lg outline-none"
                name="gst"
                id="gst"
                placeholder="Please Select GST"
                onChange={handleGSTchange}
                value={selectedGST}
              >
                <option value={5}>5%</option>
                <option value={12}>12%</option>
                <option value={18}>18%</option>
                <option value={28}>28%</option>
                <option value={0}>With Out GST</option>
              </select>
            </div>
            <div className="flex justify-end mr-20">
              <div>
                <div className="font-semibold text-lg text-end flex justify-between gap-10">
                  <h1 className="text-gray">Sub Total : </h1>
                  <span className="text-start"> {calculateSubtotal()}</span>
                </div>
                <div className="font-semibold text-lg text-end flex justify-between gap-10">
                  <h1 className="text-gray"> GST ({selectedGST}%) : </h1>
                  <span className="text-start"> {tax()}</span>
                </div>
                <div className=" mt-4 font-semibold text-lg text-blue-600 text-end flex justify-between gap-10">
                  <h1>Total : </h1>
                  <span className="text-start">{netTotal()}</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-10 border border-border-stroke" />
          <div className="flex justify-between items-center">
            <div>
              <h1 className="mt-20 text-lg font-semibold">
                Thanks for the business.
              </h1>
              <h1 className="text-gray mt-5 underline">Terms & Conditions</h1>
              <h1 className="text-gray mt-2 ">
                Please pay within 15 days of receiving this invoice.
              </h1>
            </div>
          </div>
        </div>
        <div className=" flex justify-between items-center mt-6 border border-border-stroke rounded-lg p-8 bg-white shadow-lg">
          <div>
            <h1>Invoice ID:</h1>
          </div>
          <div className="flex gap-5">
            <button
              className=" flex items-center gap-3 py-2 px-4 rounded-md b border border-blue-500 text-sm font-semibold hover:text-white hover:bg-blue-600"
              onClick={closeModal}
            >
              Go Back
              <SvgCloseCircle />
            </button>
            <button
              onClick={handleSubmit}
              className="py-2 px-4 rounded-md b border border-blue-500 text-sm font-semibold hover:text-white hover:bg-blue-600"
            >
              Save Invoice
            </button>
            <button
              onClick={() => printInvoice('invoice-container')}
              className="py-2 px-4 rounded-md b border border-blue-500 text-sm font-semibold hover:text-white hover:bg-blue-600"
            >
              Print Invoice
            </button>
            <button className="py-2 px-4 rounded-md b border border-blue-500 text-sm font-semibold hover:text-white hover:bg-blue-600">
              Send Invoice
            </button>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Invoice;
