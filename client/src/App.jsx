import {
  BrowserRouter,
    Navigate,
    Route,
    Routes,
  } from "react-router-dom"
  // import { useContext } from "react";
  // import { AuthContext } from "./context/authContext";

// Admin Pages
import Approval from "./views/admin/Approval";
import AdminDashboard from "./views/admin/Dashboard";
import ManageVoter from "./views/admin/ManageVoter";
import Report from "./views/admin/Report";
import SignupVoter from "./views/admin/SignupVoter";
import UpdateVoter from "./views/admin/UpdateVoter";

// SuperAdmin Pages 
import SuperAdminDashboard from "./views/superAdmin/Dashboard";
import ManageAdmins from "./views/superAdmin/ManageAdmins";
import ManageParties from "./views/superAdmin/ManageParties";
import SignupAdmin from "./views/superAdmin/SignupAdmin";
import SignupParty from "./views/superAdmin/SignupParty";
import Approvals from "./views/superAdmin/Approval";
import Reports from "./views/superAdmin/Report";
import RegStation from "./views/superAdmin/RegStation";
import UpdateAdmin from "./views/superAdmin/UpdateAdmin";


// Index Pages
import Login from "./views/Login";
import ForgetPassword from "./views/ForgetPassword";

// Voter Pages
import Home from "./views/voter/Home";
import VoteProfile from "./views/voter/VoteProfile";
import CastVote from "./views/voter/CastVote";
import UpdateParty from "./views/superAdmin/UpdateParty";
import ManageSingleParty from "./views/superAdmin/ManageSingleParty";
import ManageStations from "./views/superAdmin/ManageStations";
import UpdateStation from "./views/superAdmin/UpdateStation";
import VotesConfirmation from "./views/voter/VotesConfirmation";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";

const App = () => {
  
    const { user } = useContext(AuthContext)

    const ToSuperAdmin = () => {
      return(
        <BrowserRouter>
          <Route path="/superAdmin" element={<SuperAdminDashboard />} />
        </BrowserRouter>
      )
    }
    const ToAdmin = () => {
      return(
        <BrowserRouter>
          <Route path="/admin" element={<AdminDashboard />} />
        </BrowserRouter>
      )
    }
    const ToVoter = () => {
      const station = user?.station

      return(
        <BrowserRouter>
          <Route path={`/voter/castVote/${station}`} element={<CastVote />} />
        </BrowserRouter>
      )
    }

    if(user) {

      const userRole  = user.userRole
      const station = user?.station


      if(userRole === "superAdmin"){
        <Navigate to={`/superAdmin`} />
        ToSuperAdmin()
        // Navigate("/superAdmin")
      }else if(userRole === "administrator"){
        <Navigate to={`/admin`} />
        ToAdmin()
      }else if(userRole === "voter"){
        <Navigate to={`/voter/castVote/${station}`} />
        ToVoter()
        // Navigate(`/voter/castvote/${station}`)
      }
    }

    console.log(user, "User Details")
    
    
    return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
      
      
          <Route path="/voter" element={<Home />} />
          <Route path="/voter/profile" element={<VoteProfile />} />

          <Route path="/voter/castVote/:station" element={<CastVote /> } />


          <Route path="/voter/confirmation" element={<VotesConfirmation />} />
      
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/signupVoter" element={<SignupVoter />} />
          <Route path="/admin/updateVoter/:id" element={<UpdateVoter />} />
          <Route path="/admin/manageVoter" element={<ManageVoter />} />
          <Route path="/admin/approval" element={<Approval />} />
          <Route path="/admin/report" element={<Report />} />
      
          <Route path="/superAdmin" element={<SuperAdminDashboard />} />
          <Route path="/superAdmin/signupAdmin" element={<SignupAdmin />} />
          <Route path="/superAdmin/updateAdmin/:id" element={<UpdateAdmin />} />
          <Route path="/superAdmin/signupParty" element={<SignupParty />} />
          <Route path="/superAdmin/updateParty/:id" element={<UpdateParty />} />
          <Route path="/superAdmin/manageAdmins" element={<ManageAdmins />} />
          <Route path="/superAdmin/manageSingleParty/:id" element={<ManageSingleParty />} />
          <Route path="/superAdmin/manageParties" element={<ManageParties />} />
          <Route path="/superAdmin/regStation" element={<RegStation />} />
          <Route path="/superAdmin/manageStations" element={<ManageStations />} />
          <Route path="/superAdmin/updateStation/:id" element={<UpdateStation />} />
          <Route path="/superAdmin/approval" element={<Approvals />} />
          <Route path="/superAdmin/report" element={<Reports />} />
      
      
          <Route path="*" element={<Navigate to="/login" />} /> 
        </Routes>
      </BrowserRouter>
    </>
   
    )
}

export default App;
