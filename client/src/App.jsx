import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom"

// Admin Pages
import Approval from "./pages/admin/Approval";
import AdminDashboard from "./pages/admin/Dashboard";
import ManageVoter from "./pages/admin/ManageVoter";
import Report from "./pages/admin/Report";
import Signup from "./pages/admin/SignupVoter";
import UpdateVoter from "./pages/admin/UpdateVoter";

// SuperAdmin Pages 
import SuperAdminDashboard from "./pages/superAdmin/Dashboard";
import ManageAdmins from "./pages/superAdmin/ManageAdmins";
import ManageParties from "./pages/superAdmin/ManageParties";
import SignupAdmin from "./pages/superAdmin/SignupAdmin";
import SignupParty from "./pages/superAdmin/SignupParty";
import Approvals from "./pages/superAdmin/Approval";
import Reports from "./pages/superAdmin/Report";
import RegStation from "./pages/superAdmin/RegStation";

// Index Pages
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";

// Voter Pages
import Home from "./pages/voter/Home";
import VoteProfile from "./pages/voter/VoteProfile";
import CastVote from "./pages/voter/CastVote";

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
          path: 'castVote',
          element: <CastVote />
        },
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
          path: "signup",
          element: <Signup />
        },
        {
          path: "manageVoter",
          element: <ManageVoter />
        },
        {
          path: "updateVoter/:id",
          element: <UpdateVoter />
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
          path: "signupParty",
          element: <SignupParty />
        },
        {
          path: "manageAdmins",
          element: <ManageAdmins />
        },
        {
          path: "manageParties",
          element: <ManageParties />
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
        <div className="app">
          <div className="container">
            <RouterProvider router={router} />
          </div>
        </div>
      );
}

export default App;