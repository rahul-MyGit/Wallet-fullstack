import { useEffect, useState } from "react"
import { Button } from "../components/Button";
import axios from "axios";

export const Users = ()=>{
    const [state, setState] = useState([]);
    const [filter, setFilter] = useState("");


    // debouncing:
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then(res=>{
            setState(res.data.user)
        })
    },[filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Contacts
        </div>
        <div className="my-2">
            <input onChange={e=>{setFilter(e.target.value)}} type="text" placeholder="Search users ..." className="w-full px-2 py-1 border rounded border-slate-200"/>
        </div>
        <div>
            {state.map(user => <User user={user} />)}
        </div>
    </>
}


function User({user}){
    
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button label ={"Send Money"} />
        </div>
    </div> 
}