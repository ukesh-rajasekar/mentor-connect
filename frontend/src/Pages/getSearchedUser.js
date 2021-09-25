import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import rating from '../Components/rating.png';

import {
   Card,
   Modal,
   ListGroup,
   Button,
   InputGroup,
   Form,
   FormControl,
   Badge,
   OverlayTrigger,
   Tooltip,
} from 'react-bootstrap';
import axios from 'axios';
import Ratings from '../Components/Constants/ratings';
import { showToast } from '../Components/Constants/toastServices';

export default function GetSearchedUser(props) {
   const { userId } = props.userId;
   const history = useHistory();
   const [userDetails, setUserDetails] = useState([]);
   const [aquiredSkills, setAquiredSkills] = useState(['']);
   const [desiredSkills, setDesiredSkills] = useState(['']);
   const [projectList, setProjectList] = useState([0]);
   const [showProject, setShowProject] = useState(false);
   const [msgBox, setMsgBox] = useState(false);
   const [emailPayload, setEmailPayload] = useState({
      receiverId: '',
      emailBody: '',
      lookingFor: 1,
   });
   const [flipButton, setFlipButton] = useState('Connect');

   const sendEmail = () => {
      console.log(localStorage);
      console.log(emailPayload);
      setMsgBox(false);
      setFlipButton('Sending request >>>');
      axios
         .post(`/email/${localStorage.userId}`, emailPayload, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            if (res.data === 'Email sent successfully') {
               setMsgBox(false);
               setFlipButton('Request sent');
               showToast(`Request sent 📬`, 'success');
            }
            console.log(res.data);
         })
         .catch((err) => {
            console.log(err);
            showToast(`Request already sent`, 'danger');
            setFlipButton('Request already sent');
         });
   };

   const handleChange = (event) => {
      const value = event.target.value;
      console.log(value);
      if (value === '1') {
         setEmailPayload({
            ...emailPayload,
            ['lookingFor']: 1,
         });
      } else if (value === '2') {
         setEmailPayload({
            ...emailPayload,
            ['lookingFor']: 2,
         });
      }
      console.log(value);
   };

   const renderDetails = () => {
      console.log('$$$');
      axios
         .get('/user' + `/${props.userId}`, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            setUserDetails(res.data);
            setAquiredSkills(res.data.acquiredSkills.split(','));
            setDesiredSkills(res.data.learningSkills.split(','));
            if (res.data.projectDetailsList) {
               setShowProject(true);
               setProjectList(res.data.projectDetailsList);
               console.log(res.data.projectDetailsList);
               console.log(res.data);
            }
            setEmailPayload({
               ...emailPayload,
               ['receiverId']: res.data.id,
            });
            console.log(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleRouting = (projectId) => {
      history.push(`/search_project/${projectId}`);
   };

   const tooltipRating = () => {
      return <Tooltip>Give your ratings here</Tooltip>;
   };

   useEffect(() => {
      renderDetails();
   }, []);

   return (
      <Modal
         show={props.show}
         onHide={props.onHide}
         size='lg'
         aria-labelledby='contained-modal-title-vcenter'
         centered
      >
         <Card bg='dark'>
            <Card.Body className='container'>
               <Card.Header id='user-details-header'>
                  <div>
                     <h3>
                        {userDetails.firstName} {userDetails.lastName}
                     </h3>
                     <Card.Text>
                        <p>{userDetails.bio}</p>
                     </Card.Text>
                  </div>
                  <div>
                     <Button variant='danger' onClick={props.onHide}>
                        X
                     </Button>
                  </div>
               </Card.Header>

               <ListGroup.Item>
                  <h3>
                     {userDetails.rating
                        ? `Current rating - ${userDetails.rating}`
                        : ' No ratings yet'}
                  </h3>
                  <OverlayTrigger
                     overlay={tooltipRating()}
                     trigger='hover'
                     placement='right'
                  >
                     <div
                        style={{
                           display: 'flex',
                           flexDirection: 'row',
                           width: '150px',
                        }}
                     >
                        {' '}
                        <img
                           src={rating}
                           width='30'
                           height='30'
                           className='d-inline-block align-top'
                           alt='React Bootstrap logo'
                        />
                        <h3 onClick={renderDetails}>
                           <Ratings userId={props.userId} />
                        </h3>
                     </div>
                  </OverlayTrigger>
               </ListGroup.Item>
               <ListGroup.Item>
                  Skilled at
                  {aquiredSkills
                     .filter((element) => element !== '')
                     .map((element) => {
                        return (
                           <Badge
                              variant='success'
                              style={{
                                 margin: '0.25rem',
                                 pointerEvents: 'none',
                              }}
                           >
                              {element}{' '}
                           </Badge>
                        );
                     })}
                  <br />
                  Love to learn
                  {desiredSkills
                     .filter((element) => element !== '')
                     .map((element) => {
                        return (
                           <Badge
                              variant='warning'
                              style={{
                                 margin: '0.25rem',
                                 pointerEvents: 'none',
                              }}
                           >
                              {element}{' '}
                           </Badge>
                        );
                     })}
               </ListGroup.Item>
               {showProject && (
                  <ListGroup.Item>
                     <h3>Projects</h3>
                     {projectList
                        .filter((element) => element !== '')
                        .map((element) => {
                           return (
                              <Button
                                 variant='primary'
                                 style={{
                                    margin: '0.25rem',
                                 }}
                                 onClick={() => handleRouting(element.id)}
                              >
                                 {element.title}{' '}
                              </Button>
                           );
                        })}
                  </ListGroup.Item>
               )}
               <ListGroup variant='flush'>
                  <ListGroup.Item className=' text-center'>
                     {!msgBox && (
                        <Button
                           variant='warning'
                           onClick={() => {
                              setMsgBox(true);
                           }}
                        >
                           {flipButton}
                        </Button>
                     )}

                     {msgBox && (
                        <div>
                           <InputGroup.Text id='basic-addon3'>
                              Message
                           </InputGroup.Text>
                           <FormControl
                              as='textarea'
                              rows={3}
                              id='email-body'
                              aria-describedby='basic-addon3'
                              onChange={(e) =>
                                 setEmailPayload({
                                    ...emailPayload,
                                    ['emailBody']: e.target.value,
                                 })
                              }
                           />
                           <br />
                           <form>
                              <div>
                                 <InputGroup.Text id='basic-addon3'>
                                    Seeking for
                                 </InputGroup.Text>
                                 <ListGroup.Item>
                                    <Form.Check
                                       inline
                                       label='Mentor'
                                       name='userType'
                                       type='radio'
                                       value='1'
                                       onChange={handleChange}
                                    />
                                    <Form.Check
                                       inline
                                       label='Mentee'
                                       name='userType'
                                       type='radio'
                                       value='2'
                                       onChange={handleChange}
                                    />
                                 </ListGroup.Item>
                              </div>
                           </form>
                           <br />
                           <Button
                              variant='warning'
                              onClick={() => sendEmail()}
                           >
                              Send connection request
                           </Button>
                           {'    '}
                           <Button
                              variant='danger'
                              onClick={() => setMsgBox(false)}
                           >
                              Close
                           </Button>
                        </div>
                     )}
                  </ListGroup.Item>
               </ListGroup>
            </Card.Body>
         </Card>
      </Modal>
   );
}
