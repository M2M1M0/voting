import axios from 'axios'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function CastVote(){

    const [ candidates, setCandidates ] = useState([])
    const [ error, setError ] = useState(false)

    const [ vote, setVote ] = useState({
        username: "",
        partyname: "",
        stationname: ""

    })

    const { station } = useParams()

    const giveVote = async (party) => {
        setVote({...vote, partyname:  party})

        console.log(vote, "vote data")
        console.log(party, "party")

        try {
            // Submit votes
            axios.post("http://localhost:8800/vote/submitVote", vote)
            .then((res) => {
                console.log(res.data)
                // console.log("vote submitted")
            }).catch(error => {
                // console.log(error.name, "name")
                // console.log(error.code, "code")
                console.log(error.message, "message")
                setError(error.message)
            })
        }catch(err){
            console.log(err,  "error")
            if(err.status === 409 ){
                setError("Invalid for Second time!")
            }
            setError(error.message)
        }
        
            
    }

    useEffect(() => {
        // Get This station Candidates
        axios.get("http://localhost:8800/vote/candidates/"+station)
        .then(response => {
            // console.log(response.data) 
            setCandidates(response.data)
        })
        .catch(error => {
            setError(error.message)
            console.log(error.message)
        })

        setVote({...vote, username: "K-13/w-06/5632", stationname: station })

    }, [vote, station])

return(
    <>
    <div className="h-screen w-screen overflow-y-auto px-12">
        <h1 className="text-center text-sky-300 text-5xl font-sans m-8">Cast Your vote</h1>
        <hr />
        <div className="w-3/4 h-80 overflow-scroll py-5 text-center">
            <table className="table w-2/3 mx-2 p-1 border-collapse border border-slate-900 text-left">
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
                                src={candidates.logo} alt="" />
                        </td>
                        <td className="font-extrabold">{candidates.partyname}</td>
                        <td>{candidates.repname}</td>
                        <td className="flex text-base space-x-6 mt-2">
                            {/* <Link to={`/voter/confirmation`}> */}
                                <div 
                                    onClick={() => giveVote(candidates.partyname)}
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