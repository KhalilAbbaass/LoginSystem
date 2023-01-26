import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Login.css'

const Login = () => {
  return (
    <div>
        <Form className='loginFormStyle mb-5'>

            <h6 className='mb-4'>Please login to your account</h6>
            
            <Form.Group className="loginInputStyle mb-3 mx-5" >      
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="loginInputStyle mb-3 mx-5" >      
                <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            
            <Button className="mx-5 mb-4 mt-4 w-100 gradient-custom-2">Sign in</Button>
        
        </Form>

        
    </div>
  )
}

export default Login