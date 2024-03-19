import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Signup} from "./pages/Signup";
import {Signin} from "./pages/Signin";
import {SendMoney} from "./pages/SendMoney"
import {Dashboard} from "./pages/Dashboard"
import { Ledger } from "./pages/Ledger";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/ledger" element={<Ledger />} />


      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
