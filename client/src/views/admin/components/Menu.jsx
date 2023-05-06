import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../../context/authContext'
import img from '../../../images/userdefault.png'
import  { IoMdArrowDropdown } from 'react-icons/io'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authContext'

export default function Menu(){
    const navigate = useNavigate()
    const { user, dispatch } = useContext(AuthContext)

    const logout =  () => {
        dispatch({type: "LOGOUT"})
        navigate("/")
    }


return(
    <>
    <div className="h-screen bg-slate-900 text-white">
        <div className="flex flex-col">
            <img 
                onClick={() => logout()}
                className="mx-3 mt-2 h-28 w-28 rounded-full cursor-pointer"
                src={img} alt="" />
                <div className='flex pl-12'>
                    <span>{user.fname} {user.lname}</span>
                    <button><IoMdArrowDropdown/></button>  
                </div>
            <ul className="py-8 space-y-0">
                <li className="p-3  hover:bg-slate-950">
                    <Link to={'/admin'}>
                        <h1>Dashoard</h1>
                    </Link>
                </li>
                <li className="p-3 hover:bg-slate-950">
                    <Link to={'/admin/signupVoter'}>
                        <h1>Add Voter</h1>
                    </Link>
                </li>
                <li className="p-3 hover:bg-slate-950">
                    <Link to={'/admin/manageVoter'}>   
                        <h1>Manage Voter</h1>
                    </Link>
                 </li>
                <li className="p-3 hover:bg-slate-950">
                    <Link to={'/admin/approval'}>
                        <h1>Activate/ Diactivate</h1>
                    </Link>
                </li>
                <li className="p-3 hover:bg-slate-950">      
                    <Link to={'/admin/report'}>                      
                        <h1>Report</h1>
                    </Link>
                </li>
                
            </ul>
        </div>
    </div>
    </>
)}