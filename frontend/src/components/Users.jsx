import { useEffect, useState } from "react"
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = ()=>{
    const [state, setState] = useState([]);
    const [filter, setFilter] = useState("");


    // debouncing:
    useEffect(() => {
        // Fetch all values initially
        axios.get("http://localhost:3000/api/v1/user/bulk")
            .then(res => {
                setState(res.data.user);
            })
            .catch(err => {
                console.log("Error in fetching users data:", err);
            });
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (filter !== "") {
                axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
                    .then(res => {
                        setState(res.data.user);
                    })
                    .catch(err => {
                        console.log("Error in fetching users data:", err);
                    });
            } else {
                // If filter is empty, fetch all values again
                axios.get("http://localhost:3000/api/v1/user/bulk")
                    .then(res => {
                        setState(res.data.user);
                    })
                    .catch(err => {
                        console.log("Error in fetching users data:", err);
                    });
            }
        }, 500); // Adjust the debounce timeout as needed (e.g., 500 milliseconds)

        return () => clearTimeout(delayDebounce);
    }, [filter]);

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
    const navigate = useNavigate();
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
            <Button onClick={()=>{
                // history.pushState("/send?id=" + user._id + "&name=" + user.firstName);
                navigate("/send?id=" + user._id + "&name=" + user.firstName); 
            }} label ={"Send Money"} />
        </div>
    </div> 
}