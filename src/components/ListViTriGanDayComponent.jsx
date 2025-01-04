import React, { use, useRef } from 'react';
import { useSelector } from 'react-redux';
import { listViTriSelector } from '../redux/selectors';
import { useNavigate } from 'react-router';

const ListViTriGanDayComponent = () => {
  const listViTri = useSelector(listViTriSelector);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-2 py-3 md:px-4 lg:px-0 lg:py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-start text-2xl font-bold">
          Khám phá những điểm đến
        </h2>
        <div className="hidden lg:flex md:gap-4">
          <div
            onClick={() => scrollLeft()}
            className="cursor-pointer rounded-full border border-gray-300 bg-white px-3 py-1 shadow-sm transition-colors duration-300 hover:border-gray-400 hover:bg-gray-100"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div
            onClick={() => scrollRight()}
            className="cursor-pointer rounded-full border border-gray-300 bg-white px-3 py-1 shadow-sm transition-colors duration-300 hover:border-gray-400 hover:bg-gray-100"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
        <div
          ref={scrollContainerRef}
          className="mt-2 flex flex-nowrap gap-2 overflow-x-auto whitespace-nowrap lg:overflow-x-hidden"
        >
          {listViTri.map((vitri) => (
            <div
              key={vitri.id}
              className="inline-block min-w-[250px] cursor-pointer rounded-md hover:bg-gray-200"
            >
              <div className="flex items-start gap-2" onClick={() => navigate(`/vi-tri/${vitri.id}`)}>
                <img
                  src={vitri.hinhAnh}
                  alt={vitri.tenViTri}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="flex flex-col">
                  <p className="truncate text-lg font-medium text-gray-900">
                    {vitri.tenViTri}
                  </p>
                  <p className="text-sm text-gray-600">{vitri.tinhThanh}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default ListViTriGanDayComponent;
