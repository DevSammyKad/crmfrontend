import React, { useEffect, useState } from 'react';
import person from '../images/person.jpg';
import SvgNote from '../icons/Note';
import SvgCardTick from '../icons/CardTick';
import { AppoitmentData, Transaction } from '../Data/Client';
import Breadcrumbs from './Breadcrumbs';
import toast, { Toaster } from 'react-hot-toast';

const ClientProfile = () => {
  // For Notes

  const [newNote, setNewNote] = useState('');
  const [noteList, setNoteList] = useState([]);

  const addNote = (e) => {
    e.preventDefault();

    if (newNote.trim()) {
      const newNoteObject = {
        id: Math.random().toString(36).substring(2, 15),
        content: newNote,
        date: new Date().toLocaleDateString(),
      };
      setNoteList([...noteList, newNoteObject]);
      setNewNote('');
      toast.success(`Note is  Added Successfully ${newNote}`);
    } else {
      toast.error('Please Write something In Notes ');
      // Prompt user to enter content
    }
  };

  // For Appoitement

  const [sortBy, setSortBy] = useState('upcoming');

  const handleSortChange = (type) => {
    setSortBy(type);
  };

  const filteredAppointments = () => {
    const isoCurrentDate = new Date().toISOString().split('T')[0]; // Convert current date to ISO 8601 format
    switch (sortBy) {
      case 'upcoming':
        return AppoitmentData.filter(
          (appointment) =>
            new Date(appointment.Date) >= new Date(isoCurrentDate)
        );
      case 'past':
        return AppoitmentData.filter(
          (appointment) => new Date(appointment.Date) < new Date(isoCurrentDate)
        );
      default:
        return AppoitmentData;
    }
  };

  return (
    <div>
      <div className="bg-transparent">
        <div className="flex justify-between items-center">
          <div>
            <Breadcrumbs />
          </div>
          <div>
            <button className="py-2 px-4  rounded-lg bg-blue-500 text-white font-semibold  ">
              Download Info
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 my-4 lg:grid-cols-4 ">
          {/* Profile */}
          <div className="sm:col-span-4 lg:col-span-3 bg-white rounded-xl border border-border-stroke p-6 ">
            <div className="grid grid-cols-4 place-content-around">
              <div className="col-span-1 place-content-center w-full border-r border-border-stroke">
                <div className="flex items-center justify-center flex-col mb-10">
                  <img
                    src={person}
                    alt=""
                    className="w-32 h-32 rounded-full object-cover my-4"
                  />
                  <h1 className="text-2xl font-semibold">Sameer Kad</h1>
                  <h2 className="text-base font-medium text-gray-500">
                    +91 8459324821
                  </h2>
                  <h1 className="text-lg font-medium my-4 ">Appoitments</h1>
                  <div className="flex justify-between items-center w-3/5 gap-4">
                    <div className="text-center ">
                      <span className="text-2xl font-semibold">8</span>
                      <h1 className="text-base font-medium text-gray-500">
                        {' '}
                        Past
                      </h1>
                    </div>
                    <div className="text-center ">
                      <span className="text-2xl font-semibold">2</span>
                      <h1 className="text-base font-medium text-gray-500">
                        {' '}
                        Upcomming
                      </h1>
                    </div>
                  </div>
                  {/* Send Messages */}
                  <div>
                    <button className="py-2 px-4  rounded-lg bg-blue-500 text-white font-semibold mt-10">
                      {' '}
                      Send Messages
                    </button>
                  </div>
                </div>
              </div>
              {/* Profile Discription  */}
              <div className="col-span-3">
                <div className="mx-10 my-5">
                  {/* First Row */}
                  <div className="flex justify-between items-center my-4 w-full">
                    <div className="flex flex-col gap-4  w-[40%]">
                      <h1 className="text-base font-semibold text-gray-500 ">
                        Full Name
                      </h1>
                      <span className="text-base font-semibold">
                        Sameer Dnyaneshwar Kad
                      </span>
                    </div>
                    <div className="flex flex-col gap-4  w-[40%]">
                      <h1 className="text-base font-semibold text-gray-500">
                        Address
                      </h1>
                      <span className="text-base font-semibold">
                        New Sangvi
                      </span>
                    </div>
                    <div className="flex flex-col gap-4  w-[10%]">
                      <h1 className="text-base font-semibold text-gray-500">
                        Gender
                      </h1>
                      <span className="text-base font-semibold">Male</span>
                    </div>
                    <div className="flex flex-col gap-4 text-end w-[10%]">
                      <h1 className="text-base font-semibold text-gray-500">
                        Age
                      </h1>
                      <span className="text-base font-semibold">22</span>
                    </div>
                  </div>
                  <hr className="bg-gray border border-border-stroke mb-10" />
                  {/* Second Row */}
                  <div className="flex justify-between items-center my-4 w-full">
                    <div className="flex flex-col gap-4  w-[40%]">
                      <h1 className="text-base font-semibold text-gray-500">
                        Opponent Name
                      </h1>
                      <span className="text-base font-semibold">
                        Sameer Kad
                      </span>
                    </div>
                    <div className="flex flex-col gap-4  w-[40%]">
                      <h1 className="text-base font-semibold text-gray-500">
                        Address
                      </h1>
                      <span className="text-base font-semibold">
                        New Sangvi
                      </span>
                    </div>
                    <div className="flex flex-col gap-4  w-[10%]">
                      <h1 className="text-base font-semibold text-gray-500">
                        Gender
                      </h1>
                      <span className="text-base font-semibold">Female</span>
                    </div>
                    <div className="flex flex-col gap-4 text-end  w-[10%]">
                      <h1 className="text-base font-semibold text-gray-500">
                        Age
                      </h1>
                      <span className="text-base font-semibold">22</span>
                    </div>
                  </div>
                  <hr className="bg-gray border border-border-stroke mb-10" />
                  {/* Second Row */}
                  <div className="flex justify-between items-center my-4">
                    <div className="flex flex-col gap-4">
                      <h1 className="text-base font-semibold text-gray-500">
                        Service Name
                      </h1>
                      <span className="text-base font-semibold">
                        Marrige Problems
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h1 className="text-base font-semibold text-gray-500">
                        Onboarding Date
                      </h1>
                      <span className="text-base font-semibold">
                        22-Jan-2024
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h1 className="text-base font-semibold text-gray-500">
                        Relation
                      </h1>
                      <span className="text-base font-semibold">
                        Husband/Wife
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h1 className="text-base font-semibold text-gray-500">
                        Case Status
                      </h1>
                      <span className="text-base font-semibold bg-red-200 text-red-600 rounded-3xl text-center">
                        Close
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes  */}
          <div className="sm:col-span-4 lg:col-span-1 bg-white rounded-xl border border-border-stroke p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-base font-bold flex gap-4">
                <SvgNote />
                Create Notes
              </h1>
              <button className="text-blue-500">See all</button>
            </div>
            <form action="submit">
              <textarea
                name="notes"
                id="notes"
                cols="30"
                rows="5"
                placeholder="Take All Notes here "
                onChange={(e) => setNewNote(e.target.value)}
                value={newNote}
                className=" border border-border-stroke outline-none focus:border focus:border-border-stroke py-2 px-4 my-4 rounded-lg "
              ></textarea>
              <button
                onClick={addNote}
                className="py-2 px-4 my-4 rounded-lg bg-blue-500 text-white font-semibold"
              >
                Take Notes
              </button>
            </form>
            {noteList.map((note) => (
              <div key={note.id} className="pb-4">
                {/* Truncate title to 30 characters */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-semibold">
                      {note.content.slice(0, 30)}...
                    </h2>{' '}
                    <p className="text-xs text-gray-500 font-semibold">
                      {note.date}
                    </p>
                  </div>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>{' '}
                  {/* Add delete functionality */}
                </div>
              </div>
            ))}
            <Toaster />
          </div>
        </div>
        {/* Appointment Section */}
        <div className="">
          <div className="grid sm:grid-cols-2 gap-4 my-4 lg:grid-cols-4 ">
            <div className="sm:col-span-4 lg:col-span-3 bg-white rounded-xl border border-border-stroke p-6">
              {/* Appoitment Header  */}
              <div className="flex justify-between items-center">
                <div className="flex gap-10 items-center justify-center rounded-lg px-3 py-2 bg-slate-200">
                  <button
                    className={`py-2 px-4 rounded-lg bg-transparent ext-blue-500 font-semibold text-sm ${
                      sortBy === 'upcoming'
                        ? ' active: bg-white active: text-blue-500 focus:bg-white focus:text-blue-500 font-semibold'
                        : 'text-slate-600'
                    } `}
                    onClick={() => handleSortChange('upcoming')}
                  >
                    Upcoming Appointments
                  </button>
                  <button
                    className={`py-2 px-4 rounded-lg bg-transparent text-slate-600 font-semibold text-sm ${
                      sortBy === 'past'
                        ? 'active:bg-white active:text-blue-500 focus:bg-white focus:text-blue-500'
                        : 'text-slate-600'
                    }`}
                    onClick={() => handleSortChange('past')}
                  >
                    Past Appointments
                  </button>
                  <button
                    className={`py-2 px-4 rounded-lg bg-transparent text-slate-600 font-semibold text-sm ${
                      sortBy === 'all'
                        ? 'active:bg-white active:text-blue-500 focus:bg-white focus:text-blue-500'
                        : 'text-slate-600'
                    }`}
                    onClick={() => handleSortChange('all')}
                  >
                    All Appointments
                  </button>
                </div>
                <div>
                  <button className="py-2 px-4  rounded-lg bg-blue-500 text-white font-semibold text-sm ">
                    {' '}
                    Add Appointment
                  </button>
                </div>
              </div>
              {/* Appoitment Timeline  */}
              <div className="bg-slate-200 my-10 rounded-md p-4 h-64 overflow-y-auto">
                {filteredAppointments().map((item, index) => {
                  return (
                    <div key={index} className="bg-white rounded-lg ">
                      <div className="m-4 p-4 flex justify-between items-center text-center">
                        <div className="text-start">
                          <h1 className="text-base font-semibold">
                            {item.Date}
                          </h1>
                          <span className="text-sm text-slate-500 font-semibold">
                            {item.Time}
                          </span>
                        </div>
                        <div className="">
                          <h1 className="text-sm text-slate-500 font-semibold">
                            Type
                          </h1>
                          <span className="text-base font-semibold">
                            {item.Type}
                          </span>
                        </div>
                        <div className="">
                          <h1 className="text-sm text-slate-500 font-semibold">
                            Consultant
                          </h1>
                          <span className="text-base font-semibold">
                            {item.Consultant}
                          </span>
                        </div>
                        <div className="">
                          <h1 className="text-sm text-slate-500 font-semibold">
                            Consultant
                          </h1>
                          <span className="text-base font-semibold">
                            {item.Consultant}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <h1 className="text-blue-500 font-semibold text-base ">
                            Notes
                          </h1>
                          <SvgNote />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Section */}
            <div className="sm:col-span-4 lg:col-span-1 bg-white rounded-xl border border-border-stroke p-6">
              <div>
                <h1 className="text-base font-bold flex gap-4">
                  <SvgCardTick /> Payments
                </h1>
                <div className="flex justify-between items-center my-5">
                  <h4 className="text-sm font-semibold text-gray">
                    Transaction
                  </h4>
                  <h4 className="text-sm font-semibold text-gray">Amount</h4>
                </div>
                {Transaction.map((item, index) => {
                  let statusColor;

                  switch (item.Status) {
                    case 'Paid':
                      statusColor = 'bg-green-400';
                      break;
                    case 'Due':
                      statusColor = 'bg-orange-400';
                      break;
                    case 'Failed':
                      statusColor = 'bg-red-400';
                      break;

                    default:
                      statusColor = 'bg-gray-400';
                      break;
                  }
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center my-5"
                    >
                      <div className="flex gap-3 items-center">
                        <div
                          className={`rounded-full w-3 h-2 ${statusColor}`}
                        ></div>
                        <h4 className="text-sm font-bold flex flex-col">
                          {item.reason}
                          <span className="text-[10px] text-gray-600">
                            {item.Date}
                          </span>
                        </h4>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold ">{item.Amount}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className=" grid grid-cols-3 gap-4 ">
          <div className="col-span-3 bg-white rounded-xl border border-border-stroke p-6">
            <div>
              <h1 className="text-blue-500 text-lg font-semibold">Documents</h1>
            </div>
            <div></div>
          </div>
          <div className=" bg-white rounded-xl border border-border-stroke p-6"></div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
