import React ,{useState , useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Login.css'
import { LoginUser } from '../../services/Login';


const Login = ({handleToggleLogin}) => {

    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const [userLogin , setLoginUser] = useState({
        email:"",
        password:""
    })

    const validate = (values) => {
        const errors = {};
    
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } 
   
    

    return errors;    
    }
    useEffect(() => {
      
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            LoginUser(userLogin).then((result)=> {
               console.log(result.data)
               handleToggleLogin();
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formErrors]);

    const handleLoginIn = (e) => {
        e.preventDefault()
        setFormErrors(validate(userLogin))
        setIsSubmit(true)
       
    }

  return (
    <div>
        <Form className='loginFormStyle mb-5'>

            <h6 className='mb-4'>Please login to your account</h6>
            
            <Form.Group className="loginInputStyle mb-3 mx-5" >      
                <Form.Control type="email" placeholder="Enter email" onChange={(e)=> {
                            setLoginUser({...userLogin,email:e.target.value})
                        }
                    } />
                    <p style={{color:'red', margin:'2px'}}>{formErrors.email}</p>
            </Form.Group>
            

            <Form.Group className="loginInputStyle mb-3 mx-5" >      
                <Form.Control type="password" placeholder="Enter password" onChange={(e)=> {
                            setLoginUser({...userLogin,password:e.target.value})
                        }
                    } />
                     <p style={{color:'red', margin:'2px'}}>{formErrors.password}</p>
            </Form.Group>
           
            
            <Button onClick={handleLoginIn} className="mx-5 mb-4 mt-4 w-100 gradient-custom-2">Sign in</Button>
        
        </Form>

        
    </div>
  )
}

export default Login