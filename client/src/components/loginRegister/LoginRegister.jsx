import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import './LoginRegister.css';
import icon from '../../assets/lionicon.png'
import Login from '../login/Login';
import Register from '../register/Register';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginRegister = ({handleToggleLogin, currentUser}) => {

    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Login', value: '1' },
        { name: 'Register', value: '2' },
  ];

  const nav = useNavigate();

  useEffect(() => {
    if(currentUser){
        if(!currentUser.isAdmin){
            nav("/user")
        }else if(currentUser.isAdmin){
            nav("/admin")
        }
    }
  })
  

  return (
    <div>
        <Container className="my-1 gradient-form">

<Row>

  <Col md='6' className="mb-5">
    <div className="d-flex flex-column ">

      <div className="text-center">
        <img src={icon}
          style={{width: '185px'}} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1">Welcome to Login System</h4>
      </div>

        {radioValue === '1' ? <Login handleToggleLogin = {handleToggleLogin} /> : <Register/>}
     



    </div>

  </Col>

  <Col md='6' className="mb-5">
    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
        <ButtonGroup className='px-5'>
                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-light' : 'outline-light'}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>
      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
       
        <h4 className="mb-4">Login System features</h4>
        <p className="small mb-0">This login system focuses on the JWT Token, Authentication, Authorization. 
                                    It also shows how a user is not allowed to perform operations that the admin can do. 
                                    <br/>
                                    To log in as an admin:  
                                    <br/>
                                    Email: admin@gmail.com 
                                    <br/>
                                    Password: admin123
        </p>
      </div>

    </div>

  </Col>

</Row>

</Container>



    </div>
  )
}

export default LoginRegister