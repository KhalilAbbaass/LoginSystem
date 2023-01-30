import Button  from 'react-bootstrap/Button';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Outlet } from "react-router-dom";

import icon from '../../assets/lionicon.png'

const NavbarOne = () => {
  return (
    <div>
        <Navbar bg="dark" variant="dark">
        <Container>
         
          <Navbar.Brand>
            <img
              alt=''
              src={icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
             Login System
           
          </Navbar.Brand>
          <Button variant ="outline-light">Login</Button>
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  )
}

export default NavbarOne;