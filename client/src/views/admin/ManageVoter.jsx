import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Menu from "./components/Menu";
import { Link } from "react-router-dom";
import  { MdPersonSearch } from 'react-icons/md'
import  { RxUpdate } from 'react-icons/rx'
import  { TiUserDelete } from 'react-icons/ti'
import useFetch from "../../hooks/useFetch";


export default function ManageAdmins(){

    const { data,  error, reFetch } = useFetch("http://localhost:8800/voter");

    
    const setError = useRef(false)
  
    const [ searchkey, setSearch ] = useState([])
    const [ find, setFind ] = useState([])


    const handleDelete = (id) => {
        if(window.confirm("Are you sure! you want to delete this Voter?")){
            axios.delete(`http://localhost:8800/voter/${id}`)
                .then(() => console.log("Delete success"))
                // .then(data => setVoter(data))
                .catch(err => setError(err.message))
        }
        setTimeout(() => {
            setError(false)
        }, 3000)
        
    }

    const search = (key) => {
        // Search 
        axios.get("http://localhost:8800/voter/search/"+key)
            .then(response => {
                // console.log(response.data, "result") 
                setFind(response.data)
                if(response.data.length === 0){
                    setError("Search not Found")
                }
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })

        setTimeout(() => {
            setError(false)
        }, 3000)
    }

    const reload = () => {
        setFind([])
    }

    useEffect(() => {
        reFetch()
    })

return(
    <>
    <div className="flex flex-row">
        <div className="w-1/6">
            <Menu />
        </div>
        <div className="pl-2 pt-3 w-5/6">
            <div className="flex flex-col space-y-5">
                <div className="font-semibold text-5xl text-sky-700">
                    <h1>Manage Voters</h1>
                </div>
                <div className="flex flex-row space space-x-96">
                    <div className="flex flex-row space-x-5">
                        <div className="text-center flex">
                            <input
                                className="pl-5 border-sky-700 bg-white w-72 hover:bg-slate-300" 
                                type="text" 
                                name="key"
                                onChange={e => setSearch(e.target.value)}
                                placeholder=" Search by Name/Phone Number"/>  

                            <button 
                                onClick={() => search(searchkey)}
                                className=" px-2 rounded-r-2xl bg-slate-950 text-white ">
                                <MdPersonSearch 
                                    className="text-4xl"/>
                            </button> 
                        </div>
                         
                        <button 
                            onClick={(e) => reload()} 
                            className="p-1 px-3 border-neutral-600 bg-sky-300 text-lg font-mono rounded-2xl hover:bg-sky-400 hover:text-white">
                            Reload
                        </button>  
                    </div>  
                    <div>
                        <Link to={'/admin/signupVoter'}>
                            <button 
                                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-400 text-white"> 
                                Add Voter 
                            </button> 
                        </Link>
                                     
                    </div>
                </div>
                <div className="flex flex-col bg-slate-900">
                <div className="mx-0 bg-white w-auto h-80 overflow-scroll ">
                    <table className="table w-full mx-2 p-1 border-collapse border border-slate-900 text-left">
                        <thead>
                            <tr className="border text-white bg-slate-900">
                                <th scope="col" className="p-3">#</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Station</th>
                                <th className="pl-8" scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {find.length ? find.map((found, index) => (
                            <tr className="border" key={found._id}>
                                 <td className="p-3 ">{index + 1}</td>
                                <td className="font-mono ">{found.fname}  {found.midname}  {found.lname}</td>
                                <td className="font-extrabold">{found.username}</td>
                                <td>{found.phone}</td>
                                <td>{found.email}</td>
                                <td>{found.station}</td>
                                <td className="flex text-base space-x-6 mt-2">
                                    <Link to={`/admin/updateVoter/${found._id}`}>
                                        <div className="rounded-3xl px-3 py-1 text-white font-bold bg-amber-600 hover:bg-amber-400 cursor-pointer">
                                            <RxUpdate className="text-2xl"/>
                                        </div>
                                    </Link>

                                    <div onClick={() => handleDelete(found._id)}
                                        className="rounded-3xl px-3 py-1 text-white font-bold bg- bg-red-800 hover:bg-red-500 cursor-pointer"  >
                                        <TiUserDelete className="text-2xl" />
                                    </div>
                                </td>
                            </tr>
                            )) : data.length ? data.map((user, index) => (
                            <tr className="border" key={user._id}>
                                 <td className="p-3 ">{index + 1}</td>
                                <td className="font-mono ">{user.fname}  {user.midname}  {user.lname}</td>
                                <td className="font-extrabold">{user.username}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.station}</td>
                                <td className="flex text-base space-x-6 mt-2">
                                    <Link to={`/admin/updateVoter/${user._id}`}>
                                        <div className="rounded-3xl px-3 py-1 text-white font-bold bg-amber-600 hover:bg-amber-400 cursor-pointer">
                                            <RxUpdate className="text-2xl"/>
                                        </div>
                                    </Link>

                                    <div onClick={() => handleDelete(user._id)}
                                        className="rounded-3xl px-3 py-1 text-white font-bold bg- bg-red-800 hover:bg-red-500 cursor-pointer"  >
                                        <TiUserDelete className="text-2xl" />
                                    </div>
                                </td>
                            </tr>
                            )) : null }
                        </tbody>
                        
                    </table>
                    {error && 
                    <div className="bg-red-300 text-red-900 text-1xl p-3 m-2 w-full">
                        {error}
                    </div>
                    }

                </div>
                </div>
            </div>
        </div>
    </div>
    </>
)}