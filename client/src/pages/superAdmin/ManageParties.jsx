import Menu from "./components/Menu";

export default function ManageParties(){

return(
    <>
    <div className="flex flex-row">
        <div className="w-1/6">
            <Menu />
        </div>
        <div className="pl-2 pt-3 w-5/6">
            <div className="flex flex-col space-y-5">
                <div className="font-semibold text-5xl text-sky-700">
                    <h1>Manage Parties</h1>
                </div>
                <div className="flex flex-row space-x-0">
                    <input
                        className="border-2 p-2 pl-5 rounded-l-3xl border-purple-400 bg-slate-100 w-4/5" 
                        type="text" 
                        placeholder="Search by Username/Phone"/>
                    <button className="p-3 pr-8 text-center border-neutral-600 bg-slate-300 text-lg font-mono rounded-r-3xl">
                        Search
                    </button>                   
                </div>
                <div className="flex flex-col bg-slate-900">
                    <div className="p-4  space-x-3 ">
                        <div className="pl-2 pt-3 flex flex-col bg-sky-500  hover:bg-sky-400  h-28">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
)}