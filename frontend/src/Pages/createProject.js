import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Badge } from 'react-bootstrap';
import { showToast } from '../Components/Constants/toastServices';
import { useHistory } from 'react-router';

export default function CreateProject() {
   const [skillsRequired, setSkillsRequired] = useState([]);
   const history = useHistory();

   const [projectDetails, setProjectDetails] = useState({
      title: '',
      description: '',
      skills: '',
      user_id: Number(localStorage.userId),
      participants: '',
      url: '',
   });
   projectDetails['skills'] = skillsRequired.toString();

   async function handleSubmit() {
      if (!(Array.isArray(skillsRequired) && skillsRequired.length)) {
         showToast('Skills cannot be empty', 'danger');

         return null;
      } else {
         setProjectDetails({
            ...projectDetails,
            skills: skillsRequired.join(),
         });
      }

      if (!projectDetails.title) {
         showToast('Project title cannot be empty', 'danger');

         return null;
      } else if (!projectDetails.description) {
         showToast('Project description cannot be empty', 'danger');
         return null;
      } else if (!projectDetails.participants) {
         showToast('Seeking is not selected select atlease one', 'danger');
         return null;
      }
      console.log(projectDetails);

      axios
         .post(`/createProject`, projectDetails, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((response) => {
            showToast('Project Successfully Created', 'success');
            document.getElementById('create-project-form').reset();
            setSkillsRequired([]);
            setProjectDetails({
               title: '',
               description: '',
               skills: '',
               user_id: Number(localStorage.userId),
               participants: 0,
               url: '',
            });
         })
         .catch((error) => {
            console.log(error);
         });
   }

   return (
      <Card style={{ width: '100%', backgroundColor: '#242526' }}>
         <Card.Body
            style={{
               minHeight: '100vh',
               minWidth: '80vw',
               margin: 'auto',
               backgroundColor: '#3A3B3C',
            }}
         >
            <h1 style={{ color: '#ffc107', textAlign: 'center' }}>
               Create new Projects
            </h1>
            <Form id='create-project-form'>
               <Form.Group controlId='formTitle'>
                  <Form.Label style={{ color: 'white' }}>
                     *Project Title
                  </Form.Label>
                  <Form.Control
                     type='text'
                     placeholder='Project Title'
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
                     *Project Description
                  </Form.Label>
                  <Form.Control
                     as='textarea'
                     rows={3}
                     onChange={(e) =>
                        setProjectDetails({
                           ...projectDetails,
                           description: e.target.value,
                        })
                     }
                     placeholder='Tell us about your project'
                     required
                  />
               </Form.Group>
               <Form.Group controlId='formVideo'>
                  <Form.Label style={{ color: 'white' }}>
                     Project Video
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
                  <Form.Label style={{ color: 'white' }}>*Seeking</Form.Label>

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
               <Form>
                  <Form.Group controlId='formSkillsrequired'>
                     <Form.Label style={{ color: 'white' }}>
                        *Skills required to complete the project
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
               <Button variant='success' onClick={handleSubmit}>
                  Submit
               </Button>
            </Form>
         </Card.Body>
      </Card>
   );
}
