import React from 'react'
import { useSelector } from 'react-redux'
import { listViTriSelector } from '../redux/selectors';

const ListViTriGanDayComponent = () => {
    const listViTri = useSelector(listViTriSelector);
  return (
    <div className='container mx-auto px-2 md:px-4 lg:px-0 py-3 md:py-6 lg:py-8'>
      <h2 className='text-2xl font-bold text-start mb-6'> Khám phá những điểm đến gần đây</h2>
      <div className='grid grid-cols-12 gap-2 max-h-52 overflow-y-auto mt-2'>
        {listViTri.slice(0, 8).map((vitri) => (
          <div key={vitri.id} className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3  cursor-pointer hover:bg-gray-200 rounded-md">
            <div className='flex items-start gap-2'>
                <img src={vitri.hinhAnh} alt={vitri.tenViTri} className='w-20 h-20 object-cover rounded-md' />
                <div className='flex flex-col'>
                    <p className='text-lg font-medium text-gray-900 truncate'>{vitri.tenViTri}</p>
                    <p className='text-sm text-gray-600'>{vitri.tinhThanh}</p>
                </div>
            </div>
          </div>
        ))}
    </div>
    </div>
  )
}

export default ListViTriGanDayComponent 
