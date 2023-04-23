import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "./components/Menu";
import { TiUserDelete } from 'react-icons/ti'

function ManageSingleParty() {

    const [ party, setParty ] = useState([])
    const [ stations, setStations ] = useState([])
    const [ addStationtoParty, setaddStationtoParty ] = useState([])
    const [ participateIn, setParticipateIn ] = useState([])

    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const { id } = useParams()

    const stationChange = (e) => {
        const { name, value } = e.target
        setaddStationtoParty({...addStationtoParty, partyname:party.partyname, [name] : value})
        
    }


    
    const addStation = e => {
        e.preventDefault()
        // Add party participate station 
        axios.post("http://localhost:8800/participateIn/signup", addStationtoParty)
            .then(() => setSuccess("Station Added"))
            .catch(err => setError(err.message))
            
        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 3000)
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure deleting this station!")){
            // Delete party participate station
            axios.delete(`http://localhost:8800/participateIn/${id}`)
                .then((res) => {
                    console.log(res.data)
                    setParticipateIn(res.data)
                })
                .catch(err => setError(err.message) )
        }
        setTimeout(() => {
            setError(false)
        }, 3000)
    }
    
    useEffect(() => {
        // Get a single party Info
        axios.get("http://localhost:8800/party/"+id)
            .then(response => {
                setParty(response.data[0])
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })

        // Get All Stations Info
        axios.get("http://localhost:8800/station")
            .then(res => { setStations(res.data)})
            .catch(err => { setError(err.message)})

        // Get Party Participate stations
        axios.get(`http://localhost:8800/participateIn/${party.partyname}`)
            .then(res => setParticipateIn(res.data))
            .catch(err => { setError(err.message)})

        
    })

return ( 
<>
<div className="flex flex-row">
    <div className="w-1/6">
        <Menu />
    </div>
    <div className="pl-5 pt-3 w-5/6">
        <div className="font-semibold text-6xl text-sky-500 my-5 text-center">
            {party.partyname}
        </div>
        <hr />
        { error && 
        <div className="bg-red-300 text-red-900 text-base p-3">
            {error}
        </div>
        }

        <div className="flex">
            <div className="w-80 h-64 hover:bg-slate-900 m-3">
                <img src={party.logo} alt="something wrong!"  />
            </div>
            <div className="ml-5 mt-10">
                <div className="flex flex-col space-y-3">
                    <p  className="text-5xl font-serif">{party.repname}</p>
                    <h1 className="font-mono text-base">{party.slogan}</h1>
                </div>
            </div>
        </div>
        <div className="flex justify-between pr-60">
            <div className="text-3xl font-semibold">
                <h1>Participate in:</h1>
                { participateIn.length ? participateIn.map((stationname, index) => (
                <ul className="ml-6 font-normal text-base" key={index}>

                    <li className="flex justify-between w-64 border-2 pl-5 p-1" >
                        <div>{stationname.stationname}</div>
                        <div onClick={() => handleDelete(stationname._id)}
                            className="rounded-3xl px-3 py-1 text-white font-bold bg- bg-red-800 hover:bg-red-500 cursor-pointer"  >
                            <TiUserDelete className="text-2xl" />
                        </div>
                    </li>
                    
                </ul>
                )) : null}
            </div>
            <div className="flex flex-col w-64 space-y-3">
            { success && 
            <div className="bg-emerald-300 text-emerald-900 text-base p-3">
                {success}
            </div>
            }
                <label htmlFor="">Add Stations</label>
                <select     
                    defaultValue={stations.stationname}
                    name="stationname" 
                    required
                    className="bg-slate-200"
                    onChange={e => stationChange(e)}
                    >
                    <option value="0" ></option>
                { stations && stations.map((station, index) => (
                    <option 
                        key={index}
                        value={station.stationname}>
                            {station.stationname}
                    </option>
                    
                 ))}
                
                </select>
               
                <button 
                    onClick={e => addStation(e)}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-400 text-white">ADD</button>
            </div>
            
        </div>
    </div>
</div>
</> 
)
}

export default ManageSingleParty;