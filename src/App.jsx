// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Welcome from './pages/Welcome';
import Home from './pages/Admin/AdminHome';
import EventInformationAndRegistrationIndex from './pages/Attendee/EventInformationAndRegistration/Index';
import ExhibitorManagementIndex from './pages/Admin/ExhibitorManagement/Index';
import ScheduleManagementIndex from './pages/Admin/ScheduleManagement/Index';
import AttendeeIndex from './pages/Attendee/ScheduleManagement/Index';
import BoothSelectionAndManagementIndex from './pages/Exhibitor/BoothSelectionAndManagement/Index';
import CommunicationIndex from './pages/Exhibitor/Communication/Index';
import RegistrationAndProfileManagementIndex from './pages/Exhibitor/RegistrationAndProfileManagement/Index';
import ExhibitorHome from './pages/Exhibitor/ExhibitorHome';
import AnalyticsAndReportingIndex from './pages/Admin/AnalyticsAndReporting/Index';
import ExpoManagementIndex from './pages/Admin/ExpoManagement/Index';
import UserManagementIndex from './pages/Admin/UserManagement/Index';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Welcome/>} />
          <Route path="Register" element={<Register/>} />
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/AnalyticsReporting" element={<AnalyticsAndReportingIndex />} />
          <Route path="/admin/ExhibitorMangement" element={<ExhibitorManagementIndex />} />
          <Route path="/admin/ExpoMangement" element={<ExpoManagementIndex />} />
          <Route path="/admin/ScheduleMangement" element={<ScheduleManagementIndex />} />
          <Route path="/admin/UserMangement" element={<UserManagementIndex />} />

          <Route path="/attendee/event" element={<EventInformationAndRegistrationIndex />} />
          <Route path="/attendee/Exhibitor" element={<ExhibitorManagementIndex />} />
          <Route path="/attendee/Schedule" element={<ScheduleManagementIndex />} />
          <Route path="/attendee/Index" element={<AttendeeIndex />} />

          <Route path="/Exhibitor/BoothSelect" element={<BoothSelectionAndManagementIndex/>} />
          <Route path="/Exhibitor/Communication" element={<CommunicationIndex/>} />
          <Route path="/Exhibitor/Registration" element={<RegistrationAndProfileManagementIndex/>} />
          <Route path="/Exhibitor/Home" element={<ExhibitorHome/>} />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
