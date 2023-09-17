import { Container, Grid } from '@material-ui/core';
import React from 'react'
import './App.css'

import Profile from './Components/Profile/Profile';
import Header from './Components/Header/Header';
import UserMainPage from './Pages/UserMainPage/UserMainPage';
import Footer from './Components/Footer/Footer';
import MyProfile from './Pages/MyProfile/MyProfile';
import ArchitectList from './Pages/ArchitectList/ArchitectList';
import BuilderList from './Pages/BuilderList/BuilderList';
import ArchitectProjects from './Pages/ArchitectProjects/ArchitectProjects';
import NewProject from './Pages/NewProject/NewProject';
import ProjectDetails from './Pages/ProjectDetails/ProjectDetails';
import PlanDetails from './Pages/PlanDetails/PlanDetails';
import ChatBoxUser from './Pages/Chat/ChatBoxUser';
import ChatBoxBuilder from './Pages/Chat/ChatBoxBuilder';
import ChatBoxArch from './Pages/Chat/ChatBoxArch';
import ChatList from './Pages/Chat List/ChatList';
import Purchases from './Pages/Purchases/Purchases';
import ArchitectListProjects from './Pages/ArchitectProjects/ArchitectProjects';
import BuilderProject from './Pages/BuilderProjects/BuilderProjects';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Container className={'top_60 user_page'}>
      <Grid container spacing={7}>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <Profile />
        </Grid>
        <Grid item xs>
          <Header />
          <div className='main_content container_shadow'>
            <Routes>
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/" element={<UserMainPage />} />
              <Route path="/architectlist" element={<ArchitectList />} />
              <Route path="/builderlist" element={<BuilderList />} />
              <Route path="/myprojects" element={<ArchitectProjects />} />
              <Route path="/myprojects/newproject" element={<NewProject />} />
              <Route path="/myprojects/projectdetails" element={<ProjectDetails />} />
              <Route path="/projectdetails/:prid" element={<ProjectDetails />} />
              <Route path="/plandetails/:plid" element={<PlanDetails />} />
              <Route path="/chatboxuser/:uid" element={<ChatBoxUser />} />
              <Route path="/chatboxbuilder/:bid" element={<ChatBoxBuilder />} />
              <Route path="/chatboxarch/:archid" element={<ChatBoxArch />} />
              <Route path="/chatlist" element={<ChatList />} />
              <Route path="/architectprojects/:aid" element={<ArchitectListProjects />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/builderproject/:bid" element={<BuilderProject />} />
            </Routes>
          </div>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App;