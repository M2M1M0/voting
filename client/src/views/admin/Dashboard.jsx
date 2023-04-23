import { Link } from 'react-router-dom'
import Menu from './components/Menu'

export default function Dashboard(){

return(
    <>
    <div>
        <div className="flex flex-row">
            <div className="w-1/5">
                <Menu />
            </div>
            <div className="pl-2 pt-3 w-4/5">
                <div className="flex flex-col space-y-4">
                    <div className="font-semibold text-5xl text-sky-700">
                        <h1>Dashboard</h1>
                    </div>
                    <div className="flex flex-col bg-slate-900">
                        <div className="p-4 grid grid-cols-4 space-x-3 ">
                            <div className="pl-2 pt-3 flex flex-col bg-sky-500  hover:bg-sky-400  h-28">
                                <div>
                                    <h2>3</h2>
                                </div>
                                <div>
                                    <p>Voters</p>
                                </div>
                            </div>
                            <div className="pl-2 pt-3 flex flex-col bg-emerald-500 hover:bg-emerald-400">
                                <div>
                                    <h2>3</h2>
                                </div>
                                <div>
                                    <p>Voters</p>
                                </div>
                            </div>
                            <div className="pl-2 pt-3 flex flex-col bg-stone-500 hover:bg-stone-400">
                                <div>
                                    <h2>3</h2>
                                </div>
                                <div>
                                    <p>Voters</p>
                                </div>
                            </div>
                            <div className="pl-2 pt-3 flex flex-col bg-yellow-500 hover:bg-yellow-400">
                                <div>
                                    <h2>3</h2>
                                </div>
                                <div>
                                    <p>Voters</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <h1 className="text-white px-3 pb-2">logo</h1>
                        </div>
                    </div>
                    <div className="text-center ">
                        <div className="space-y-16 space-x-24">
                            <button className="px-3 py-2 rounded border-2 border-gray-400 hover:bg-gray-500 hover:text-white">
                                <Link to={'/admin/signupVoter'}>
                                    ADD VOTERS
                                </Link>        
                            </button>
                            <button className="px-3 py-2 rounded border-2 border-sky-400 hover:bg-sky-500 hover:text-white">
                                <Link to={'/admin/report'}>
                                    REPORT
                                </Link>
                            </button>
                        </div>
                    </div>
                    <div className="">
                        {/* <FOOTER /> */}
                    </div>
                </div>
            </div>
        </div>

    </div>
    </>
)}