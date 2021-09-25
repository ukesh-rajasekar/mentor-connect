import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card, ListGroup, Modal, Button, Spinner } from 'react-bootstrap';
import { showToast } from '../Components/Constants/toastServices';
import Avatars from './Constants/avatars';

export default function Notifications(props) {
   const [request, setRequest] = useState(0);
   const [show, setShow] = useState(false);

   const [isLoading, setIsLoading] = useState(true);
   const approve = 'AP';
   const reject = 'RJ';

   const fetchRequests = () => {
      axios
         .get('/users/pendingRequests' + `/${localStorage.userId}/PD`, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            setRequest(res.data);
            setIsLoading(false);
            console.log(res.data);
         })
         .catch((err) => {
            console.log(err);
            setRequest(0);
            setIsLoading(false);
         });
   };

   useEffect(() => {
      fetchRequests();
   }, []);

   const sendResponse = (connectionId, status) => {
      axios
         .post(`/user/updateConnections/${connectionId}/${status}`, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            console.log(res.data);
            if (res.data === 'Connection request Approved') {
               showToast(`Request Accepted`, 'success');
               fetchRequests();
            } else {
               showToast(`Request Declined`, 'danger');
               fetchRequests();
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   if (isLoading) {
      return (
         <div style={{ margin: 'auto auto' }}>
            <Spinner animation='border' variant='primary' />
         </div>
      );
   }

   return (
      <Modal
         show={props.show}
         onHide={props.onHide}
         size='lg'
         aria-labelledby='contained-modal-title-vcenter'
         centered
      >
         <div className='text-center'>
            <Card bg='dark'>
               <Card.Body className='container'>
                  <Card.Header id='user-details-header'>
                     <div>
                        <h3>My requests</h3>
                     </div>
                     <div>
                        <Button variant='danger' onClick={props.onHide}>
                           X
                        </Button>
                     </div>
                  </Card.Header>

                  {request ? (
                     request.map((message) => {
                        return (
                           <Card style={{ marginBottom: '3%' }}>
                              <ListGroup.Item>
                                 <Card.Title
                                    style={{
                                       display: 'flex',
                                       alignItems: 'baseline',
                                       justifyContent: 'center',
                                    }}
                                 >
                                    {' '}
                                    <Avatars name={message.userName} />
                                    <p style={{ marginLeft: '2px' }}>
                                       {message.userName}
                                    </p>
                                 </Card.Title>
                              </ListGroup.Item>
                              {message.projectName && (
                                 <ListGroup.Item>
                                    {' '}
                                    <Card.Text>
                                       {' '}
                                       <h5>Applied for:</h5>
                                       {message.projectName} (
                                       {message.participantType})
                                    </Card.Text>{' '}
                                 </ListGroup.Item>
                              )}
                              <ListGroup.Item>
                                 {' '}
                                 <Card.Text>
                                    {' '}
                                    <h5>Message:</h5>
                                    {message.messageToUser}
                                 </Card.Text>{' '}
                              </ListGroup.Item>
                              {!message.projectName && (
                                 <ListGroup.Item>
                                    {' '}
                                    <Card.Text>
                                       <h5>Seeking for:</h5>
                                       {message.participantType}
                                    </Card.Text>{' '}
                                 </ListGroup.Item>
                              )}
                              <ListGroup.Item>
                                 {' '}
                                 <Card.Text>
                                    {' '}
                                    <small className='text-muted'>
                                       Posted On: {message.requestedDate}
                                    </small>
                                 </Card.Text>{' '}
                              </ListGroup.Item>
                              <Card.Footer
                                 style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                 }}
                              >
                                 <Button
                                    variant='success'
                                    onClick={() =>
                                       sendResponse(
                                          message.connectionId,
                                          approve
                                       )
                                    }
                                 >
                                    Accept
                                 </Button>
                                 <Button
                                    variant='danger'
                                    onClick={() =>
                                       sendResponse(
                                          message.connectionId,
                                          reject
                                       )
                                    }
                                 >
                                    Decline
                                 </Button>
                              </Card.Footer>
                           </Card>
                        );
                     })
                  ) : (
                     <div>
                        <Card>
                           <ListGroup.Item>
                              <Card.Title>No new requests!!</Card.Title>
                           </ListGroup.Item>
                        </Card>
                     </div>
                  )}
               </Card.Body>
            </Card>
         </div>
      </Modal>
   );
}
