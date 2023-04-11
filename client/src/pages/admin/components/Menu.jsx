import { Link } from 'react-router-dom'

export default function Menu(){

return(
    <>
    <div className="h-screen bg-cyan-900 text-white">
        <div className="flex flex-col">
            <img 
                className="h-12 w-full"
                src="" alt="" />
            <ul className="py-8 px-3 space-y-5">
                <li className="border-2 p-2 hover:bg-sky-600">
                    <Link to={'/admin'}>
                        <h1>Dashoard</h1>
                    </Link>
                </li>
                <li className="border-2 p-2 hover:bg-sky-600">
                    <Link to={'/admin/signup'}>
                        <h1>Add Voter</h1>
                    </Link>
                </li>
                <li className="border-2 p-2 hover:bg-sky-600">
                    <Link to={'/admin/manageVoter'}>   
                        <h1>Manage Voter</h1>
                    </Link>
                 </li>
                <li className="border-2 p-2 hover:bg-sky-600">
                    <Link to={'/admin/approval'}>
                        <h1>Activate/ Diactivate</h1>
                    </Link>
                </li>
                <li className="border-2 p-2 hover:bg-sky-600">      
                    <Link to={'/admin/report'}>                      
                        <h1>Report</h1>
                    </Link>
                </li>
                
            </ul>
        </div>
    </div>
    </>
)}