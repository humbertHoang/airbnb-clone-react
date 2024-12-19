import React from 'react'
import CardComponent from './CardComponent'
import { filteredPhongSelector, listPhongSelector } from '../redux/selectors';
import { useSelector } from 'react-redux';

const ListRoomComponent = () => {
    const listPhong = useSelector(filteredPhongSelector);
    if(listPhong.length === 0) return <p className='text-center'>Khong tim thay Phòng</p>;
  return (
    <div className="container mx-auto px-2 md:px-4 lg:px-0 grid grid-cols-12 gap-x-4 xl:gap-x-6 gap-y-8 md:gap-y-10">
        {listPhong.map((phong) => (
          <div key={phong.id} className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
            <CardComponent phong={phong} />
          </div>
        ))}
      </div>
  )
}

export default ListRoomComponent
