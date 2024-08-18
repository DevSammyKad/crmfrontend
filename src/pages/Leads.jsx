import React, { useEffect, useState } from 'react';
import NewleadForm from '../components/NewleadForm';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import EmtyState from '../components/EmtyState';
import axios from 'axios';

const Leads = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const closeModal = () => setShowModal(false);

  // * CODE For Data Tables    ////

  // const baseUrl = process.env.REACT_APP_BASEURL;
  const baseUrl = import.meta.env.VITE_BASEURL;
  console.log(baseUrl);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/leads/get/`);
        console.log(response.data);
        setUsers(response.data.leads);
      } catch (error) {
        console.error('Error fetching leads:', error);
        // setError('Error fetching leads data');
        // setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const columns = [
    { name: 'lead_name', label: 'Lead Name' },
    { name: 'lead_contact', label: 'Lead Contact' },
    { name: 'lead_email', label: 'Lead Email' },
    { name: 'status', label: 'Status' },
    { name: 'date', label: 'Date' },
    { name: 'problem', label: 'Problem' },
    { name: 'source', label: 'Source' },
    { name: 'gender', label: 'Gender' },
    { name: 'note', label: 'Note' },
  ];

  const deleteLead = async (leadId) => {
    console.log(leadId);
    try {
      const response = await axios.delete(
        `${baseUrl}/api/leads/delete/${leadId}`
      );

      // Check if the status code indicates success (2xx)
      if (response.status >= 200 && response.status < 300) {
        // Remove the deleted lead from the state
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== leadId)
        );
        toast.success('Lead deleted successfully');
      } else {
        throw new Error(`Error deleting lead: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Lead deletion failed. Please try again.');
    }
  };
  const options = {
    elevation: 1,
    rowsPerPage: 10,
    filter: true,
    download: true,
    print: true,
    search: true,
    searchPlaceholder: 'Search Leads',
    downloadOptions: {
      filename: 'Leads.csv',
      separator: ',',
    },
    responsive: 'vertical',
    rowsPerPageOptions: [5, 10, 20, 30],

    selection: true,
    onSelectionChange: (selectedRows) => setSelectedRows(selectedRows),
    customBodyRender: (value) => (
      <span className={statusStyle(value)}>{value}</span>
    ),

    onRowsDelete: async (rowsDeleted) => {
      const leadIdsToDelete = rowsDeleted.data.map(
        (row) => users[row.dataIndex]._id
      );

      // Delete each lead based on the collected lead IDs
      for (let i = 0; i < leadIdsToDelete.length; i++) {
        await deleteLead(leadIdsToDelete[i]);
      }
    },
  };

  const tableStyle = {
    borderRadius: '15px',
    overflow: '',
  };

  const genderStyle = (value) => {
    if (value === 'Male') {
      return 'text-green-600 bg-green-200 py-2 px-4 rounded-full';
    } else if (value === 'Female') {
      return 'text-pink-600 bg-pink-200 py-2 px-4 rounded-full';
    }
    return '';
  };

  const statusStyle = (value) => {
    switch (value) {
      case 'Confused':
        return 'bg-yellow-100 text-yellow-600  py-2 px-4 rounded-full ';
      case 'Interested':
        return 'bg-blue-100 text-blue-600  py-2 px-4 rounded-full';
      case 'Not Interested':
        return 'bg-red-100 text-red-600  py-2 px-4 rounded-full';
      case 'Onboard':
        return 'bg-green-100 text-green-600  py-2 px-4 rounded-full';
      case 'Close':
        return 'bg-pink-100 text-pink-600  py-2 px-4 rounded-full';
      case 'Other':
        return 'bg-slate-100 text-slate-800  py-2 px-4 rounded-full';
      default:
        return '';
    }
  };
  const sourceStyle = (value) => {
    switch (value) {
      case 'instagram':
        return 'bg-yellow-100 text-yellow-600  py-2 px-4 rounded-full ';
      case 'Interested':
        return 'bg-blue-100 text-blue-600  py-2 px-4 rounded-full';
      case 'Not Interested':
        return 'bg-red-100 text-red-600  py-2 px-4 rounded-full';
      case 'Onboard':
        return 'bg-green-100 text-green-600  py-2 px-4 rounded-full';
      case 'Close':
        return 'bg-pink-100 text-pink-600  py-2 px-4 rounded-full';
      case 'Other':
        return 'bg-slate-100 text-slate-800  py-2 px-4 rounded-full';
      default:
        return '';
    }
  };

  const getMuiTheme = () =>
    createTheme({
      palette: {
        background: {
          paper: '#ffffff',
        },
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: '10px 4px',
              color: '#979797',
              lineHeight: '16px',
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '12px',
              fontFamily: 'Roboto',
            },
            body: {
              padding: '10px 4px',
              border: 'none',
            },
          },
        },
      },
    });

  // if (loading)
  //   return (
  //     <div>
  //       <div className="flex justify-center animate-pulse ">
  //         {loading && <EmtyState id="loading" />}
  //       </div>
  //     </div>
  //   );
  // if (error)
  //   return (
  //     <div className="flex justify-center ">
  //       {error && <EmtyState id="error" />}
  //     </div>
  //   );
  // else {
  return (
    <div>
      <div className="flex justify-between items-center my-8 bg-white py-8 px-5 rounded-lg border border-border-stroke shadow-sm ">
        <div>Leads </div>
        <div className="flex gap-4">
          <button
            className="bg-indigo-500 text-sm font-semibold  text-white py-3 px-4 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Add New Lead
          </button>
          <button className="bg-blue-500 text-sm font-semibold  text-white py-3 px-4 rounded-lg">
            Import Lead
          </button>
        </div>
      </div>
      {showModal && <NewleadForm closeModal={closeModal} />}
      <ThemeProvider theme={getMuiTheme()}>
        <div style={tableStyle}>
          <MUIDataTable
            title={`All Leads : ${users?.length}`}
            data={users}
            options={options}
            columns={columns.map((column) => ({
              ...column,
              options: column.options
                ? { ...column.options, ...options }
                : options,
            }))}
            actions={[
              {
                icon: 'delete',
                tooltip: 'Delete Lead',
                onclick: () => deleteLead(),
              },
            ]}
          />
        </div>
      </ThemeProvider>
      <Toaster />
    </div>
  );
};
// };

export default Leads;
