import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import Menu from "./components/Menu"

const initialState = {
    stationname : "",
    admin : "",
    contact : ""
}

export default function RegStation(){

    const [ station, setStation ] = useState(initialState)
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setStation({...station, [name] : value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(station.stationname === "" || station.admin === "" || station.contact === ""){
            alert("All Fields not be empty!")
        }else{

            // Register Signup
            axios.post("http://localhost:8800/station/signup", station)
                .then(() => {
                    setSuccess("Successfully Added")
                    setStation(initialState)
                })
                .catch(err => {
                    setError(err.message)
                    console.log(err)
                })
            setTimeout(() => {
                setSuccess(false)
                setSuccess(false)
            }, 4000)
        }

    }

   

return(
    <>
    <div className="flex flex-row h-screen">
        <div className="w-1/5">
            <Menu />
        </div>
        <div className="pl-2 w-4/5">
            <div className="flex flex-col h-screen">
                <div className="h-16 w-full flex flex-col text-center bg-gray-950 text-white">
                    <h1 className='font-semibold text-base sm:text-2xl'>Register Now</h1>
                    <p className=''>National election board of ethiopia</p>
                </div>
                <div className="px-3 pb-4 pt-2 sm:px-16 sm:py-8 overflow-scroll" >
                    <form action="">
                        {
                            error &&
                            <div className="bg-red-300 text-red-700 text-base p-2">{error}</div>
                        }
                        {
                            success &&
                            <div className="bg-emerald-300 text-emerald-700 text-base p-2">{success}</div>
                        }
                        <div className="grid grid-cols-1 text-left sm:text:center  sm:grid-cols-2">
                            <div className='space-y-4'>
                                <div className='flex flex-col gap-2  text-black pr-24'>
                                    <label htmlFor="">Station Name <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="bg-slate-200 border-black p-1" 
                                        type="text"
                                        name='stationname'
                                        value={station.stationname}
                                        onChange={(e) => handleChange(e)} />
                                </div>
                                <div className='flex flex-col gap-2  text-black pr-24'>
                                    <label htmlFor="">Admin Username <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="bg-slate-200 border-black p-1" 
                                        type="text"
                                        name='admin'
                                        value={station.admin}
                                        onChange={(e) => handleChange(e)} />
                                </div>
                                <div className='flex flex-col gap-2  text-black pr-24'>
                                    <label htmlFor="">Contact Number <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="bg-slate-200 border-black p-1" 
                                        type="text"
                                        name='contact'
                                        placeholder='+251..'
                                        maxLength={10}
                                        minLength={10}
                                        value={station.contact}
                                        onChange={(e) => handleChange(e)} />
                                </div>
                                
                                
                                <div className='flex flex-row text-center gap-1 sm:gap-3  text-black  py-5'>
                                    <button 
                                        onClick={(e) => handleSubmit(e)}
                                        className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                        <Link>
                                            SUBMIT
                                        </Link>
                                    </button>
                                    <button 
                                        onClick={(e) => setStation(initialState)}
                                        className='px-5 py-1 rounded-l rounded-r  bg-slate-200 hover:bg-slate-300'>
                                            RESET
                                    </button>
                                    <Link 
                                        className='px-5 py-1 rounded-l rounded-r-3xl bg-slate-400 hover:bg-slate-500'
                                        to={'/superAdmin'}>
                                        <button >
                                            CANCEL
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
)}