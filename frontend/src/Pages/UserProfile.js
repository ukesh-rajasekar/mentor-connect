import {
   Card,
   Button,
   Form,
   CardDeck,
   Nav,
   Badge,
   Row,
   Col,
   Spinner,
} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import MyProjectList from '../Components/MyProjectList';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import RatingConstant from '../Components/Constants/ratingConstant';
function UserProfile() {
   const [showDetails, setShowDetails] = useState(true);
   console.log(`/user/${localStorage.userId}`);
   console.log(localStorage.token);

   function UserDetails(props) {
      const [userDetailsLoading, setUserDetailsLoading] = useState(false);
      const [aquiredSkills, setAquiredSkills] = useState(['']);
      const [desiredSkills, setDesiredSkills] = useState(['']);
      const [userDetails, setUserDetails] = useState({
         firstName: '',
         lastName: '',
         email: '',
         phoneNumber: 0,
         rating: null,
         bio: '',
      });
      const [editFirstName, setEditFirstName] = useState(false);
      const [editLastName, setEditLastName] = useState(false);
      const [editEmail, setEditEmail] = useState(false);
      const [editPhoneNumber, setEditPhoneNumber] = useState(false);
      const [editBio, setEditBio] = useState(false);
      const [saveChanges, setSaveChanges] = useState(false);
      useEffect(() => {
         axios
            .get(`/user/${localStorage.userId}`, {
               headers: {
                  Authorization: localStorage.token,
               },
            })
            .then((response) => {
               console.log(response.data);
               setUserDetails({
                  firstName: response.data.firstName,
                  lastName: response.data.lastName,
                  email: response.data.email,
                  bio: response.data.bio,
                  phoneNumber: response.data.phoneNumber,
               });
               setAquiredSkills(response.data.acquiredSkills.split(','));
               setDesiredSkills(response.data.learningSkills.split(','));
               setUserDetailsLoading(false);
               setEditFirstName(false);
               setEditLastName(false);
               setEditEmail(false);
               setEditBio(false);
               setEditPhoneNumber(false);
               console.log(response.data);
            });
      }, [saveChanges]);

      function editProfile() {
         console.log({
            ...userDetails,
            acquiredSkills: aquiredSkills.join(),
            learningSkills: desiredSkills.join(),
         });
         axios
            .post(
               `/user/update/${localStorage.userId}`,
               {
                  ...userDetails,
                  acquiredSkills: aquiredSkills.join(),
                  learningSkills: desiredSkills.join(),
               },
               {
                  headers: {
                     Authorization: localStorage.token,
                  },
               }
            )
            .then((response) => {
               console.log(response.data);
               setUserDetailsLoading(false);
               setSaveChanges(!saveChanges);
            })
            .catch((error) => {
               console.log(error);
            });
      }

      if (userDetailsLoading) {
         return (
            <div style={{ margin: 'auto auto' }}>
               <Spinner animation='border' variant='primary' />
            </div>
         );
      } else {
         return (
            <div>
               <Card style={{ marginBottom: '1rem' }}>
                  <Card.Body>
                     <Form>
                        <Row>
                           <Col>
                              <h4>{userDetails.email}</h4>
                              <RatingConstant rating={userDetails.rating} />
                           </Col>
                        </Row>
                        <Row>
                           <Col>
                              <Form.Group>
                                 <Form.Label>
                                    First Name: <b>{userDetails.firstName}</b>
                                 </Form.Label>
                                 {editFirstName ? (
                                    <Button
                                       variant='link'
                                       style={{ color: 'red' }}
                                       onClick={() => setEditFirstName(false)}
                                    >
                                       x
                                    </Button>
                                 ) : (
                                    <Button
                                       variant='link'
                                       onClick={() => setEditFirstName(true)}
                                    >
                                       edit->
                                    </Button>
                                 )}
                                 {editFirstName ? (
                                    <Form.Control
                                       onChange={(e) =>
                                          setUserDetails({
                                             userDetails,
                                             firstName: e.target.value,
                                          })
                                       }
                                    />
                                 ) : null}
                              </Form.Group>
                           </Col>
                           <Col>
                              <Form.Group>
                                 <Form.Label>
                                    Last Name: <b>{userDetails.lastName}</b>
                                 </Form.Label>
                                 {editLastName ? (
                                    <Button
                                       variant='link'
                                       style={{ color: 'red' }}
                                       onClick={() => setEditLastName(false)}
                                    >
                                       x
                                    </Button>
                                 ) : (
                                    <Button
                                       variant='link'
                                       onClick={() => setEditLastName(true)}
                                    >
                                       edit->
                                    </Button>
                                 )}
                                 {editLastName ? (
                                    <Form.Control
                                       onChange={(e) =>
                                          setUserDetails({
                                             ...userDetails,
                                             lastName: e.target.value,
                                          })
                                       }
                                    />
                                 ) : null}
                              </Form.Group>
                           </Col>
                        </Row>
                        <Row>
                           <Col>
                              <Form.Group>
                                 <Form.Label>
                                    Phone Number:{' '}
                                    <b>{userDetails.phoneNumber}</b>
                                 </Form.Label>{' '}
                                 {editPhoneNumber ? (
                                    <Button
                                       variant='link'
                                       style={{ color: 'red' }}
                                       onClick={() => setEditPhoneNumber(false)}
                                    >
                                       x
                                    </Button>
                                 ) : (
                                    <Button
                                       variant='link'
                                       onClick={() => setEditPhoneNumber(true)}
                                    >
                                       edit->
                                    </Button>
                                 )}
                                 {editPhoneNumber ? (
                                    <Form.Control
                                       onChange={(e) =>
                                          setUserDetails({
                                             ...userDetails,
                                             phoneNumber: e.target.value,
                                          })
                                       }
                                    />
                                 ) : null}
                              </Form.Group>
                           </Col>
                        </Row>
                        <Row>
                           <Col>
                              <Form.Group controlId='formBio'>
                                 <Form.Label>
                                    Your Bio: <br />
                                    <p>
                                       <b>{userDetails.bio}</b>
                                    </p>
                                 </Form.Label>
                                 {editBio ? (
                                    <Button
                                       variant='link'
                                       style={{ color: 'red' }}
                                       onClick={() => setEditBio(false)}
                                    >
                                       x
                                    </Button>
                                 ) : (
                                    <Button
                                       variant='link'
                                       onClick={() => setEditBio(true)}
                                    >
                                       edit->
                                    </Button>
                                 )}
                                 {editBio ? (
                                    <Form.Control
                                       as='textarea'
                                       onChange={(e) =>
                                          setUserDetails({
                                             ...userDetails,
                                             bio: e.target.value,
                                          })
                                       }
                                    />
                                 ) : null}
                              </Form.Group>
                           </Col>
                        </Row>
                     </Form>
                  </Card.Body>
               </Card>
               <CardDeck>
                  <Card>
                     <Card.Header>
                        <Card.Title>MY SKILLS </Card.Title>
                        {aquiredSkills
                           .filter((element) => element !== '')
                           .map((element) => {
                              return (
                                 <Button
                                    variant='success'
                                    style={{ margin: '0.25rem' }}
                                 >
                                    {element}{' '}
                                    <Badge
                                       onClick={(event) => {
                                          let newArray = [
                                             ...aquiredSkills,
                                          ].filter((item) => item !== element);
                                          setAquiredSkills(newArray);
                                       }}
                                       variant='dark'
                                    >
                                       x
                                    </Badge>
                                 </Button>
                              );
                           })}
                     </Card.Header>
                     <Card.Body>
                        <Form>
                           <Form.Group controlId='formAquiredSkills'>
                              <Form.Control
                                 inline
                                 type='text'
                                 placeholder='Enter skills you wan to mentor for'
                              />
                           </Form.Group>
                           <Button
                              onClick={() => {
                                 if (
                                    document.getElementById('formAquiredSkills')
                                       .value !== ''
                                 ) {
                                    setAquiredSkills([
                                       ...aquiredSkills,
                                       document.getElementById(
                                          'formAquiredSkills'
                                       ).value,
                                    ]);
                                 }
                              }}
                              variant='secondary'
                           >
                              Add Skill
                           </Button>
                        </Form>
                     </Card.Body>
                  </Card>
                  <Card>
                     <Card.Header>
                        <Card.Title>LOVE TO LEARN </Card.Title>
                        {desiredSkills
                           .filter((element) => element !== '')
                           .map((element) => {
                              return (
                                 <Button
                                    variant='warning'
                                    style={{ margin: '0.25rem' }}
                                 >
                                    {element}{' '}
                                    <Badge
                                       onClick={(event) => {
                                          console.log(event.target.innerText);
                                          let newArray = [
                                             ...desiredSkills,
                                          ].filter((item) => item !== element);
                                          setDesiredSkills(newArray);
                                       }}
                                       variant='dark'
                                    >
                                       x
                                    </Badge>
                                 </Button>
                              );
                           })}
                     </Card.Header>
                     <Card.Body>
                        <Form>
                           <Form.Group controlId='formDesiredSkills'>
                              <Form.Control
                                 inline
                                 type='text'
                                 placeholder='Enter skills you want to learn'
                              />
                           </Form.Group>
                           <Button
                              onClick={() => {
                                 if (
                                    document.getElementById('formDesiredSkills')
                                       .value !== ''
                                 ) {
                                    setDesiredSkills([
                                       ...desiredSkills,
                                       document.getElementById(
                                          'formDesiredSkills'
                                       ).value,
                                    ]);
                                 }
                              }}
                              variant='secondary'
                           >
                              Add Skill
                           </Button>
                        </Form>
                     </Card.Body>
                  </Card>
               </CardDeck>
               <Card.Body
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItem: 'center',
                  }}
               >
                  <Button onClick={editProfile}>Save Changes</Button>
               </Card.Body>
            </div>
         );
      }
   }
   return (
      <div>
         {/* <MainJumbotron /> */}
         <Card
            style={{
               width: '100%',
               backgroundColor: '#242526',
               minHeight: '100vh',
            }}
         >
            <Card.Header
               style={{
                  width: '80vw',
                  margin: 'auto',
                  backgroundColor: '#3A3B3C',
               }}
            >
               <Nav>
                  <Nav.Item>
                     <Nav.Link
                        id='nav-link'
                        onClick={() => setShowDetails(true)}
                     >
                        {showDetails ? (
                           <h3 style={{ color: '#ffc107' }}>My Details</h3>
                        ) : (
                           <h3>My Details</h3>
                        )}
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                     <Nav.Link
                        id='nav-link'
                        onClick={() => setShowDetails(false)}
                     >
                        {showDetails ? (
                           <h3>My Projects</h3>
                        ) : (
                           <h3 style={{ color: '#ffc107' }}>My Projects</h3>
                        )}
                     </Nav.Link>
                  </Nav.Item>
               </Nav>
            </Card.Header>
            <Card.Body
               style={{
                  width: '80vw',
                  margin: 'auto',
                  backgroundColor: '#3A3B3C',
               }}
            >
               {showDetails ? <UserDetails /> : <MyProjectList />}
            </Card.Body>
         </Card>
      </div>
   );
}

export default UserProfile;
