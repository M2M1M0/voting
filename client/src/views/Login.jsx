import axios from "axios"
import { useContext,  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"


export default function Login() {
    
    const { user, loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const [ credentials, setCredentials ] = useState({
        username : "",
        password : ""
    })
    
    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.name] : e.target.value}) )
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
        dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post("http://localhost:8800/auth/login", credentials)
        console.log(res.data, "response")
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        if(user.userRole === "voter"){
            const station = user.station
            navigate(`/voter/castVote/${station}`)
            
        } else if(user.userRole === "administrator"){
            navigate("/admin")
        }
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
    }
    


    

    // if(error.response.status === 404 ) 
    // {
    //     // console.log(err.response.data)
    //     setError("User not found")

    // } else if(error.response.status === 400 ) {
    //     // console.log(error.response.status, "Bad request")
    //     setError("Wrong username or password")
    // } else if(error.response.status === 500 ) {
    //     // console.log(error.response.status, "Bad request")
    //     setError("Network Error")
    // } else {
    //     setError(error.message)
    // }
   
    return(
    <>
    <div className="h-screen w-screen sm:py-20 py-10 pl-16">
        <div className="w-3/4 sm:w-5/12 rounded-lg flex flex-col  bg-slate-800 space-y-6 pb-16 p-1">
            <h1 className="text-center text-4xl font-normal text-white py-3">
                National Election Board of Ethiopia
            </h1>
            { error && 
            <div className="text-base p-5 text-red-800 bg-red-300 w-full mr-2">
                {error}
            </div>
            }
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
                            onClick={(e) => handleSubmit(e)} 
                            disabled={loading}
                            className="px-8 py-2 rounded-2xl bg-white text-black hover:bg-slate-200">
                            {loading ? <>loading</> : <>Login</> }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
    )
}