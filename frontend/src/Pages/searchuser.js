import React from 'react';
import project from '../Components/projects.jpg';
import { Parallax } from 'react-parallax';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import {
   Card,
   Row,
   Col,
   ListGroup,
   FormControl,
   InputGroup,
   Form,
} from 'react-bootstrap';
import axios from 'axios';
import { urls } from '../Components/Constants/url';
import RatingConstant from '../Components/Constants/ratingConstant';
import SkillsBadge from '../Components/Constants/skillsBadge';
import GetSearchedUser from './getSearchedUser';

export default function Searchuser(props) {
   // const { user } = props;
   const [user, setUser] = useState('');
   const [selectedUser, setSelectedUser] = useState('');
   const [skill, setSkill] = useState('');
   const [userType, setUserType] = useState(0);
   const [modalShow, setModalShow] = React.useState(false);

   const history = useHistory();
   const [userList, setuserList] = useState(0);
   const [changeSkills, setChangeSkills] = useState(true);
   const [rating, setRating] = useState(0);

   const handleChange = (event) => {
      const value = event.target.value;
      console.log(value);
      if (value === '1') {
         setChangeSkills(true);

         setUserType(1);
      } else if (value === '2') {
         setChangeSkills(false);
         setUserType(2);
      }
      console.log(value);
   };

   useEffect(() => {
      axios
         .get(
            `searchUser/${localStorage.userId}/?name=${user}&skill=${skill}&userType=${userType}`,
            {
               headers: {
                  Accept: 'application/json',
                  Authorization: localStorage.token,
               },
            }
         )
         .then((res) => {
            if (res.data !== 'NO RECORDS FOUND') {
               setuserList(res.data);
            } else {
               setuserList(0);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [user, skill, userType]);

   const handleRouting = (userId) => {
      setModalShow(true);
      setSelectedUser(userId);
      console.log(userId);

      // history.push(`/search_user/${userId}`);
   };

   return (
      <div>
         <Parallax
            bgImage={project}
            bgImageAlt='the cat'
            //  strength={200}
            blur={{ min: -100, max: 100 }}
            style={{ height: '40vh' }}
         >
            <div style={{ width: '100%', height: '40vh' }}>
               <div
                  style={{
                     width: '100%',
                     height: '100%',
                     lineHeight: '1000%',
                     textAlign: 'center',
                     WebkitTextStrokeWidth: '2px',
                     WebkitTextStrokeColor: 'black',
                     color: '#ffc107',
                     fontWeight: '500',
                     fontSize: '5em',
                  }}
               >
                  GROW YOUR NETWORK
               </div>
            </div>
         </Parallax>
         <Card style={{ width: '100%', backgroundColor: '#242526' }}>
            <Card.Body
               style={{
                  maxWidth: '80vw',
                  margin: 'auto',
                  backgroundColor: '#3A3B3C',
               }}
            >
               <Card.Header>
                  <Row>
                     <Col>
                        <h5 style={{ color: 'white' }}>Search by Name: </h5>
                        <InputGroup className='mb-3'>
                           <FormControl
                              id='search-skills'
                              aria-describedby='basic-addon3'
                              placeholder='Enter Name'
                              onChange={(e) => setUser(e.target.value)}
                           />
                        </InputGroup>
                     </Col>
                     <Col>
                        <h5 style={{ color: 'white' }}>Search by Skills: </h5>
                        <InputGroup className='mb-3'>
                           <FormControl
                              id='search-skills'
                              aria-describedby='basic-addon3'
                              placeholder='Java, Python...'
                              onChange={(e) => setSkill(e.target.value)}
                           />
                        </InputGroup>
                     </Col>
                  </Row>
                  <ListGroup.Item style={{ backgroundColor: '#3A3B3C' }}>
                     <form>
                        <div>
                           {' '}
                           <b style={{ color: 'white' }}>Looking For:</b>
                           <br />
                           <Form.Check
                              style={{ color: 'white' }}
                              inline
                              label='Mentor'
                              name='userType'
                              type='radio'
                              value='1'
                              onChange={handleChange}
                           />
                           <Form.Check
                              style={{ color: 'white' }}
                              inline
                              label='Mentee'
                              name='userType'
                              type='radio'
                              value='2'
                              onChange={handleChange}
                           />
                        </div>
                     </form>
                  </ListGroup.Item>
               </Card.Header>
               <Row id='row' style={{ margin: '10px' }}>
                  {userList ? (
                     userList
                        .filter((contact) => {
                           return (
                              contact.name
                                 .toString()
                                 .toLowerCase()
                                 .indexOf(user.toString().toLowerCase()) > -1
                           );
                        })
                        .map((items) => {
                           return (
                              <Col
                                 xs={12}
                                 md={6}
                                 lg={4}
                                 id='col-md-4-user'
                                 style={{ minWidth: '200px' }}
                              >
                                 <Card
                                    id='user-search'
                                    border='dark'
                                    key={items.id}
                                    onClick={() => handleRouting(items.id)}
                                 >
                                    <Card.Body>
                                       <Card.Title>
                                          {' '}
                                          <h4>{items.name}</h4>{' '}
                                       </Card.Title>

                                       <Card.Title>
                                          {items.rating ? (
                                             <RatingConstant
                                                rating={items.rating}
                                             />
                                          ) : (
                                             <h6>
                                                <i>No ratings yet</i>
                                             </h6>
                                          )}
                                       </Card.Title>

                                       {changeSkills && (
                                          <Card.Text>
                                             Skills
                                             <SkillsBadge
                                                skills={items.acquiredSkills}
                                                type='success'
                                             />
                                          </Card.Text>
                                       )}
                                       {!changeSkills && (
                                          <Card.Text>
                                             Love to learn
                                             <SkillsBadge
                                                skills={items.learningSkills}
                                                type='warning'
                                             />
                                          </Card.Text>
                                       )}
                                    </Card.Body>
                                 </Card>
                                 <br />
                              </Col>
                           );
                        })
                  ) : (
                     <h3>no results</h3>
                  )}
               </Row>
               {modalShow && (
                  <GetSearchedUser
                     show={modalShow}
                     onHide={() => setModalShow(false)}
                     userId={selectedUser}
                  />
               )}
            </Card.Body>
         </Card>
      </div>
   );
}
