import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "./components/Menu";
import { TiUserDelete } from 'react-icons/ti'

function ManageSingleParty() {

    const [ party, setParty ] = useState([])
    const { id } = useParams()

    const handleDelete = () => {
        if(window.confirm("Are you sure deleting this station!")){

        }
    }
    useEffect(() => {
        axios.get("http://localhost:8800/party/"+id)
            .then(response => {
                console.log(response.data[0])
                setParty(response.data[0])
            })
            .catch(error => {
                console.log(error.message)
            })
    }, [id])

return ( 
<>
<div className="flex flex-row">
    <div className="w-1/6">
        <Menu />
    </div>
    <div className="pl-5 pt-3 w-5/6">
        <div className="font-bold text-5xl text-sky-500 my-5 text-center">
            {party.partyname}
        </div>
        <hr />
        <div className="flex">
            <div className="w-80 h-64 hover:bg-slate-900 m-3">
                <img src={party.logo} alt=""  />
            </div>
            <div className="ml-5 mt-10">
                <div className="flex flex-col space-y-3">
                    <p  className="text-4xl font-serif">{party.repname}</p>
                    <h1 className="font-mono">{party.slogan}</h1>
                </div>
            </div>
        </div>
        <div className="text-3xl font-semibold">
            <h1>Participate in:</h1>
            <ul className="ml-10 mt-3 font-normal text-base ">
                <li className="flex justify-between w-64 border-2 pl-5 p-1" >
                    <div>{party.station}</div>
                    <div onClick={() => handleDelete()}
                        className="rounded-3xl px-3 py-1 text-white font-bold bg- bg-red-800 hover:bg-red-500 cursor-pointer"  >
                        <TiUserDelete className="text-2xl" />
                    </div>
                </li>
                <li className="flex justify-between w-64 border-2 pl-5 p-1" >
                    <div>{party.station}</div>
                    <div onClick={() => handleDelete()}
                        className="rounded-3xl px-3 py-1 text-white font-bold bg- bg-red-800 hover:bg-red-500 cursor-pointer"  >
                        <TiUserDelete className="text-2xl" />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</> 
)
}

export default ManageSingleParty;