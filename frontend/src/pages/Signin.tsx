import { useState } from "react"
import { Input } from "../components/Input"
import { Button } from "../components/Button";
import axios from "axios";

function Signin() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [warning,setWarning] = useState("")

  const BACKEND_URL="http://localhost:3000"
  const handleEmailChange = (e:any)=>{
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e:any)=>{
    setPassword(e.target.value);
  }
  const handleSignup = async ()=>{
    let response;
    try{response = await axios.post(`${BACKEND_URL}/user/signin`,{
        "email":email,
        "password":password
    })
        localStorage.setItem('token',response.data.token);
    }catch(e:any){setWarning(e?.response.data.message)}
  }
  return (
    <div className="w-full h-[90%] flex items-center justify-center">
        <div className="shadow-2xl shadow-black border border-zinc-700 p-4 w-1/2 h-[60%] bg-zinc-900 rounded-lg text-zinc-200 flex flex-col gap-4">
          {warning && <div className="self-center text-red-500">{warning}</div>}
          <Input {...({ onChange: handleEmailChange, label: "Email" } as any)} />
          <Input {...({ onChange: handlePasswordChange, label: "Password" } as any)} />
          <Button {...({label:"Signin",handleClick:handleSignup})}></Button>
        </div>
    </div>
  )
}

export default Signin