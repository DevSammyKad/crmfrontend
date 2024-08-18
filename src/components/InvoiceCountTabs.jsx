import React, { useState } from 'react';
import { useMemo } from 'react';

const InvoiceCountTabs = ({ invoiceData, setFilteredData }) => {
  const tabColors = {
    'All Invoice': 'bg-blue-100 text-blue-800',
    Paid: 'bg-green-100 text-green-800',
    Pending: 'bg-red-100 text-red-800',
    Draft: 'bg-gray-200 text-gray-800',
  };

  const [activeTab, setActiveTab] = useState('All Invoice');

  const handleClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'All Invoice') {
      setFilteredData(invoiceData);
    } else {
      const filteredData = invoiceData.filter((item) => {
        if (item.Status) {
          return item.Status.toLowerCase() === tabName.toLowerCase();
        }
        // If item.Status is undefined, exclude the item from the filtered data
        return false;
      });

      setFilteredData(filteredData);
    }
  };

  const tabCounts = useMemo(() => {
    if (!invoiceData)
      return {
        allInvoiceCount: 0,
        paidCount: 0,
        pendingCount: 0,
        draftCount: 0,
      };

    const allInvoiceCount = invoiceData.length;
    const paidCount = invoiceData.filter(
      (item) => item.Status === 'Paid'
    ).length;
    const pendingCount = invoiceData.filter(
      (item) => item.Status === 'Pending'
    ).length;
    const draftCount = invoiceData.filter(
      (item) => item.Status === 'Draft'
    ).length;

    return { allInvoiceCount, paidCount, pendingCount, draftCount };
  }, [invoiceData]);

  return (
    <div className="flex items-center justify-center space-x-5 bg-gray-100 rounded-full py-1 px-4  max-sm:flex-col sm:hidden  max-sm:rounded-md  lg:flex">
      {['All Invoice', 'Paid', 'Pending', 'Draft'].map((tabName) => (
        <button
          key={tabName}
          className={`flex justify-center items-center space-x-2  py-2 px-4 rounded-full outline-none ${
            activeTab === tabName ? 'bg-white shadow-sm' : ''
          }
          }
          `}
          style={{ backgroundColor: tabColors }}
          onClick={() => handleClick(tabName)}
        >
          <h4
            className={`font-semibold text-xs  ${
              activeTab === tabName ? 'text-black' : ' text-gray-600'
            }`}
          >
            {tabName}
          </h4>
          <span
            className={`rounded-full
            w-7 h-7 p-1 text-sm font-semibold ${tabColors[tabName]}
          `}
          >
            {tabName === 'All Invoice'
              ? tabCounts.allInvoiceCount
              : tabName === 'Paid'
              ? tabCounts.paidCount
              : tabName === 'Pending'
              ? tabCounts.pendingCount
              : tabName === 'Draft'
              ? tabCounts.draftCount
              : '0'}
          </span>
        </button>
      ))}
    </div>
  );
};

export default InvoiceCountTabs;
