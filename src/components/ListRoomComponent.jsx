import React from 'react';
import CardComponent from './CardComponent';
import { filteredPhongSelector, listPhongSelector } from '../redux/selectors';
import { useSelector } from 'react-redux';
import FilterComponent from './FilterComponent';

const ListRoomComponent = () => {
  const listPhong = useSelector(filteredPhongSelector);

  return (
    <div className="container mx-auto px-2 py-3 md:px-4 lg:px-0">
      {/* Tiêu đề */}
      <div className="mb-4 flex md:flex-row flex-col md:items-center justify-between">
        <h2 className="text-start text-2xl font-bold">
          Danh Sách Phòng Cho Thuê{' '}
        </h2>
        <FilterComponent />
      </div>
      {listPhong.length === 0 ? (
        <div className="flex justify-center items-center h-96 text-center bg-gray-100 rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Không tìm thấy Phòng</h2>
          <p className="text-lg text-gray-500">
            Chúng tôi không thể tìm thấy phòng nào phù hợp với tiêu chí của bạn.
          </p>
          
        </div>
      </div>
      ) : (
        <div className="grid grid-cols-12 gap-x-4 gap-y-8 md:gap-y-10 xl:gap-x-6">
          {listPhong.map((phong) => (
            <div
              key={phong.id}
              className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            >
              <CardComponent phong={phong} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListRoomComponent;
