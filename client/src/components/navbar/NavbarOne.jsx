import Button  from 'react-bootstrap/Button';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Outlet } from "react-router-dom";

import icon from '../../assets/lionicon.png'

import { LogoutUser } from '../../services/Logout';
import { useNavigate } from 'react-router-dom';

const NavbarOne = ({currentUser, setCurrentUser}) => {

  const nav = useNavigate();

  const handleLogoutUser = () => {
    setCurrentUser("")
    LogoutUser().then(
      nav("/")
    );
  }

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
            
             {currentUser ? "Welcome "+ currentUser.username : "Login System"}
           
          </Navbar.Brand>
          {currentUser && <Button onClick={handleLogoutUser} variant ="outline-light">Logout</Button> }
          
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  )
}

export default NavbarOne;