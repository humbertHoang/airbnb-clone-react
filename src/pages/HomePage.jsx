import React, { useEffect } from 'react';
import ListViTriGanDayComponent from './../components/ListViTriGanDayComponent';
import ListRoomComponent from './../components/ListRoomComponent';
import BannerComponent from '../components/BannerComponent';
import { useDispatch } from 'react-redux';
import { changeToken, changeUser } from '../redux/slice/userSlice';
const HomePage = () => {
  
  return (
    <div className="mb-8 md:mb-12">
      <BannerComponent />
      <ListViTriGanDayComponent />
      <ListRoomComponent />
    </div>
  );
};

export default HomePage;
