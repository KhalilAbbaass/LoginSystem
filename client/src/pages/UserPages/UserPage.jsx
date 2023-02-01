import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import "./UserPage.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getUserQuotes } from '../../services/GetUserQuotes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UserPage = () => {

    const [quotes, setQuotes] = useState([]);
    const nav = useNavigate();
    
    useEffect(() => {
        getUserQuotes().then((result) => {

            if(result.data === 'Forbidden'){
                alert("YOU CAN NOT ACCESS USER PAGE")
                nav("/")
               
            }else{
                 setQuotes(result.data)
            }      
        })
    })

  return (
    <div>
        <h4 className='h4Style'>Welcome , you are logged in as a user</h4>
        <Row > 

        {quotes.map((item, i) => (
            <Col className='colStyle' xs={6} md = {4} lg = {3} key={i}>
            <Card
                bg=''
                
                text=''
                style={{ width: '18rem' }}
                className=" cardStyle mb-2"
                >
                
                <Card.Body>
                    <h3> Quote {i} </h3>
                    <p>
                        {item.quote}
                    </p>
                </Card.Body>
            </Card>
            </Col>
        ))}
       </Row>

    </div>
  )
}

export default UserPage