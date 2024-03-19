import { useEffect, useState } from "react"
import axios from "axios";
import { capitalize } from "lodash";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Appbar = ()=> {

  const [firstName, setFirstName] = useState("");
  const [id, setId] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const rest = async()=>{
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/v1/user", {
          headers: {authorization: `Bearer ${token}`}
        });
        setFirstName(res.data.firstName);
        setId(res.data.id);

      } catch (err) {
        alert(err.res.data.message)
        console.log(err.res.data);
      }
    }
    rest();
  },[])



  return <div className="shadow h-14 flex justify-between">
    <div className="flex flex-col justify-center h-full ml-4">
        Wallet App
    </div>

    <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 mt-1">
                <Button onClick={()=>{
                    navigate("/ledger?id="+id)
                }} label={"History"}/>
            </div>

        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {capitalize(firstName[0])}
          </div>
        </div>
    </div>
  </div>
}
