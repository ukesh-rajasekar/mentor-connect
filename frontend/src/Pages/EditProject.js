import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Badge } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { showToast } from '../Components/Constants/toastServices';

export default function EditProject() {
   let { id } = useParams();
   const [skillsRequired, setSkillsRequired] = useState([]);
   const [projectDetails, setProjectDetails] = useState({
      title: '',
      description: '',
      skills: '',
      project_status: 1,
      user_id: Number(localStorage.userId),
      participants: 0,
      url: '',
   });
   let history = useHistory();
   const [buttonName, setButtonName] = useState('Completed');

   useEffect(() => {
      axios
         .get(`/myProjects?id=${localStorage.userId}`, {
            headers: {
               Authorization: localStorage.token,
            },
         })
         .then((response) => {
            console.log(id);
            let project = response.data.filter(
               (project) => project.id == id
            )[0];
            console.log(project);
            setProjectDetails(project);
            setSkillsRequired(project.skills.split(','));
         });
   }, []);

   async function handleSubmit() {
      if (!(Array.isArray(skillsRequired) && skillsRequired.length)) {
         showToast(`Skills cannot be empty`, 'danger');

         return null;
      }
      console.log({ ...projectDetails, skills: skillsRequired.join() });
      axios
         .post(
            `/project/update/${id}`,
            {
               title: projectDetails.title,
               description: projectDetails.description,
               url: projectDetails.url,
               project_status: projectDetails.project_status,
               participants: projectDetails.participants,
               skills: skillsRequired.join(),
            },
            {
               headers: {
                  Authorization: localStorage.token,
               },
            }
         )
         .then((response) => {
            showToast(`Project Successfully Updated`, 'success');

            history.push('/user_profile');
         })
         .catch((error) => {
            console.log(error);
         });
   }

   const closeProject = () => {
      console.log(id);
      axios
         .post(`/closeproject/${id}`, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((response) => {
            showToast('Kudos 🙌 to your team', 'success');
            setButtonName('Closed');
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      // <Alert >
      <Card
         style={{
            width: '100%',
            backgroundColor: '#242526',
            minHeight: '100vh',
         }}
         className='translucent'
      >
         <Card.Body
            style={{
               minHeight: '100vh',
               width: '80vw',
               margin: 'auto',
               backgroundColor: '#3A3B3C',
            }}
         >
            <h1 style={{ color: '#ffc107', textAlign: 'center' }}>
               Update Project
            </h1>
            <Form>
               <Form.Group controlId='formTitle'>
                  <Form.Label style={{ color: 'white' }}>
                     Project Title: <b>{projectDetails.title}</b>
                  </Form.Label>
                  <Form.Control
                     type='text'
                     placeholder='New Project Title'
                     onChange={(e) =>
                        setProjectDetails({
                           ...projectDetails,
                           title: e.target.value,
                        })
                     }
                  />
               </Form.Group>
               <Form.Group className='mb-3' controlId='formDesc'>
                  <Form.Label style={{ color: 'white' }}>
                     Project Description: <b>{projectDetails.description}</b>
                  </Form.Label>
                  <Form.Control
                     as='textarea'
                     rows={3}
                     placeholder='New Description'
                     onChange={(e) =>
                        setProjectDetails({
                           ...projectDetails,
                           description: e.target.value,
                        })
                     }
                     placeholder='Tell us about your project'
                  />
               </Form.Group>
               <Form.Group controlId='formVideo'>
                  <Form.Label style={{ color: 'white' }}>
                     Project Video: <b>{projectDetails.url}</b>
                  </Form.Label>
                  <Form.Control
                     type='url'
                     placeholder='URL of your project video'
                     onChange={(e) =>
                        setProjectDetails({
                           ...projectDetails,
                           url: e.target.value,
                        })
                     }
                  />
               </Form.Group>
               <Form.Group controlId='formParticipants'>
                  <Form.Label style={{ color: 'white' }}>Seeking</Form.Label>

                  <div key={`inline-radio`} className='mb-3'>
                     <Form.Check
                        style={{ color: 'white' }}
                        inline
                        label='Mentor'
                        name='participant'
                        type='radio'
                        onClick={() =>
                           setProjectDetails({
                              ...projectDetails,
                              participants: 1,
                           })
                        }
                        id={`inline-radio-1`}
                     />
                     <Form.Check
                        style={{ color: 'white' }}
                        inline
                        label='Mentee'
                        name='participant'
                        type='radio'
                        onClick={() =>
                           setProjectDetails({
                              ...projectDetails,
                              participants: 2,
                           })
                        }
                        id={`inline-radio-2`}
                     />
                     <Form.Check
                        style={{ color: 'white' }}
                        inline
                        label='Mentor & Mentee'
                        name='participant'
                        type='radio'
                        onClick={() =>
                           setProjectDetails({
                              ...projectDetails,
                              participants: 3,
                           })
                        }
                        id={`inline-radio-3`}
                     />
                  </div>
               </Form.Group>

               <Form.Group controlId='formParticipants'>
                  <Form.Label style={{ color: 'white' }}>Status</Form.Label>

                  <div key={`inline-radio`} className='mb-3'>
                     <Form.Check
                        style={{ color: 'white' }}
                        inline
                        label='Go online'
                        name='status'
                        type='radio'
                        onClick={() =>
                           setProjectDetails({
                              ...projectDetails,
                              project_status: 1,
                           })
                        }
                        id={`inline-radio-1`}
                     />
                     <Form.Check
                        style={{ color: 'white' }}
                        inline
                        label='Go offline'
                        name='status'
                        type='radio'
                        onClick={() =>
                           setProjectDetails({
                              ...projectDetails,
                              project_status: 0,
                           })
                        }
                        id={`inline-radio-2`}
                     />
                  </div>
               </Form.Group>
               <Form>
                  <Form.Group controlId='formSkillsrequired'>
                     <Form.Label style={{ color: 'white' }}>
                        Skills required to complete the project
                     </Form.Label>
                     <Form.Control type='text' placeholder='Data Analysis' />
                     <br />
                     {skillsRequired
                        .filter((element) => element !== '')
                        .map((element) => {
                           return (
                              <Button
                                 variant='primary'
                                 style={{ margin: '0.25rem' }}
                              >
                                 {element}{' '}
                                 <Badge
                                    onClick={(event) => {
                                       let newArray = [
                                          ...skillsRequired,
                                       ].filter((item) => item !== element);
                                       setSkillsRequired(newArray);
                                    }}
                                    variant='light'
                                 >
                                    x
                                 </Badge>
                              </Button>
                           );
                        })}
                     <br />
                     <Button
                        onClick={() => {
                           if (
                              document.getElementById('formSkillsrequired')
                                 .value !== ''
                           ) {
                              setSkillsRequired([
                                 ...skillsRequired,
                                 document.getElementById('formSkillsrequired')
                                    .value,
                              ]);
                           }
                        }}
                        variant='secondary'
                        type='reset'
                     >
                        Add skill
                     </Button>
                  </Form.Group>
               </Form>
               <br />
               <div
                  style={{
                     display: 'flex',
                     flexDirection: 'row',
                     justifyContent: 'center',
                  }}
               >
                  <Button variant='success' onClick={handleSubmit}>
                     Update changes
                  </Button>{' '}
                  <Button variant='warning' onClick={closeProject}>
                     {buttonName}
                  </Button>{' '}
               </div>
            </Form>
         </Card.Body>
      </Card>
   );
}
