import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
   Card,
   Table,
   Row,
   CardColumns,
   Button,
   Spinner,
} from 'react-bootstrap';
import { showToast } from '../Components/Constants/toastServices';

export default function AcceptedRequest() {
   const [request, setRequest] = useState(0);

   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      axios
         .get('/users/pendingRequests' + `/${localStorage.userId}/AP`, {
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
   }, []);

   if (isLoading) {
      return (
         <div style={{ margin: 'auto auto' }}>
            <Spinner animation='border' variant='primary' />
         </div>
      );
   }

   return (
      <div className='text-center'>
         <Card bg='dark'>
            <Card.Body className='container'>
               <Card>
                  <Card.Header>
                     <div>
                        <h3>Accepted Requests</h3>
                     </div>
                  </Card.Header>

                  {request ? (
                     request.map((message) => {
                        return (
                           <Table striped bordered hover>
                              <thead>
                                 <tr>
                                    <th>Sender Name</th>
                                    <th>Project Name</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td>{message.userName}</td>
                                    <td>{message.projectName}</td>
                                    <td>{message.messageToUser}</td>
                                    <td>{message.requestedDate}</td>
                                 </tr>
                              </tbody>
                           </Table>
                        );
                     })
                  ) : (
                     <Card>
                        <Card.Title>No requests accepted so far!!</Card.Title>
                     </Card>
                  )}
               </Card>
            </Card.Body>
         </Card>
      </div>
   );
}
