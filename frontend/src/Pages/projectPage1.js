import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import ReactPlayer from 'react-player';
import GetComments from '../Components/Constants/getComments';
import {
   Card,
   Col,
   Row,
   Container,
   Form,
   FormControl,
   InputGroup,
   Badge,
   Button,
   ListGroup,
} from 'react-bootstrap';
import { useParams } from 'react-router';
import axios from 'axios';
import LookingFor from '../Components/Constants/lookingFor';
import { showToast } from '../Components/Constants/toastServices';
import GetSearchedUser from './getSearchedUser';
import comment from '../Components/chat.png';

export default function ProjectPage() {
   const { projectId } = useParams();
   if (localStorage.userId) {
      let user = localStorage.getItem('userId');
      console.log(`userId ${user}`);
   }
   const history = useHistory();
   const [modalShow, setModalShow] = React.useState(false);
   const [selectedUser, setSelectedUser] = useState('');
   const userId = localStorage.userId;
   const [commentData, setCommentData] = useState({
      userId: userId,
      comment: '',
   });

   const [msgBox, setMsgBox] = useState(false);
   const [projects, setProjects] = useState([]);
   const [emailPayload, setEmailPayload] = useState({
      projectId: parseInt(projectId),
      emailBody: '',
      lookingFor: 1,
   });

   const [flipButton, setFlipButton] = useState('Apply');
   const [aquiredSkills, setAquiredSkills] = useState(['']);

   const sendEmail = () => {
      console.log(emailPayload);
      setMsgBox(false);
      setFlipButton('Sending application >>>');
      axios
         .post(`/email/project/${localStorage.userId}`, emailPayload, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            if (res.data === 'Email sent successfully') {
               setMsgBox(false);
               setFlipButton('Application sent');
               showToast(`Application sent 📬`, 'success');
            }
            console.log(res.data);
         })
         .catch((err) => {
            console.log(err);
            showToast(`Application already sent`, 'danger');
            setFlipButton('Application already sent');
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

   const handleRouting = (userId) => {
      setModalShow(true);
      setSelectedUser(userId);
      console.log(userId);
   };

   const postComment = () => {
      axios
         .post(`/projectcomment/${projectId}`, commentData, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            if (res.data) {
               showToast(`Comment posted`, 'success');
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      console.log(localStorage.token);
      axios
         .get('/project' + `/${projectId}`, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            setProjects(res.data);
            console.log(res.data);
            setAquiredSkills(res.data.skills.split(','));
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      <Card
         // bg='dark'
         style={{
            minHeight: '100vh',
            width: '100%',
            alignItems: 'center',
            backgroundColor: '#242526',
         }}
      >
         <Card.Body
            className='container'
            style={{
               maxWidth: '80vw',
               margin: 'auto',
               backgroundColor: '#3A3B3C',
            }}
         >
            <Card.Header>
               <h2 style={{ color: 'white' }}>
                  <u>{projects.title}</u>
               </h2>
               <div
                  style={{
                     display: 'flex',
                     flexDirection: 'row',
                     alignItems: 'center',
                  }}
               >
                  <Button
                     variant='link'
                     onClick={() => handleRouting(projects.user_id)}
                  >
                     <span style={{ color: 'white' }}>Posted by: </span>
                     {projects.user_name}
                  </Button>
               </div>
               <br />
               <small className='text-muted'>
                  Posted On: {projects.created_date}
               </small>
            </Card.Header>
            <ListGroup.Item>
               <h4>About the project:</h4>
               <Card.Text>{projects.description}</Card.Text>
            </ListGroup.Item>
            {projects.url && (
               <ListGroup.Item
                  style={{ display: 'flex', justifyContent: 'center' }}
               >
                  <ReactPlayer url={projects.url} controls={true} />
               </ListGroup.Item>
            )}
            <ListGroup.Item>
               <Row>
                  <Col>
                     <Card.Text>
                        <h4>Skills Required:</h4>
                        {aquiredSkills
                           .filter((element) => element !== '')
                           .map((element) => {
                              return (
                                 <Button
                                    variant='success'
                                    style={{
                                       margin: '0.25rem',
                                       pointerEvents: 'none',
                                    }}
                                 >
                                    {element}{' '}
                                 </Button>
                              );
                           })}
                     </Card.Text>
                  </Col>
                  <Col>
                     <Card.Text>
                        <h4>Looking for:</h4>

                        <Button
                           style={{
                              margin: '0.1rem',
                              pointerEvents: 'none',
                           }}
                           variant='danger'
                        >
                           <LookingFor participants={projects.participants} />{' '}
                        </Button>
                     </Card.Text>
                  </Col>
               </Row>
            </ListGroup.Item>
            <ListGroup variant='flush'>
               <ListGroup.Item>
                  <Card.Text>
                     {projects.projectLinkedUsers && <h4>Participants:</h4>}

                     {projects.projectLinkedUsers &&
                        projects.projectLinkedUsers.map((user) => {
                           return (
                              <Button
                                 variant='link'
                                 onClick={() => handleRouting(user.id)}
                              >
                                 {user.name}
                              </Button>
                           );
                        })}
                  </Card.Text>
               </ListGroup.Item>
            </ListGroup>
            <ListGroup variant='flush'>
               <ListGroup.Item className=' text-center'>
                  {!msgBox && (
                     <div className='d-grid gap-2'>
                        {projects.user_id != localStorage.getItem('userId') ? (
                           <Button
                              variant='warning'
                              style={{ width: '100%' }}
                              size='lg'
                              onClick={() => {
                                 setMsgBox(true);
                              }}
                           >
                              {flipButton}
                           </Button>
                        ) : null}
                     </div>
                  )}

                  {msgBox && (
                     <div>
                        <InputGroup.Text id='basic-addon3'>
                           Tell us a little about yourself
                        </InputGroup.Text>{' '}
                        <FormControl
                           as='textarea'
                           rows={6}
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
                                 Tell us what are you applying for
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
                        <Button variant='warning' onClick={() => sendEmail()}>
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
            <GetComments projectId={projectId} />
            <ListGroup.Item
               style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
               }}
            >
               <form
                  style={{
                     display: 'flex',
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     flex: 1,
                  }}
               >
                  <img
                     src={comment}
                     width='30'
                     height='30'
                     className='d-inline-block align-top'
                     alt='React Bootstrap logo'
                  />
                  <FormControl
                     id='comment-body'
                     placeholder='   Add a comment...'
                     aria-describedby='basic-addon3'
                     onChange={(e) =>
                        setCommentData({
                           ...commentData,
                           ['comment']: e.target.value,
                        })
                     }
                     style={{
                        border: 'none',
                        outline: 'none',
                     }}
                  />
                  <Button variant='warning' type='reset' onClick={postComment}>
                     Post
                  </Button>
               </form>
            </ListGroup.Item>
         </Card.Body>
         {modalShow && (
            <GetSearchedUser
               show={modalShow}
               onHide={() => setModalShow(false)}
               userId={selectedUser}
            />
         )}
      </Card>
   );
}
