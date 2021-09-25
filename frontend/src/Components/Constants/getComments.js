import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';
import Avatars from './avatars';

export default function GetComments(props) {
   const { projectId } = props;
   const [comments, setComments] = useState(0);
   const [isLoading, setIsLoading] = useState(true);

   let apiTimeout = setTimeout(fetchAPIData, 3000);
   const fetchAPIData = () => {
      if (window.location.pathname === `/search_project/${projectId}`) {
         axios
            .get(`/getprojectcomments/${projectId}`, {
               headers: {
                  Accept: 'application/json',
                  Authorization: localStorage.token,
               },
            })
            .then((res) => {
               console.log(res.data);
               setComments(res.data);
               setIsLoading(false);
               apiTimeout = setTimeout(fetchAPIData, 1000);
            })
            .catch((err) => {
               console.log(err);
               setIsLoading(false);
               clearTimeout(apiTimeout);
            });
      }
   };

   useEffect(() => {
      fetchAPIData();
   }, []);

   if (isLoading) {
      return (
         <div style={{ margin: 'auto auto' }}>
            <Spinner animation='border' variant='primary' />
         </div>
      );
   }

   return (
      <div>
         <Card bg='dark'>
            <Card.Header>
               {' '}
               <h4 style={{ color: 'white' }}>Comments</h4>
            </Card.Header>
            <Card>
               <Card.Body>
                  {comments ? (
                     comments.map((comment) => {
                        return (
                           <div>
                              <Card.Text
                                 style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                 }}
                              >
                                 <div
                                    style={{
                                       display: 'flex',
                                       flex: 3,
                                       alignItems: 'center',
                                    }}
                                 >
                                    <Avatars name={comment.username} />
                                    <b style={{ marginLeft: '1%' }}>
                                       {comment.username}
                                    </b>

                                    <div style={{ marginLeft: '2%' }}>
                                       {comment.comment}
                                    </div>
                                 </div>
                                 <div>
                                    <small
                                       className='text-muted'
                                       style={{ marginLeft: '2%' }}
                                    >
                                       {comment.createdDate}
                                    </small>
                                 </div>
                              </Card.Text>
                              <br />
                           </div>
                        );
                     })
                  ) : (
                     <Card>
                        <Card.Title>No Comments!</Card.Title>
                     </Card>
                  )}
               </Card.Body>
            </Card>
         </Card>
      </div>
   );
}
