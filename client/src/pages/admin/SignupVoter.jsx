import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Menu from "./components/Menu";

const initialState = {
    fname : "",
    midname : "",
    lname : "",
    phone : "",
    email : "",
    station : "",
    gender : "",
    dob : "",
    username : "",
    password : "",
    conpassword : "",
    userRole : "voter"
}

export default function SignupAdmin(){

    const [ voter, setVoter ] = useState(initialState)
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const handleChange = (e) => {
        setVoter({...voter, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        
    e.preventDefault()
    try{
        await axios.post("http://localhost:8800/signupVoter", voter)
            .then(res => {
                console.log(res)
                setSuccess("Successfully Register")
        })
    } catch(err){
        console.log(err)
        setError(err.message)
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
                <div className="pl-10 pb-4 pt-2 sm:px-16 md:px-8 sm:py-8 overflow-scroll" >
                
                    {/* {console.log(voter)} */}
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
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Station Name<span className='text-red-500 text-3xl'>*</span></label>
                                    <select     
                                        defaultValue={voter.station}
                                        name="station" 
                                        required
                                        className="bg-slate-200"
                                        onChange={e => handleChange(e)}>

                                        <option value="0" ></option>
                                        <option value="Addis Ketema">Addis Ketema</option>
                                        <option value="Akaki Kaliti">Akaki Kaliti</option>
                                        <option value="Arada">Arada</option>
                                        <option value="Bole">Bole</option>
                                        <option value="Gullele">Gullele</option>
                                        <option value="Kirkos">Kirkos</option>
                                        <option value="Kolfe Keranio">Kolfe Keranio</option>
                                        <option value="Lideta">Lideta</option>
                                        <option value="Nifas Silk-Lafto">Nifas Silk-Lafto</option>
                                        <option value="Yeka">Yeka</option>
                                        <option value="Lemi Kura">Lemi Kura</option>
                                    </select>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Gender <span className='text-red-500 text-3xl'>*</span></label>
                                <div className="space-x-6  flex flex-row">
                                    <div>
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            value="Male" 
                                            onChange={e => handleChange(e)}/> Male
                                    </div>
                                    <div>
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            value="Female"
                                            onChange={e => handleChange(e)}/> Female
                                    </div>
                                    
                                </div>
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Date of Birth <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="date" 
                                    defaultValue={voter.dob}
                                    name="dob"
                                    required
                                    onChange={e => handleChange(e)}/>
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Username <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text" 
                                    defaultValue={voter.username}
                                    name="username"
                                    placeholder='Resident ID No.'
                                    onChange={e => handleChange(e)}/>
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Password <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="password"
                                    defaultValue={voter.password}
                                    name="password"
                                    required
                                    onChange={e => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Confirm Password <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-300 border-black p-1" 
                                    type="password" 
                                    defaultValue={voter.conpassword}
                                    name="conpassword"
                                    required
                                    onChange={e => handleChange(e)}/>
                            </div>
                            <div>
                                <input 
                                    type="hidden" 
                                    name="userRole"
                                    onChange={e => handleChange(e)}/>
                            </div>
                            {error && 
                            <div className="bg-red-300 text-red-900 text-1xl p-3 mx-16 w-2/5">
                                {error}
                            </div>

                            }
                            {success && 
                            <div className="bg-emerald-200 text-emerald-900 text-2xl p-3 mx-16 w-2/5">
                                {success}
                            </div>

                            }
                            <div className='flex flex-row text-center gap-1 sm:gap-3  text-black py-12 pl-3'>
                                <button 
                                    onClick={e => handleSubmit(e)}
                                    type="submit"
                                    className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                        SUBMIT
                                </button>
                                <button 
                                    className='px-5 py-1 rounded-l rounded-r hover:border-2'>
                                        RESET
                                </button>
                                <Link 
                                    to={'/admin'}
                                    className='px-5 py-1 rounded-l rounded-r-3xl bg-slate-400 hover:bg-slate-500'>
                                    <button>
                                        CANCEL
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
)}