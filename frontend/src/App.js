import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
import Home from './Pages/home';
import Login from './Pages/login';
import Register from './Pages/register';
import Navigation from './Components/navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateProject from './Pages/createProject';
import UserProfile from './Pages/UserProfile';
import Searchuser from './Pages/searchuser';
import ProjectPage from './Pages/projectPage1';
import EditProject from './Pages/EditProject';
import GetSearchedUser from './Pages/getSearchedUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopUsers from './Pages/topUsers';
import Notifications from './Components/myRequests';

function App() {
   const [input, setInput] = useState('');
   return (
      <Router>
         <Switch>
            <Route exact path='/'>
               <div className='Home-component'>
                  <Login />
               </div>
            </Route>
            <Route exact path='/signup'>
               <Register />
            </Route>
            <Route exact path='/home'>
               <Navigation keyword={input} setKeyword={setInput} />
               <div className='Home-component'>
                  <Home keywords={input} />
               </div>
            </Route>
            <Route exact path='/search_project/:projectId'>
               <div className='Home-component'>
                  <Navigation />
                  <ProjectPage />
               </div>
            </Route>
            <Route exact path='/search_user'>
               <div className='Home-component'>
                  <Navigation keyword={input} setKeyword={setInput} />
                  <Searchuser user={input} />
               </div>
            </Route>
            <Route exact path='/leaderBoard'>
               <Navigation />
               <TopUsers />
            </Route>
            <Route exact path='/request'>
               <Navigation />
               <Notifications />
            </Route>

            <Route exact path='/project/update/:id'>
               <div className='Home-component'>
                  <Navigation />
                  <EditProject />
               </div>
            </Route>
            <Route exact path='/search_user/:userId'>
               <div className='Home-component'>
                  <Navigation />
                  <GetSearchedUser />
               </div>
            </Route>
            <Route exact path='/create_project'>
               <div className='Home-component'>
                  <Navigation />
                  <CreateProject />
               </div>
            </Route>
            <Route exact path='/user_profile'>
               <div className='Home-component'>
                  <Navigation />
                  <UserProfile />
               </div>
            </Route>
         </Switch>
         <ToastContainer
            position='bottom-right'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
      </Router>
   );
}

export default App;
