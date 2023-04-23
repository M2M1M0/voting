import { Link } from "react-router-dom";

export default function Menu(){

return(
    <>
    <div className="h-screen bg-emerald-700 text-white">
        <div className="flex flex-col">
            <img 
                className="h-12 w-full"
                src="" alt="" />
            <ul className="py-8 px-3 space-y-5">
                <li className="border-2 p-2 hover:bg-emerald-500">
                    <Link to={'/superAdmin'}>
                        <h1>Dashoard</h1>
                    </Link>
                </li>
                <li className="border-2 p-2 hover:bg-emerald-500">
                    <Link to={'/superAdmin/manageAdmins'}>   
                        <h1>Manage Admins</h1>
                    </Link>
                </li>
                <li className="border-2 p-2 hover:bg-emerald-500">
                    <Link to={'/superAdmin/manageParties'}>   
                        <h1>Manage Parties</h1>
                    </Link>
                </li>
                <li className="border-2 p-2 hover:bg-emerald-500">
                    <Link to={'/superAdmin/manageStations'}>   
                        <h1>Manage Stations</h1>
                    </Link>
                </li>
                <li className="border-2 p-2 hover:bg-emerald-500">
                    <Link to={'/superAdmin/approval'}>
                        <h1>Activate/ Diactivate</h1>
                    </Link>
                </li>
                <li className="border-2 p-2 hover:bg-emerald-500">      
                    <Link to={'/superAdmin/report'}>                      
                        <h1>Report</h1>
                    </Link>
                </li>
                
            </ul>
        </div>
    </div>
    </>
)}