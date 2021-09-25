import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { OverlayTrigger, Nav, Navbar, Tooltip } from 'react-bootstrap';
import { showToast } from '../Components/Constants/toastServices';
import search from '../Components/binoculars.png';
import connect from '../Components/global-connection.png';
import create from '../Components/study.png';
import logout from '../Components/logout.png';
import myaccount from '../Components/avatar.png';
import request from '../Components/request.png';
import Notifications from './myRequests';
import MentorConnect from '../Components/MentorConnect.jpg'

export default function Navigation(props) {
   const { keyword, setKeyword } = props;
   const [modalShow, setModalShow] = React.useState(false);

   const signOff = () => {
      showToast(`Later ${localStorage.email}`, 'success');
      localStorage.removeItem('token');
   };

   const tooltipFindProj = () => {
      return <Tooltip>Search for projects here</Tooltip>;
   };

   const tooltipMakeConnection = () => {
      return <Tooltip>Search for Users here</Tooltip>;
   };

   const tooltipLeaderboard = () => {
      return <Tooltip>See the Top Rated Users</Tooltip>;
   };

   const tooltipCreateProject = () => {
      return <Tooltip>Have a Project? Start Here !</Tooltip>;
   };

   const tooltipMyAccount = () => {
      return <Tooltip>Manage Your Account and Projects Here!</Tooltip>;
   };

   const tooltipLogout = () => {
      return <Tooltip>Logout, See you soon!</Tooltip>;
   };

   const tooltipRequests = () => {
      return <Tooltip>Check for new connection requests</Tooltip>;
   };

   console.log(modalShow);
   return (
      <Router>
         <Navbar
            collapseOnSelect
            expand='lg'
            sticky='top'
            style={{ backgroundColor: '#242526' }}
            variant='dark'
         >
            <Navbar.Brand>
            <img
                        src={MentorConnect}
                        width='50'
                        height='50'
                        className='d-inline-block align-top'
                        alt='React Bootstrap logo'
                     />
            </Navbar.Brand>
            <OverlayTrigger
               overlay={tooltipFindProj()}
               trigger='hover'
               placement='bottom'
            >
               <Navbar.Brand href='/home'>
                  <span>
                     Find projects{' '}
                     <img
                        src={search}
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                        alt='React Bootstrap logo'
                     />
                  </span>
               </Navbar.Brand>
            </OverlayTrigger>
            <OverlayTrigger
               overlay={tooltipMakeConnection()}
               trigger='hover'
               placement='bottom'
            >
               <Navbar.Brand href='/search_user'>
                  Make connection{' '}
                  <img
                     src={connect}
                     width='30'
                     height='30'
                     className='d-inline-block align-top'
                     alt='React Bootstrap logo'
                  />
               </Navbar.Brand>
            </OverlayTrigger>
            <OverlayTrigger
               overlay={tooltipLeaderboard()}
               trigger='hover'
               placement='bottom'
            >
               <Navbar.Brand href='/leaderBoard'>LeaderBoard 🥇</Navbar.Brand>
            </OverlayTrigger>
            <OverlayTrigger
               overlay={tooltipCreateProject()}
               trigger='hover'
               placement='bottom'
            >
               <Navbar.Brand className='ml-auto' href='/create_project'>
                  Create Project{' '}
                  <img
                     src={create}
                     width='30'
                     height='30'
                     className='d-inline-block align-top'
                     alt='React Bootstrap logo'
                  />
               </Navbar.Brand>
            </OverlayTrigger>
            <OverlayTrigger
               overlay={tooltipMyAccount()}
               trigger='hover'
               placement='bottom'
            >
               <Navbar.Brand href='/user_profile'>
                  My Account{' '}
                  <img
                     src={myaccount}
                     width='30'
                     height='30'
                     className='d-inline-block align-top'
                     alt='React Bootstrap logo'
                  />
               </Navbar.Brand>
            </OverlayTrigger>
            <OverlayTrigger
               overlay={tooltipRequests()}
               trigger='hover'
               placement='bottom'
            >
               <Navbar.Brand onClick={() => setModalShow(true)} id='my-request'>
                  My Requests{' '}
                  <img
                     src={request}
                     width='30'
                     height='30'
                     className='d-inline-block align-top'
                     alt='React Bootstrap logo'
                  />
               </Navbar.Brand>
            </OverlayTrigger>
            <div>
               {modalShow && (
                  <Notifications
                     show={modalShow}
                     onHide={() => setModalShow(false)}
                  />
               )}
            </div>
            <OverlayTrigger
               overlay={tooltipLogout()}
               trigger='hover'
               placement='bottom'
            >
               <Nav>
                  <Nav.Link href='/' onClick={signOff}>
                     <img
                        src={logout}
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                        alt='React Bootstrap logo'
                     />
                  </Nav.Link>
               </Nav>
            </OverlayTrigger>
         </Navbar>
      </Router>
   );
}
