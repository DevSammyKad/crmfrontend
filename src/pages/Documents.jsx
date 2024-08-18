import React from 'react';
import DocumentsIMG from '../images/documents.svg';
import Folder from '../images/folder.svg';

const Documents = () => {
  return (
    <div>
      <div className="flex justify-between items-center  my-8 bg-white py-8 px-5 rounded-lg border border-border-stroke shadow-sm ">
        <div>Important Documents </div>
        <div className="flex gap-4">
          <button className="bg-indigo-500 text-sm font-semibold  text-white py-3 px-4 rounded-lg">
            Create Folder
          </button>
          <button className="bg-blue-500 text-sm font-semibold  text-white py-3 px-4 rounded-lg">
            Create File
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-white rounded-3xl">
          <div className="p-10 flex items-center space-x-5">
            <div>
              <h1 className="text-lg font-medium">
                All Documents Availble Here
              </h1>
              <p className="text-sm font-normal mt-5">
                Add project data, create thematic pages, edit data, share
                information with team members
              </p>
            </div>
            <div>
              <img src={DocumentsIMG} className="w-60" alt="" />
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-white rounded-3xl"></div>
      </div>
      <div className="grid grid-cols-4 my-10 gap-5">
        <div className="bg-white rounded-2xl">
          <div className="p-5">
            <img src={Folder} alt="" />
            <h1 className="mt-2 text-base font-medium">Planinfg Folder</h1>
            <p className="text-sm mt-2">count pages</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl">
          <div className="p-5">
            <img src={Folder} alt="" />
            <h1 className="mt-2 text-base font-medium">Planinfg Folder</h1>
            <p className="text-sm mt-2">count pages</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl">
          <div className="p-5">
            <img src={Folder} alt="" />
            <h1 className="mt-2 text-base font-medium">Planinfg Folder</h1>
            <p className="text-sm mt-2">count pages</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl">
          <div className="p-5">
            <img src={Folder} alt="" />
            <h1 className="mt-2 text-base font-medium">Planinfg Folder</h1>
            <p className="text-sm mt-2">count pages</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
