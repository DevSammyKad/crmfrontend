import React from 'react';
import No_Result from '../images/No_Result.svg';

export const EmptyStateData = [
  {
    ID: 'error',
    img: No_Result,
    title: 'No Result Found',
  },
  {
    ID: 'loading',
    img: No_Result,
    title: 'Searching..',
    subtitle: 'No results found. Please try again.',
  },
];

const EmtyState = ({ id }) => {
  const filteredItem = EmptyStateData.find((item) => item.ID === id);

  if (!filteredItem) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <img src={filteredItem.img} alt="" />
        <h2 className="text-center">{filteredItem.title}</h2>
        <p className="text-center  text-sm font-medium text-bg-light-gray">
          {filteredItem.subtitle}
        </p>
      </div>
    </div>
  );
};

export default EmtyState;
