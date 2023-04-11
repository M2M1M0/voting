import { Link } from "react-router-dom";
import Menu from "./components/Menu";

export default function SignupParty(){

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
                        <div className="grid grid-cols-1 text-left sm:text:center  sm:grid-cols-2">
                            <div className='space-y-4'>
                                <div className='flex flex-col gap-2  text-black pr-24'>
                                    <label htmlFor="">Party Name <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="bg-slate-200 border-black p-1" 
                                        type="text"
                                        name='partyName'
                                        value={''}
                                        onChange={''} />
                                </div>
                                <div className='flex flex-col gap-2  text-black pr-24'>
                                    <label htmlFor="">Representative Name <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="bg-slate-200 border-black p-1" 
                                        type="text"
                                        name='repName'
                                        value={''}
                                        onChange={''} />
                                </div>
                                
                                <div className='flex flex-col gap-2  text-black pr-24'>
                                    <label htmlFor="">Logo <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="p-1" 
                                        type="file" 
                                        name='logo'
                                        value={''}
                                        onChange={''} />
                                </div>
                               
                            </div>
                            <div className='space-y-4'>
                                <div className='flex flex-col gap-2 text-black pr-24'>
                                    <label htmlFor="">Description/ Slogan </label>
                                    <textarea 
                                        className="p-1 bg-slate-200"
                                        name='description'
                                        value={''}
                                        onChange={''}  > 
                                    </textarea> 
                                </div>
                                <div className='flex flex-col gap-2  text-black pr-24'>
                                    <label htmlFor="">Station Name<span className='text-red-500 text-3xl'>*</span></label>
                                        <select name="station" id="" className="bg-slate-200">
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
                                
                                
                                <div className='flex flex-row text-center gap-1 sm:gap-3  text-black  py-5'>
                                    <button className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                        <Link to={'/'}>
                                            SUBMIT
                                        </Link>
                                    </button>
                                    <button className='px-5 py-1 rounded-l rounded-r'>
                                        <Link to={'/'}>
                                            RESET
                                        </Link>
                                    </button>
                                    <button className='px-5 py-1 rounded-l rounded-r-3xl bg-slate-400 hover:bg-slate-500'>
                                        <Link to={'/superAdmin'}>
                                            CANCEL
                                        </Link>
                                    </button>
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