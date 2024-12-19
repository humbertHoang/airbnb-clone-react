import React from 'react';

const BannerComponent = () => {
  return (
    <div className="relative w-full h-screen md:px-4 lg:px-0 ">
      <img
        src="https://www.canhovinhomes.land/datafiles/32907/upload/images/members/6.%20Phan%20khu%204/Beverly%202.jpg"
        alt="banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center px-2 md:px-4 lg:px-0">
        <h1 className="text-white text-3xl font-bold mb-4 text-center">Chào mừng đến với website của chúng tôi!</h1>
        <a href='#listRoom' className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
          Khám Phá
        </a>
      </div>
    </div>
  );
};

export default BannerComponent;
