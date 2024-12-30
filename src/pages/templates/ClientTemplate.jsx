import React, { useEffect } from 'react'
import NavBarComponent from '../../components/NavBarComponent'
import { Outlet } from 'react-router'
import FooterComponent from '../../components/FooterComponent'
import { useDispatch } from 'react-redux'
import { changeToken, changeUser } from '../../redux/slice/userSlice'

const ClientTemplate = () => {
  const dispatch = useDispatch();
  const initializeUser = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      dispatch(changeUser(JSON.parse(user)));
      dispatch(changeToken(token));
    }
  };
  useEffect(() => initializeUser(), [dispatch]);
  return (
    <>
      <NavBarComponent />
      <Outlet />
      <FooterComponent />
    </>
  );
};

export default ClientTemplate;
