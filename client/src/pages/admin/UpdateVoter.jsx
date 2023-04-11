import { Link } from "react-router-dom";
import Menu from "./components/Menu";

export default function UpdateVoter(){

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
                    <p className=''>National election board of ethiopia</p>
                </div>
                <div className="px-3 pb-4 pt-2 sm:px-16 sm:py-8 overflow-scroll" >
                    <form action="">
                        <div className="text-2xl text-center pb-8">
                            <label htmlFor="">Username:  <span className='text-stone-500 text-3xl underline'>Micky@123</span></label>
                        </div>
                        <div className="grid grid-cols-1 text-left sm:text:center  sm:grid-cols-2">
                            <div className='space-y-4'>
                                <div className='flex flex-col gap-2 text-2xl text-black pr-24'>
                                    <label htmlFor="">First Name <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="bg-slate-300 border-black p-1" 
                                        type="text"
                                        name='fname'
                                        value={''}
                                        onChange={''} />
                                </div>
                                <div className='flex flex-col gap-2 text-2xl text-black pr-24'>
                                    <label htmlFor="">Middle Name <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="bg-slate-300 border-black p-1" 
                                        type="text"
                                        name='midname'
                                        value={''}
                                        onChange={''} />
                                </div>
                                <div className='flex flex-col gap-2 text-2xl text-black pr-24'>
                                    <label htmlFor="">Last Name <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="bg-slate-300 border-black p-1" 
                                        type="text"
                                        name='lname'
                                        value={''}
                                        onChange={''} />
                                </div>
                               
                            </div>
                            <div className='space-y-4'>
                                {/* <div className='flex flex-col gap-2 text-2xl text-black pr-24'>
                                    <label htmlFor="">Gender <span className='text-red-500 text-3xl'>*</span></label>
                                    <div className="space-x-0  sm:grid-cols-1">
                                        <div>
                                            <input type="radio" name="gender" /> Male
                                        </div>
                                        <div>
                                            <input type="radio" name="gender" /> Female
                                        </div>
                                        <div>
                                            <input type="radio" name="gender" /> others
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className='flex flex-col gap-2 text-2xl text-black pr-24'>
                                    <label htmlFor="">Date of Birth <span className='text-red-500 text-3xl'>*</span></label>
                                    <input className="bg-slate-300 border-black p-1" type="date" />
                                </div> */}
                                {/* <div className='flex flex-col gap-2 text-2xl text-black pr-24'>
                                    <label htmlFor="">Username <span className='text-red-500 text-3xl'>*</span></label>
                                    <input className="bg-slate-300 border-black p-1" type="text" placeholder='Resident ID No.'/>
                                </div> */}
                                {/* <div className='flex flex-col gap-2 text-2xl text-black pr-24'>
                                    <label htmlFor="">Password <span className='text-red-500 text-3xl'>*</span></label>
                                    <input className="bg-slate-300 border-black p-1" type="password" />
                                </div>
                                <div className='flex flex-col gap-2 text-2xl text-black pr-24'>
                                    <label htmlFor="">Confirm Password <span className='text-red-500 text-3xl'>*</span></label>
                                    <input className="bg-slate-300 border-black p-1" type="password" />
                                </div> */}
                                 <div className='flex flex-col gap-2 text-2xl text-black pr-24'>
                                    <label htmlFor="">Phone Number <span className='text-red-500 text-3xl'>*</span></label>
                                    <input 
                                        className="bg-slate-300 border-black p-1" 
                                        type="text" 
                                        placeholder='+251..'
                                        maxLength={10}
                                        minLength={10}
                                        name='phone'
                                        value={''}
                                        onChange={''} />
                                </div>
                                <div className='flex flex-col gap-2 text-2xl text-black pr-24'>
                                    <label htmlFor="">Email</label>
                                    <input 
                                        className="bg-slate-300 border-black p-1" 
                                        type="email" 
                                        placeholder='example@gmail.com'
                                        name='email'
                                        value={''}
                                        onChange={''} />
                                </div>
                                <div className='flex flex-col gap-2 text-2xl  text-black pr-24'>
                                    <label htmlFor="">Station Name<span className='text-red-500 text-3xl'>*</span></label>
                                        <select name="station" id="" className="bg-slate-300">
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
                                <div className='flex flex-col gap-2 text-2xl text-black pr-24'>
                                </div>
                                <div className='flex flex-row text-center gap-1 sm:gap-3 sm:text-2xl text-1xl text-black pr-24'>
                                    <button className='px-5 py-1 rounded-l-3xl rounded-r bg-green-700 hover:bg-green-600 text-white'>
                                        <Link to={'/superAdmin'}>
                                            UPDATE
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