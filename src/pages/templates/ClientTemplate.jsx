import React from 'react'
import NavBarComponent from '../../components/NavBarComponent'
import { Outlet } from 'react-router'
import FooterComponent from '../../components/FooterComponent'

const ClientTemplate = () => {
  return (
    <>
    <NavBarComponent/>
    <Outlet/>
    <FooterComponent/>
    </>
  )
}

export default ClientTemplate
