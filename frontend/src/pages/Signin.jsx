import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";


export const Signin =  ()=> {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your creadentials to access your account"} />
        <InputBox onChange={e=>{setUsername(e.target.value)}} label={"Email"} placeholder="rahul@gmail.com"/>
        <InputBox onChange={e=>{setPassword(e.target.value)}} label={"Password"} placeholder="12345"/>
        <div className="pt-4">
          <Button onClick={async ()=>{
            const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
              username,
              password
            });
            localStorage.setItem("token", res.data.token);
            // localStorage.removeItem("token");
            console.log(res.data.id);
            navigate("/dashboard?id=" + res.data.id);
          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
      </div>
    </div>
  </div>
}