import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import StaffRegisterSelect from './StaffRegisterSelect.jsx'
import StaffRegister from './staff_register.jsx'
import AssignerRegister from './AssignerRegister.jsx'
import CitizenRegister from './CitizenRegister.jsx'
import TrainingRequest from './TrainingRequest.jsx'
import FirefighterLogin from  './FirefighterLogin.jsx'
import AssignerDashboard from  './AssignerDashboard.jsx'
import Profile from  './Profile.jsx'
import Login from  './Login.jsx'
// import TraineeProfile from './TraineeProfile.jsx'
import { useNavigate } from 'react-router-dom'

// function TraineeProfileWrapper() {
//   const navigate = useNavigate()
//   return (
//     <TraineeProfile
//       onBackHome={() => navigate('/')}
//       onLogout={() => navigate('/')}
//     />
//   )
// }
function TrainingRequestWrapper() {
  const navigate = useNavigate()
  return <TrainingRequest onBackHome={() => navigate('/')} />
}

function CitizenRegisterWrapper() {
  const navigate = useNavigate()
  return <CitizenRegister onBackHome={() => navigate('/')} />
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
         {/* <Route path="/" element={<Profile />} />   */}
        
        <Route path="/" element={<App />} />
        <Route path="/staff_register" element={<StaffRegisterSelect />} />
        <Route path="/staff_register/firefighter" element={<StaffRegister />} />
        <Route path="/staff_register/assigner" element={<AssignerRegister />} />
        {/* <Route path="/training_request" element={<TrainingRequest />} /> */}
       
        {/* <Route path="/citizen_register" element={<CitizenRegister />} /> */}
        
        <Route path="/citizen_register" element={<CitizenRegisterWrapper />} />
        <Route path="/training_request" element={<TrainingRequestWrapper />} />
         <Route path="/login/firefighter" element={<FirefighterLogin />} /> 
          //<Route path="/login/firefighter" element={<Login />} />
<Route path="/assigner_dashboard" element={<AssignerDashboard />} />
        {/* <Route path="/trainee_profile" element={<TraineeProfileWrapper />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)