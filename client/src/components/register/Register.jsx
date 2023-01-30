import React,{useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FileBase64 from 'react-file-base64'
import './Register.css'
import Image from 'react-bootstrap/Image';
import Person4Icon from '@mui/icons-material/Person4';

import Alert from 'react-bootstrap/Alert';

import { registerUser } from '../../services/Register';


const Register = () => {

    

    const [newUser , setNewUser] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        image: ""
    });
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [registerResult, setRegisterResult] = useState("")
    

    const validate = (values) => {
        const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
   
    if(values.image.length >= 5000){
        errors.image = "Chooes a smaller image"
    }

    if(values.password !== values.confirmPassword){
        errors.confirmPassword = "Passwords do not match!"
    }

    return errors;    
    }
    useEffect(() => {
            
            if (Object.keys(formErrors).length === 0 && isSubmit) {
                registerUser(newUser).then((result)=> {
                   setRegisterResult(result.data)
                })
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [formErrors]);

    const handleRegister = (e) => {
        e.preventDefault()
        setFormErrors(validate(newUser))
        setIsSubmit(true)
    }
    

  return (
    

          <Form className='registerFormStyle mb-5'>
            {registerResult && <Alert variant="warning">{registerResult}</Alert>}

            <h6 className='mb-4'>Please register to your account</h6>
            

            <Row>
                <Col md='12'>
                    <Form.Group className="registerInputStyle mb-3 " >      
                    <Form.Control  type="username" placeholder="Enter username" onChange={(e)=> {
                            setNewUser({...newUser,username:e.target.value})
                        }
                    } />
                    </Form.Group>
                    <p style={{color:'red', margin:'2px'}}>{formErrors.username}</p>
                </Col>
                <Col md='12'>
                    <Form.Group className="registerInputStyle mb-3 ">      
                    <Form.Control type="email" placeholder="Enter Email" onChange={(e)=> {
                            setNewUser({...newUser,email:e.target.value})
                        }
                    } />
                    </Form.Group>
                    <p style={{color:'red', margin:'2px'}}>{formErrors.email}</p>
                </Col>
                <Col md='6'>
                    <Form.Group className="registerInputStyle mb-3 ">      
                    <Form.Control type="password" placeholder="Enter password" onChange={(e)=> {
                            setNewUser({...newUser,password:e.target.value})
                        }
                    }/>
                    </Form.Group>
                    <p style={{color:'red', margin:'2px'}}>{formErrors.password}</p>
                </Col>
                <Col md='6'>
                    <Form.Group className="registerInputStyle mb-3 " >      
                    <Form.Control type="password" placeholder="Confirm password" onChange={(e)=> {
                        setNewUser({...newUser, confirmPassword:e.target.value})
                    }} />
                    </Form.Group>
                    <p style={{color:'red', margin:'2px'}}>{formErrors.confirmPassword}</p>
                </Col>
                <Col md='6'>
                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Text className='m-1'>Choose Profile Picture(JPG)</Form.Text>
                    <FileBase64 type="file" multiple={false} onDone={
                        file => setNewUser({...newUser, image: file.base64})
                    }/>
                    <p style={{color:'red', margin:'2px'}}>{formErrors.image}</p>
                    </Form.Group>
                </Col>
                <Col className='imageColStyle' md='6'>
                    <div className='imageContainer'>
                        {newUser.image ? <Image className='imageStyle' alt='pp' src={newUser.image} /> : <Person4Icon style={{width:"60px", height:"60px"}}/>}
                        
                    </div>
                </Col>
                 </Row>
            

            <Button onClick={handleRegister} className="mx-5 mb-4 mt-4 w-100 gradient-custom-2">Register</Button>

            </Form>
   
  )
}

export default Register