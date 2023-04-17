import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import Menu from "./components/Menu";

export default function UpdateParty(){

    const [ party, setParty ] = useState([])
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const { id } = useParams()

    console.log(party,"before")
    const handleChange = (e) => {
        setParty({...party, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/updateParty/" + id, party)
                .then( () =>  setSuccess("Update Success"))
        } catch(err){
            console.log(err)
            setError(err.message)
        }    

    console.log(party,"after")

    }
    useEffect(() => {
        axios.get("http://localhost:8800/party/"+id)
            .then(response => {
                setParty(response.data[0])
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
                    <h1 className='font-semibold text-base sm:text-2xl'>Update Party</h1>
                    <p className=''>National Election Board of Ethiopia</p>
                </div>
                <div className="pl-10 pb-4 pt-2 sm:px-16 md:px-8 sm:py-8 overflow-scroll" >
                
                    <div className="text-center mb-8 text-2xl">
                        {/* <span className="p-3">Username: </span>  {admin.username} */}
                    </div>
                    <hr />
                    <div className='space-y-4'>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Party Name <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    name='partyname'
                                    required
                                    defaultValue={party.partyname}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Representative Name <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="bg-slate-200 border-black p-1" 
                                    type="text"
                                    name='repname'
                                    required
                                    defaultValue={party.repname}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Logo <span className='text-red-500 text-3xl'>*</span></label>
                                <input 
                                    className="p-1" 
                                    type="file" 
                                    name='logo'
                                    required
                                    defaultValue={party.logo}
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            
                        </div>
                        <div className='space-y-4'>
                            <div className='flex flex-col gap-2 text-black pr-24'>
                                <label htmlFor="">Description/ Slogan </label>
                                <textarea 
                                    className="p-1 bg-slate-200"
                                    name='slogan'
                                    defaultValue={party.slogan}
                                    onChange={(e) => handleChange(e)}  > 
                                </textarea> 
                            </div>
                            <div className='flex flex-col gap-2  text-black pr-24'>
                                <label htmlFor="">Station Name<span className='text-red-500 text-3xl'>*</span></label>
                                    <select 
                                        defaultValue={party.station}
                                        onChange={(e) => handleChange(e)}
                                        name="station" id="" 
                                        required
                                        className="bg-slate-200">
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
)}