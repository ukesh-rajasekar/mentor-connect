import React from 'react';
import project from '../Components/bb.jpeg';
import { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax';
import { useHistory } from 'react-router';
import {
   Card,
   Row,
   Container,
   Col,
   ListGroup,
   FormControl,
   InputGroup,
   Form,
   Image,
   Button,
   CardDeck,
} from 'react-bootstrap';
import axios from 'axios';
import LookingFor from '../Components/Constants/lookingFor';
import SkillsBadge from '../Components/Constants/skillsBadge';
import cm from '../Components/checkmark.png';

export default function Home(props) {
   // const { keywords } = props;
   const [keywords, setKeywords] = useState('');
   const [skill, setSkill] = useState('');
   const [userType, setUserType] = useState('');

   const history = useHistory();
   const [projectList, setProjectList] = useState(0);
   const [changeSkills, setChangeSkills] = useState(true);

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
      console.log(keywords, skill, userType);
      axios
         .get(
            '/searchProjects' +
               `?id=${localStorage.userId}&skills=${skill}&keywords=${keywords}&participants=${userType}`
         )
         .then((res) => {
            console.log(res.data);
            if (res.data !== 'NO RECORDS FOUND') {
               setProjectList(res.data);
            } else {
               setProjectList(0);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [keywords, skill, userType]);

   const handleRouting = (projectId) => {
      history.push(`/search_project/${projectId}`);
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
                  DISCOVER PROJECTS
               </div>
            </div>
         </Parallax>
         <Card style={{ width: '100%', backgroundColor: '#242526' }}>
            <Card.Body
               bg='dark'
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
                              placeholder='Search by Name of project'
                              onChange={(e) => setKeywords(e.target.value)}
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
                  <div>
                     <ListGroup.Item style={{ backgroundColor: '#3A3B3C' }}>
                        <Form>
                           <div>
                              {' '}
                              <b style={{ color: 'white' }}>I want to be:</b>
                              <br />
                              <Form.Check
                                 inline
                                 style={{ color: 'white' }}
                                 label='Mentor'
                                 name='userType'
                                 type='radio'
                                 value='1'
                                 onChange={handleChange}
                              />
                              <Form.Check
                                 inline
                                 style={{ color: 'white' }}
                                 label='Mentee'
                                 name='userType'
                                 type='radio'
                                 value='2'
                                 onChange={handleChange}
                              />
                           </div>
                        </Form>
                     </ListGroup.Item>
                  </div>
               </Card.Header>
               <Card.Body className=''>
                  <Row id='row'>
                     {projectList ? (
                        projectList
                           .filter((contact) => {
                              return (
                                 contact.title
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(
                                       keywords.toString().toLowerCase()
                                    ) > -1
                              );
                           })
                           .map((items) => {
                              console.log(items);
                              return (
                                 <Col
                                    xs={12}
                                    md={6}
                                    lg={5}
                                    id='col-md-4-project'
                                    style={{ minWidth: '200px' }}
                                 >
                                    <Card
                                       id='user-search'
                                       border='dark'
                                       key={items.id}
                                       onClick={() => handleRouting(items.id)}
                                    >
                                       <Card.Header id='project-search-header'>
                                          <h4>
                                             {items.recommended ? (
                                                <div class='img__wrap'>
                                                   <img
                                                      style={{
                                                         maxWidth: '30px',
                                                         maxHeight: '20px',
                                                      }}
                                                      class='img__img'
                                                      src={cm}
                                                   />
                                                   <p class='img__description'>
                                                      {`  Matches your
                                                               skills`}
                                                   </p>
                                                </div>
                                             ) : (
                                                ''
                                             )}{' '}
                                             {items.title}
                                          </h4>
                                       </Card.Header>
                                       <ListGroup.Item>
                                          <h5>Looking for</h5>
                                          <Button
                                             variant='danger'
                                             style={{
                                                margin: '0.25rem',
                                                pointerEvents: 'none',
                                             }}
                                          >
                                             <LookingFor
                                                participants={
                                                   items.participants
                                                }
                                             />
                                          </Button>
                                       </ListGroup.Item>
                                       <ListGroup.Item>
                                          <h5>Skills required </h5>

                                          <SkillsBadge
                                             skills={items.skills}
                                             type='success'
                                          />
                                       </ListGroup.Item>
                                       <ListGroup.Item>
                                          {items.createdDate}
                                       </ListGroup.Item>
                                    </Card>
                                 </Col>
                              );
                           })
                     ) : (
                        <h3>no results</h3>
                     )}
                     {/* </ListGroup> */}
                  </Row>
               </Card.Body>
            </Card.Body>
         </Card>
      </div>
   );
}
