import { useEffect, useState } from "react"
import Menu from "./components/Menu"
import axios from 'axios'
import { Link, useParams } from "react-router-dom"

function UpdateStation() {


    const [ station, setstation ] = useState([])
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const { id } = useParams()

    const handleChange = (e) => {
        setstation({...station, [e.target.name] : e.target.value})
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            // Update Admin Info
            await axios.put("http://localhost:8800/station/" + id, station)
                .then(() => {
                    setSuccess("Update Success")
            }).catch(err => setError(err.message))
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
        // Get A single Station
        axios.get("http://localhost:8800/station/"+id)
            .then(response => {
                setstation(response.data[0])
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })
    }, [id])


   
    return ( 
    <>
    <div className="flex flex-row h-screen">
        <div className="w-1/5">
            <Menu />
        </div>
        <div className="pl-2 w-4/5">
            <div className="flex flex-col h-screen">
                <div className="h-16 w-full flex flex-col text-center bg-gray-950 text-white">
                    <h1 className='font-semibold text-base sm:text-2xl'>Update Station</h1>
                    <p className=''>National Election Board of Ethiopia</p>
                </div>
                <div className="pl-10 pb-4 pt-2 sm:px-16 md:px-8 sm:py-8 overflow-scroll" >
                
                    <div className="text-center mb-8 text-2xl">
                    </div>
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
                    <hr />
                    <div className='space-y-4'>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Station Name </label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    name='stationname'
                                    required
                                    defaultValue={station.stationname}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Admin Username </label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    name='admin'
                                    required
                                    defaultValue={station.admin}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2 text-black pr-24'>
                                <label htmlFor="">Contact Number </label>
                                <input
                                    className="p-1 bg-slate-200"
                                    name='contact'
                                    minLength={10}
                                    maxLength={10}
                                    defaultValue={station.contact}
                                    onChange={(e) => handleChange(e)}  > 
                                </input> 
                            </div>
                        
                            
                        </div>
                        <div className='space-y-4'>
                            
                            
                           

                            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 text-center gap-1 sm:gap-3  text-black  py-5'>
                                <button 
                                    className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'
                                    onClick={e => handleSubmit(e)}>
                                    <Link >
                                        Update
                                    </Link>
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
            </div>
        </div>
    </div>
    </>
    )
}

export default UpdateStation