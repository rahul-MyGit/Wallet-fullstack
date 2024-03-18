import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";


export const Signup = ()=>{
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your  details to create an account."} />
        <InputBox placeholder="Rahul" label={"First Name"}/>
        <InputBox placeholder="Gujjar" label={"Last Name"}/>
        <InputBox placeholder="rahul@gmail.com" label={"Email"}/>
        <InputBox placeholder="12345" label={"Password"}/>
        <div className="pt-4">
          <Button label={"Submit"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />

      </div>
    </div>
  </div>
}

