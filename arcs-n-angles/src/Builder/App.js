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
import BuilderProjects from './Pages/BuilderProjects/BuilderProjects';
import NewProject from './Pages/NewProject/NewProject';
import ProjectDetails from './Pages/ProjectDetails/ProjectDetails';
import MyProjectDetails from './Pages/BuilderProjects/ProjectDetails';
import PlanDetails from './Pages/PlanDetails/PlanDetails';
import ChatBox from './Pages/Chat/ChatBox';
import ChatBoxBuilder from './Pages/Chat/ChatBoxBuilder';
import ChatBoxArch from './Pages/Chat/ChatBoxArch';
import ChatList from './Pages/Chat List/ChatList';
import Purchases from './Pages/Purchases/Purchases';
import BuilderListProject from './Pages/BuilderProjects/BuilderListProject';
import ArchitectProjects from './Pages/ArchitectProjects/ArchitectProjects';

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
              <Route path="/builderproject/:bid" element={<BuilderListProject />} />
              <Route path="/myprojects" element={<BuilderProjects />} />
              <Route path="/myprojects/newproject" element={<NewProject />} />
              <Route path="/myprojects/projectdetails/:prid" element={<MyProjectDetails />} />
              <Route path="/projectdetails/:prid" element={<ProjectDetails />} />
              <Route path="/plandetails/:plid" element={<PlanDetails />} />
              <Route path="/chatbox/:uid" element={<ChatBox />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/chatboxbuilder/:blid" element={<ChatBoxBuilder />} />
              <Route path="/chatboxarch/:aid" element={<ChatBoxArch />} />
              <Route path="/architectprojects/:aid" element={<ArchitectProjects />} />
              <Route path="/chatlist" element={<ChatList />} />
            </Routes>
          </div>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App;