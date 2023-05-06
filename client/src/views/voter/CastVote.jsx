import axios from 'axios'
import {  useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/authContext'
import useFetch from '../../hooks/useFetch'


export default function CastVote(){
    // const inputRef = useRef();
    //  inputRef.current.value=""
    const { user, dispatch } = useContext(AuthContext)
    const { station } = user

    const { data,  error } = useFetch("http://localhost:8800/voter");
    const { id } = data._id
    
    const [ candidates, setCandidates ] = useState([])
    const [ vote, setVote ] = useState({
        voterId: '',
        stationname: '',
        partyname: ''
        
    })
    
    const navigate = useNavigate()
    // const { station } = useParams()
    
    const logout = () => {
        dispatch({ type: "LOGOUT" })
    }
    
    const giveVote = (party) => {

        setVote({...vote, voterId: id})

        console.log(party)
        setVote({...vote, partyname: party})
        
        //console.log(currentUser?._id, "ID")//
        console.log(station, "station")
        console.log(party, "party")
        
        
        
        console.log(vote, "data")
        
        // Submit votes
        axios.post("http://localhost:8800/vote/submitVote", vote)
        .then((res) => {
            console.log(res.data)
            navigate('/voter/confirmation') 
            // logout()

        }).catch(error => {
            
            // if(error.response.status === 409 ){
            //     setError("Invalid for Second time!")
            // } else if(error.response.status === 400 ){
            //     setError("Bad Request")
            // } else if(error.response.status === 401 ){
            //     setError("You are not Authenticated")
            // } else if(error.response.status === 403 ){
            //     setError("Token is not valid")
            // } else{
            //     setError(error.message)
            // }
            setTimeout(() => {
                // navigate("/")
                // logout()
                // setError(false)
            }, 2000)
        })
        
    }
    
    useEffect(() => {
        // Get This station Candidates
        axios.get("http://localhost:8800/vote/candidates/"+station)
        .then(response => {
            // console.log(response.data) 
            setCandidates(response.data)
        })
        .catch(error => {
            // setError(error.message)
            console.log(error.message)
        })
        
        // setVote({...vote, voterId: currentUser._id, stationname: station})
        
    }, [station])
    

    return(
        <>
    <div className="h-screen w-screen overflow-y-auto px-12">
        <h1 className="text-center text-sky-300 text-5xl font-sans m-8">Cast Your vote</h1>
        <button onClick={(e) => {
            navigate('/')
            logout()
        }}
            >
                logout
        </button>
        <hr />
        <div className="w-3/4 h-80  py-5 text-center">
            <table className="table w-3/4 mx-2 p-1 border-collapse border border-slate-900 text-left">
                <thead>
                    <tr className="border text-white bg-slate-900">
                        <th scope="col" className="p-3">#</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Party</th>
                        <th scope="col">Candidate Name</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                
                <tbody>
                    {candidates.length ? candidates.map((candidates, index) => (
                    <tr className="border" key={index}>
                        <td className="p-3 ">{index + 1}</td>
                        <td className="font-mono py-1">
                            <img 
                                className='w-12 h-12 rounded-full'
                                src="" alt="" />
                        </td>
                        <td className="font-extrabold">{candidates.partyname}</td>
                        <td>{candidates.repname}</td>
                        <td className="flex text-base space-x-6 mt-2">
                                <div 
                                    onClick={() => {
                                        giveVote(candidates.partyname)
                                    }}
                                    className="rounded-3xl px-5 py-1 text-white font-bold bg-amber-600 hover:bg-amber-400 cursor-pointer">
                                        Vote
                                </div>
                            {/* </Link> */}
                        </td>
                    </tr>
                    )) : null}
                </tbody>
            </table>

            {error && 
            <div className="bg-red-300 text-red-900 text-1xl p-3 m-2 w-2/3">
                {error}
            </div>
            }
        </div>
    </div>
    </>
)}