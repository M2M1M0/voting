import { useState } from "react"
import axios  from "axios"
import { Link } from "react-router-dom"

export default function Login() {

    const [ userAuth, setUserAuth ] = useState({
        username : "",
        passsword : ""
    })

    const handleChange = (e) => {
        setUserAuth((prev) => ({...prev, [e.target.name] : e.target.value}) )
    }

    const handleSubmit = async (e) => {
        console.log(userAuth)

        await axios.post("http://localhost:8800/login", userAuth)
                .then(response => console.log(response.data))
                .catch(error => console.log(error.message))
    }

    return(
    <>
    <div className="h-screen w-screen sm:py-20 py-10 pl-16">
        <div className="w-3/4 sm:w-5/12 rounded-lg flex flex-col  bg-slate-800 space-y-6 pb-16">
            <h1 className="text-center text-4xl font-normal text-white py-3">
                National Election Board of Ethiopia
            </h1>
            <form action="" className="text-white px-8">
                <div className="space-y-4 ">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="" className="text-white mx-3">Username</label>
                        <input 
                            className="text-black p-1 px-3 rounded border-sky-600 mx-2"
                            type="text"
                            name="username"
                            placeholder="Enter Username / Resident ID no." 
                            onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="" className="text-white mx-3">Password</label>
                        <input 
                            className="text-black p-1 px-3 border-none rounded border-sky-600 mx-2"
                            type="password"
                            name="password"
                            placeholder="Enter Password" 
                            onChange={handleChange}/>
                        <div className="text-sky-400 mx-3">
                            <Link to={'forgetPassword'}>
                                forget password?
                            </Link>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={handleSubmit} 
                            className="px-8 py-2 rounded-2xl bg-white text-black hover:bg-slate-200">
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>

    </div>
    </>
    )
}