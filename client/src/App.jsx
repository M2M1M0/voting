import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom"

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
import { AuthContexProvider } from "./context/authContext";

const router = createBrowserRouter([

  {
    path: '',
    element: <Login/>
  },
  {
    path: 'forgetPassword',
    element: <ForgetPassword/>
  },
  {
    path: "/voter",
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'profile',
        element: <VoteProfile />
      },
      {
        path: 'castVote/:station',
        element: <CastVote />
      },
      {
        path: 'confirmation',
        element: <VotesConfirmation />
      }
    ]
  },

  {
    path: "/admin",
    children: [
      {
        path: '',
        element: <AdminDashboard />
      },
      {
        path: "signupVoter",
        element: <SignupVoter />
      },
      {
        path: "updateVoter/:id",
        element: <UpdateVoter />
      },
      {
        path: "manageVoter",
        element: <ManageVoter />
      },
      {
        path: "approval",
        element: <Approval />
      },
      {
        path: "report",
        element: <Report />
      } 
    ]
  },
  {
    path: "/superAdmin",
    children: [
      {
        path: '',
        element: <SuperAdminDashboard />
      },
      {
        path: "signupAdmin",
        element: <SignupAdmin />
      },
      {
        path: "updateAdmin/:id",
        element: <UpdateAdmin />
      },
      {
        path: "signupParty",
        element: <SignupParty />
      },
      {
        path: "updateParty/:id",
        element: <UpdateParty />
      },
      {
        path: "manageAdmins",
        element: <ManageAdmins />
      },
      {
        path: "manageSingleParty/:id",
        element: <ManageSingleParty />
      },
      {
        path: "manageParties",
        element: <ManageParties />
      },
      {
        path: "manageStations",
        element: <ManageStations />
      },
      {
        path: "updateStation/:id",
        element: <UpdateStation />
      },
      {
        path: "approval",
        element: <Approvals />
      },
      {
        path: "report",
        element: <Reports />
      },
      {
        path: "regStation",
        element: <RegStation />
      } 
    ]
  },


])



function App() {
    
  return (
    <AuthContexProvider>
      <RouterProvider router={router} />
    </AuthContexProvider>
  )
}

export default App;