import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "./components/Menu";
import { Link } from "react-router-dom";

export default function ManageAdmins(){

    const [ admin, setAdmin ] = useState([])
    const [ error, setError ] = useState(false)


    useEffect(() => {
        axios.get("http://localhost:8800/admins")
            .then(response => {
                console.log(response.data) 
                setAdmin(response.data)
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })
    }, [])

return(
    <>
    <div className="flex flex-row">
        <div className="w-1/6">
            <Menu />
        </div>
        <div className="pl-2 pt-3 w-5/6">
            <div className="flex flex-col space-y-5">
                <div className="font-semibold text-5xl text-sky-700">
                    <h1>Manage Admins</h1>
                </div>
                <div className="flex flex-row space-x-0">
                    <input
                        className="border-2 p-2 pl-5 rounded-l-3xl border-purple-400 bg-slate-100 w-4/5" 
                        type="text" 
                        placeholder="Search by Username/Phone"/>
                    <button className="p-3 pr-8 text-center border-neutral-600 bg-slate-300 text-lg font-mono rounded-r-3xl">
                        Search
                    </button>                   
                </div>
                <div className="flex flex-col bg-slate-900">
                <div className="mx-4 bg-white w-auto h-80 overflow-scroll ">
            <div className="">
                <ul className="font-semibold grid grid-cols-7 mx-3 bg-zinc-200 p-3 ">
                    <li>No</li>
                    <li>Full Name</li>
                    <li>Username</li>
                    <li>Phone</li>
                    <li>Station</li>
                    <li>userRole</li>
                    <li>Actions</li>
                </ul>
                {admin && admin.map((user) => (
                    <ul key={user._id}
                        className="font-normal grid grid-cols-7 mx-3 bg-zinc-100 p-3">
                        <li>{user._id}</li>
                        <li>{user.firstname} {user.middlename} {user.lastname}</li>
                        <li>{user.username}</li>
                        <li>{user.phone}</li>
                        <li>{user.station}</li>
                        <li>{user.userRole}</li>
                        <li className="space-x-5 flex text-base">
                            <div>
                                <Link to={`/update/${user._id}`}>
                                    Update
                                    {/* <img
                                        className="w-8 h-8"
                                        src={update} alt="" /> */}
                                </Link>
                            </div>
                            <div className=""  >
                                Delete
                                {/* <img 
                                    
                                    className="w-8 h-8"
                                    src={del} alt="" /> */}
                            </div>
                            
                        </li>
                    </ul>
                ))
                }
                {error && 
                <div className="bg-red-300 text-red-900 text-1xl p-3 m-2">
                    {error}
                </div>
                }
            </div>
        </div>

                </div>
            </div>
        </div>
    </div>
    </>
)}