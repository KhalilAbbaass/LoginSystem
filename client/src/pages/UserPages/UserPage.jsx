import React from 'react';
import Card from 'react-bootstrap/Card';
import "./UserPage.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




const UserPage = () => {

    const allQuotes = ['1','2','3','4','5','6','7','8']


  return (
    <div>
        <h4 className='h4Style'>Welcome , you are logged in as a user</h4>
        <Row > 

        {allQuotes.map((item, i) => (
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
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
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