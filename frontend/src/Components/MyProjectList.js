import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Card, Col, Row, CardColumns, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

export default function MyProjectList() {
   const [projects, setProjects] = useState([
      {
         title: '',
         description: '',
         created: '',
         skills: [],
         lookingFor: '',
         project_status: ''
      },
   ]);
   const payload = {};
   const [isLoading, setIsLoading] = useState(true);
   const history = useHistory();

   let renderParticipant = (participant) => {
      switch (participant) {
         case 1:
            return 'Mentor';
            break;
         case 2:
            return 'Mentee';
            break;
         default:
            return 'Mentor and Mentee';
      }
   };

   const handleRouting = (projectId) => {
      history.push(`/search_project/${projectId}`);
   };

   useEffect(() => {
      axios
         .get(`/myProjects?id=${localStorage.userId}`, {
            headers: {
               Authorization: localStorage.token,
            },
         })
         .then((response) => {
            console.log(response.data);
            setProjects(response.data);
            setIsLoading(false);
         });
   }, []);

   if (isLoading) {
      return (
         <div style={{ margin: 'auto auto' }}>
            <Spinner animation='border' variant='primary' />
         </div>
      );
   }
   if (projects === 'NO PROJECTS FOUND') {
      return <h4>{projects}</h4>;
   }
   return (
      <div className='text-center'>
         <Row id='row' style={{ margin: '10px' }}>
            {projects.map((project) => {
               return (
                  <Col
                     xs={12}
                     md={6}
                     lg={5}
                     id='col-md-4-project'
                     style={{ minWidth: '200px' }}
                  >
                     <Card id='my-projects'>
                        <Card.Header className='text-right'>
                           {project.projectStatus==1?(<Badge variant="success">Online</Badge>):(<Badge variant="danger">Offline</Badge>)}
                           <Button variant='link'>
                              <Link to={`/project/update/${project.id}`}>
                                 Edit
                              </Link>
                           </Button>
                        </Card.Header>
                        <Card.Body
                           id='my-project-body'
                           onClick={() => handleRouting(project.id)}
                        >
                           <Card.Title>{project.title}</Card.Title>
                           <Card.Text>{project.description}</Card.Text>
                           <Card.Text>
                              Looking For{' '}
                              <Badge variant='dark'>
                                 {renderParticipant(project.participants)}
                              </Badge>
                           </Card.Text>
                           <Card.Text>
                              <small className='text-muted'>
                                 {project.created}
                              </small>
                           </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                           <small>Skills Involved in the Project</small>
                           <br />
                           {project.skills.split(',').map((skill) => (
                              <Badge
                                 style={{ margin: '0.1rem' }}
                                 variant='success'
                              >
                                 {skill}
                              </Badge>
                           ))}
                           <br />
                        </Card.Footer>
                     </Card>
                  </Col>
               );
            })}
         </Row>
      </div>
   );
}
