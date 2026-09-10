import { useState } from "react"
import { Input } from "../components/Input"
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [warning,setWarning] = useState("")
  const navigate = useNavigate();
  const BACKEND_URL="https://task-manager-5jg0.onrender.com"
  const handleEmailChange = (e:any)=>{
    setTitle(e.target.value);
    console.log(e.target.value,typeof(e.target.value))
  }
  const handlePasswordChange = (e:any)=>{
    setDescription(e.target.value);
  }
  const handleSignup = async ()=>{
    try{await axios.post(`${BACKEND_URL}/task`,{
        title,description
    },{
      headers:{Authorization:localStorage.getItem('token')}
    });navigate('/dashboard');
    }catch(e:any){setWarning(e?.response.data.message)}
  }
  return (
    <div className="w-full h-[90%] flex items-center justify-center">
        <div className="shadow-2xl shadow-black border border-zinc-700 p-4 w-1/2 h-[60%] bg-zinc-900 rounded-lg text-zinc-200 flex flex-col gap-4">
          {warning && <div className="self-center text-red-500">{warning}</div>}
          <Input {...({ onChange: handleEmailChange, label: "Title" } as any)} />
          <Input {...({ onChange: handlePasswordChange, label: "Description" } as any)} />
          <Button {...({label:"Create",handleClick:handleSignup})}></Button>
        </div>
    </div>
  )
}

export default Create