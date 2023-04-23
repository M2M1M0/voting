import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import Menu from "./components/Menu";

export default function UpdateAdmin(){

    const [ voter, setVoter ] = useState([])
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const { id } = useParams()

    const handleChange = (e) => {
        setVoter({...voter, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/voter/" + id, voter)
                .then(res => {
                    setSuccess("Update Success")
            })
        } catch(err){
            console.log(err)
            setError(err.message)
        }    

        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 3000)
    }

    useEffect(() => {
        axios.get("http://localhost:8800/voter/"+id)
            .then(response => {
                setVoter(response.data[0])
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })
    }, [id])

return(
    <>
    <div className="flex flex-row h-screen">
        <div className="w-1/5">
            <Menu />
        </div>
        <div className="pl-2 w-4/5">
            <div className="flex flex-col h-screen">
                <div className="h-16 w-full flex flex-col text-center bg-gray-950 text-white">
                    <h1 className='font-semibold text-base sm:text-2xl'>Update Voter</h1>
                    <p className=''>National Election Board of Ethiopia</p>
                </div>
                <div className="pl-10 pb-4 pt-2 sm:px-16 md:px-8 sm:py-8 overflow-scroll" >
                
                    <div className="text-center mb-8 text-2xl">
                        <span className="p-3">Username: </span>  {voter.username}
                    </div>
                    <hr />
                    <div
                        className="grid grid-cols-1 text-left sm:text:center  sm:grid-cols-1 md:grid-cols-2">
                        <div className='space-y-2'>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">First Name <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    defaultValue={voter.fname}
                                    name='fname'
                                    required
                                    onChange={e => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Middle Name <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    defaultValue={voter.midname}
                                    name='midname'
                                    required
                                    onChange={e => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2 text-black pr-24'>
                                <label htmlFor="">Last Name <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    defaultValue={voter.lname}
                                    name='lname'
                                    required
                                    onChange={e => handleChange(e)} />
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                    <label htmlFor="">Phone Number <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="bg-slate-200 border-black p-1" 
                                        type="text" 
                                        placeholder='+251..'
                                        maxLength={10}
                                        minLength={10}
                                        defaultValue={voter.phone}
                                        name='phone'
                                        required
                                        onChange={e => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Email</label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="email" 
                                    placeholder='example@gmail.com'
                                    defaultValue={voter.email}
                                    name='email'
                                    onChange={e => handleChange(e)} />
                            </div>
                            <div>
                                <input 
                                    type="hidden" 
                                    name="userRole"
                                    onChange={e => handleChange(e)}/>
                            </div>
                            {error && 
                            <div className="bg-red-300 text-red-900 text-base p-3 m-5 w-3/4">
                                {error}
                            </div>

                            }
                            {success && 
                            <div className="bg-emerald-200 text-emerald-900 text-base p-3 m-5 w-3/4">
                                {success}
                            </div>

                            }
                            <div className='flex flex-row text-center gap-1 sm:gap-3  text-black py-12 pl-3'>
                                <button 
                                    onClick={e => handleSubmit(e)}
                                    type="submit"
                                    className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                        Update
                                </button>
                               
                                <button 
                                    className='px-5 py-1 rounded-l rounded-r-3xl bg-slate-400 hover:bg-slate-500'>
                                    <Link to={'/admin'}>
                                        CANCEL
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
)}