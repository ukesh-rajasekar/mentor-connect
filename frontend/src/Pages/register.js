import React, { useState } from 'react';
import { Form, Button, Card, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';
import bg from '../Components/register.jpg';
import { showToast } from '../Components/Constants/toastServices';

export default function Register() {
   const history = useHistory();
   const [aquiredSkills, setAquiredSkills] = useState([]);
   const [desiredSkills, setDesiredSkills] = useState([]);
   const [formValues, setForm] = useState({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      acquiredSkills: '',
      learningSkills: '',
      phoneNumber: 0,
      bio: '',
   });
   formValues['acquiredSkills'] = aquiredSkills.toString();

   formValues['learningSkills'] = desiredSkills.toString();

   const onsubmit = () => {
      console.log(formValues);

      if (!formValues.firstName || !formValues.lastName) {
         showToast('First name or Last name cannot be empty', 'danger');

         return null;
      } else if (!formValues.email) {
         showToast('Email id cannot be empty', 'danger');
         return null;
      } else if (!formValues.bio) {
         showToast('Bio cannot be empty', 'danger');
         return null;
      } else if (!formValues.bio) {
         showToast('Bio cannot be empty', 'danger');
         return null;
      } else if (!formValues.acquiredSkills || !formValues.learningSkills) {
         showToast(
            'Skills you possess or Skills you want to learn cannot be empty',
            'danger'
         );
         return null;
      } else if (!formValues.phoneNumber) {
         showToast('Mobile cannot be empty', 'danger');
         return null;
      } else if (!formValues.password) {
         showToast('Password cannot be empty', 'danger');
         return null;
      }
      console.log(formValues);
      axios
         .post('/register', formValues)
         .then((res) => {
            showToast(`Successfully registered 👏​, please login`, 'success');
            history.push('/');
         })
         .catch((err) => {
            console.log(err);
            showToast(`Ohh something went wrong, please try again`, 'error');
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
            style={{
               width: '40vw',
               margin: 'auto',
               marginTop: '5vh',
               textAlign: 'left',
            }}
         >
            <Card
               className='translucent'
               style={{ backgroundColor: '#3A3B3C' }}
               id='login-card'
            >
               <Card.Body>
                  <Card.Header
                     style={{ fontSize: '25px', fontStyle: 'italic' }}
                  >
                     Join a community of learners and teachers
                  </Card.Header>
                  <br />
                  <Form>
                     <Form.Group controlId='formName'>
                        <Form.Label>*First name</Form.Label>
                        <Form.Control
                           type='text'
                           placeholder='Enter Your Name'
                           onChange={(e) =>
                              setForm({
                                 ...formValues,
                                 ['firstName']: e.target.value,
                              })
                           }
                        />
                     </Form.Group>
                     <Form.Group controlId='formName'>
                        <Form.Label>*Last name</Form.Label>
                        <Form.Control
                           type='text'
                           placeholder='Enter Your Name'
                           onChange={(e) =>
                              setForm({
                                 ...formValues,
                                 ['lastName']: e.target.value,
                              })
                           }
                        />
                     </Form.Group>
                     <Form.Group controlId='formEmail'>
                        <Form.Label>*Email address</Form.Label>
                        <Form.Control
                           type='email'
                           placeholder='Enter email'
                           onChange={(e) =>
                              setForm({
                                 ...formValues,
                                 ['email']: e.target.value,
                              })
                           }
                        />
                     </Form.Group>
                     <Form.Group controlId='formBio'>
                        <Form.Label>*Add Your Bio</Form.Label>
                        <Form.Control
                           as='textarea'
                           rows={3}
                           placeholder='Share a bit about Yourself'
                           onChange={(e) =>
                              setForm({
                                 ...formValues,
                                 ['bio']: e.target.value,
                              })
                           }
                        />
                     </Form.Group>
                     <Form>
                        <Form.Group controlId='formAquiredSkills'>
                           <Form.Label>*Skills you Possess</Form.Label>
                           <Form.Control
                              inline
                              type='text'
                              placeholder='Enter skills you wan to mentor for'
                           />
                           <Button
                              onClick={() => {
                                 setAquiredSkills([
                                    ...aquiredSkills,
                                    document.getElementById('formAquiredSkills')
                                       .value,
                                 ]);
                              }}
                              variant='success'
                              type='reset'
                           >
                              Add Skill
                           </Button>
                           <br />
                           <br />
                           {aquiredSkills.map((element) => {
                              return (
                                 <Button
                                    onClick={(event) => {
                                       console.log(event.target.innerText);
                                       let newArray = [...aquiredSkills].filter(
                                          (item) =>
                                             item + ` x` !==
                                             event.target.innerText
                                       );
                                       setAquiredSkills(newArray);
                                    }}
                                 >
                                    {element} x
                                 </Button>
                              );
                           })}
                        </Form.Group>
                     </Form>
                     <Form>
                        <Form.Group controlId='formDesiredSkills'>
                           <Form.Label>*Skills you want to learn</Form.Label>
                           <Form.Control
                              inline
                              type='text'
                              placeholder='Enter skills you want to learn'
                           />
                           <Button
                              onClick={() => {
                                 setDesiredSkills([
                                    ...desiredSkills,
                                    document.getElementById('formDesiredSkills')
                                       .value,
                                 ]);
                              }}
                              variant='warning'
                              type='reset'
                           >
                              Add Skill
                           </Button>
                           <br />
                           <br />
                           {desiredSkills.map((element) => {
                              return (
                                 <Button
                                    variant='success'
                                    onClick={(event) => {
                                       let newArray = [...desiredSkills].filter(
                                          (item) =>
                                             item + ` x` !==
                                             event.target.innerText
                                       );
                                       setDesiredSkills(newArray);
                                    }}
                                 >
                                    {element} x
                                 </Button>
                              );
                           })}
                        </Form.Group>
                     </Form>

                     <Form.Group controlId='formPhone'>
                        <Form.Label>*Mobile</Form.Label>
                        <Form.Control
                           type='number'
                           placeholder='484603555'
                           onChange={(e) =>
                              setForm({
                                 ...formValues,
                                 ['phoneNumber']: parseInt(e.target.value),
                              })
                           }
                        />
                     </Form.Group>

                     <Form.Group controlId='formPassword'>
                        <Form.Label>*Password</Form.Label>
                        <Form.Control
                           type='password'
                           placeholder='Password'
                           onChange={(e) =>
                              setForm({
                                 ...formValues,
                                 ['password']: e.target.value,
                              })
                           }
                        />
                     </Form.Group>
                     <Form.Group controlId='formConfirmPassword'>
                        <Form.Label>*Confirm Password</Form.Label>
                        <Form.Control
                           type='password'
                           placeholder='Confirm Password'
                        />
                     </Form.Group>
                     <Button variant='primary' onClick={onsubmit}>
                        Submit
                     </Button>
                  </Form>
               </Card.Body>
            </Card>
         </div>
      </div>
   );
}
