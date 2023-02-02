import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addQuote } from '../../services/AddQuote';
import { deleteQuote } from '../../services/DeleteQuote';
import { editQuote } from '../../services/EditQuote';
import './AdminPage.css'

import { getAdminQuotes } from '../../services/GetAdminQuotes';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';


const AdminPage = () => {


    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({
        _id:'',
        quote:''
    });
    const [newEdit, setNewEdit] = useState({
       
        quote:''
    });

    const handleSubmitEdit = (_id) => {
        editQuote(_id, newEdit);
        
    }



    const nav = useNavigate();

    const [quotes , setQuotes] = useState([]);

    useEffect(() =>{
        getAdminQuotes().then((result) => {
            if(result.data === 'Forbidden'){
                alert("YOU CAN NOT ACCESS ADMIN PAGE")
                nav("/")
               
            }else{
                 setQuotes(result.data)
            }   
           
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[quotes])


    const [newQuote, setNewQuote] = useState({
        quote:''
    });

    const handleAddQuote = (e) => {
        e.preventDefault()
        addQuote(newQuote).then((result) => {
            console.log(result)
        })
    }

    const handleDeleteQuote = (_id) => {
        deleteQuote(_id)
    }

    

  return (
    <div>
        <h4 className='h4Style2'>welcome you are logged in as admin</h4>
                <div className='quoteInputDiv'>
                    <Form.Group className="formGrpStyle mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control placeholder='Add Quote' as="textarea" rows={2} 
                     onChange={(e) => {
                        setNewQuote({...newQuote, quote:e.target.value})
                     }}
                    />
                    </Form.Group> 
                    <Button  className='addBtn' 
                    onClick={handleAddQuote}
                    >
                         Add Quote</Button>{' '}
                </div>
            <div className='tableStyle'> 
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Quote</th>
                <th className='thStyle'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {quotes.map((item, i) => (
                    
                    <tr key={i}>
                         <td>{i}</td>
                         <td>
                          {item.quote}
                         </td>
                         <td className='tdStyle'>
                           
                            <Button className='btnStyle' variant="warning"
                                onClick={() =>{ 
                                    setShow(true);
                                    setModalData(item)
                                }}
                            >Edit</Button>{' '}
                            <Button className='btnStyle' variant="danger"
                                onClick={() => {
                                    handleDeleteQuote(item._id)
                                }}
                            > Delete</Button>{' '}
                        </td>
                     
                    </tr>

                ))}
              
            </tbody>
        </Table>
                    <Modal show={show} onHide={() => {setShow(false)}}>
                                <Modal.Header closeButton>
                                <Modal.Title>Edit Quote {modalData._id}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Control placeholder={modalData.quote}
                                        onChange= {(e) => {
                                            setNewEdit({...newEdit, quote:e.target.value})
                                        }}
                                    ></Form.Control>
                                     
                                    
                                </Modal.Body>
                                <Modal.Footer>
                               
                                <Button variant="primary" onClick={()=> {handleSubmitEdit(modalData._id)}}>
                                    Save Changes
                                </Button>
                                </Modal.Footer>
                     </Modal>
           
            
        </div>
    </div>
  )
}

export default AdminPage