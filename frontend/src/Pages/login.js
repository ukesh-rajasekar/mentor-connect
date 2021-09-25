import React from 'react';
import { useState } from 'react';
import { Card, Row, ListGroup, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';
import { showToast } from '../Components/Constants/toastServices';
import MentorConnect from '../Components/MentorConnect.jpg';
import bg from '../Components/bb.jpeg';
export default function Login() {
   const history = useHistory();
   const [formValues, setForm] = useState({ email: '', password: '' });

   const onsubmit = () => {
      console.log(formValues);
      axios
         .post('/login', formValues)
         .then((res) => {
            if (res.data.token) {
               localStorage.setItem('token', res.data.token);
               localStorage.setItem('email', res.data.email);
               localStorage.setItem('userId', res.data.id);
               localStorage.setItem('userName', res.data.name);
            }
            showToast(`Hey ${res.data.name}`, 'success');
            console.log(res.data);
            history.push('/home');
         })
         .catch((err) => {
            showToast('Login error', 'error');
         });
   };

   return (
      <div
         className='Login-component'
         style={{
            backgroundImage: `url(${bg})`,
         }}
      >
         <div
            className='wrapper'
            style={{
               width: '40vw',
               margin: 'auto',
               marginTop: '5vh',
               textAlign: 'left',
               backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
         >
            <Row className='justify-content-md-center'>
               <Col>
                  <Card
                     className=' text-center'
                     style={{ backgroundColor: '#3A3B3C' }}
                     id='login-card'
                  >
                     <Card.Body className='container'>
                        <Card.Header
                           style={{ fontSize: '25px', fontStyle: 'italic' }}
                        >
                           <Row className='justify-content-md-center'>
                              <img
                                 style={{ height: '30vh', width: '30vh' }}
                                 src={MentorConnect}
                                 alt='LOGO'
                              />
                           </Row>
                           Please log in
                        </Card.Header>
                        <br />

                        <Form>
                           <Form.Group controlId='formBasicEmail'>
                              <Form.Label
                                 style={{
                                    fontSize: '17px',
                                    fontStyle: 'italic',
                                 }}
                              >
                                 Email address
                              </Form.Label>
                              <Form.Control
                                 name='email'
                                 type='text'
                                 className='email'
                                 placeholder='Enter email'
                                 onChange={(e) =>
                                    setForm({
                                       ...formValues,
                                       ['email']: e.target.value,
                                    })
                                 }
                              />
                           </Form.Group>
                           <br />
                           <Form.Group controlId='formBasicPassword'>
                              <Form.Label
                                 style={{
                                    fontSize: '17px',
                                    fontStyle: 'italic',
                                 }}
                              >
                                 Password
                              </Form.Label>
                              <Form.Control
                                 name='password'
                                 type='password'
                                 className='password'
                                 placeholder='Password'
                                 onChange={(e) =>
                                    setForm({
                                       ...formValues,
                                       ['password']: e.target.value,
                                    })
                                 }
                              />
                           </Form.Group>
                           <div className='button-placeholder'>
                              <Button variant='warning' onClick={onsubmit}>
                                 Log in
                              </Button>
                              <Button
                                 variant='warning'
                                 type='submit'
                                 onClick={() => history.push('/signup')}
                              >
                                 Sign up
                              </Button>
                           </div>
                        </Form>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </div>
      </div>
   );
}
