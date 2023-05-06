import { useEffect, useState } from "react";
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
    const [ stations, setStations ] = useState([])

    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const handleChange = (e) => {
        setVoter({...voter, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(voter.fname === '' || voter.midname === '' || voter.lname === '' || voter.phone === '' || voter.station === '' || voter.gender === '' || voter.dob === '' || voter.username === '' || voter.password === ''){
            alert("Fields with '*' must be filled!")
        } else {
        try{
            await axios.post("http://localhost:8800/voter/signup", voter)
                .then(res => {
                    console.log(res)
                    setSuccess("Successfully Register")
                    setVoter(initialState)
            })
        } catch(error){
            // console.log(err)
            
            if(error.response.status === 409 ) 
            {
                // console.log(err.response.data)
                setError("User Already exist!")

            }else if(error.response.status === 408 ){
                setError("Password Doesn't Match!")
            } else {
                setError(error.message)
            }
           
        }   
        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 4000) 
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8800/station")
            .then(res => { setStations(res.data)})
            .catch(err => { setError(err.message)})
    }, []) 


return(
    <>
    <div className="flex flex-row h-screen">
        <div className="w-1/6">
                <Menu />
            </div>
        <div className="pl-2 pt-3 w-5/6">
            <div className="flex flex-col h-screen">
                <div className="h-16 w-full flex flex-col text-center bg-gray-950 text-white">
                    <h1 className='font-semibold text-base sm:text-2xl'>Register Now</h1>
                    <p className=''>National election board of ethiopia</p>
                </div>
                <div className="pl-10 pb-4 pt-2 sm:px-16 md:px-8 sm:py-8 overflow-scroll" >
                
                    {error && 
                    <div className="bg-red-300 text-red-900 text-base p-3 m-5 w-full">
                        {error}
                    </div>

                    }
                    {success && 
                    <div className="bg-emerald-200 text-emerald-900 text-base p-3 m-5 w-full">
                        {success}
                    </div>

                    }

                    <div 
                        className="grid grid-cols-1 text-left sm:text:center  sm:grid-cols-1 md:grid-cols-2">
                        <div className='space-y-2'>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">First Name <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    value={voter.fname}
                                    name='fname'
                                    required
                                    onChange={e => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Middle Name <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    value={voter.midname}
                                    name='midname'
                                    required
                                    onChange={e => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2 text-black pr-24'>
                                <label htmlFor="">Last Name <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    value={voter.lname}
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
                                    value={voter.phone}
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
                                    value={voter.email}
                                    name='email'
                                    onChange={e => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Station Name<span className='text-red-500 text-3xl'>*</span></label>
                                    <select     
                                        
                                        name="station" 
                                        required
                                        className="bg-slate-200"
                                        onChange={e => handleChange(e)}>
                                        <option value="0" ></option>
                                   { stations.length ? stations.map((station, index) => (
                                        <option 
                                            key={index}
                                            value={station.stationname}>
                                                {station.stationname}
                                        </option>
                                    )) : null}
                                    
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
                                    value={voter.dob}
                                    name="dob"
                                    required
                                    onChange={e => handleChange(e)}/>
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Username <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text" 
                                    value={voter.username}
                                    name="username"
                                    placeholder='Resident ID No.'
                                    onChange={e => handleChange(e)}/>
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Password <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="password"
                                    value={voter.password}
                                    name="password"
                                    required
                                    onChange={e => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Confirm Password <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-300 border-black p-1" 
                                    type="password" 
                                    value={voter.conpassword}
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
                            
                            <div className='flex flex-row text-center gap-1 sm:gap-3  text-black py-8 pl-3'>
                                <button 
                                    onClick={e => handleSubmit(e)}
                                    type="submit"
                                    className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                        SUBMIT
                                </button>
                                <button 
                                    onClick={(e) => setVoter(initialState)}
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