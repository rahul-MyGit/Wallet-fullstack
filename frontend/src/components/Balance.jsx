import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = ()=>{
    const [value, setValue] = useState(0);
    useEffect(()=>{
        const getBalance = async ()=>{
            try{
                const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers: { authorization : `Bearer ${token}`}
            });

            setValue(res.data.balance);
        }catch (err) {
            alert(err.response.data.message)
            console.error('Server responded with an error status:', err.response.status);
            console.error('Error data:', err.response.data);
        }
    };  

    getBalance();

    }, [])

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance:
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}