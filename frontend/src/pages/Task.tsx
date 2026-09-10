import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { SkullTask } from "../components/SkullTask";

function Task({}) {
  const [warning,setWarning] = useState("")
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const BACKEND_URL = 'http://localhost:3000'
  const location = useLocation();
  useEffect(()=>{
    async function getTask(){
      try{
        const response = await axios.get(`${BACKEND_URL}`+`${location.pathname}`,{
          headers:{
            Authorization:localStorage.getItem('token')
          }
        })
        setTitle(response.data.foundTask.title);
        setDescription(response.data.foundTask.description);
      }catch(e:any){setWarning(e.response.data.message)}
    }
    getTask();
  },[])
  if(location.pathname==='/task/:id'){return <div className="w-full h-[90%] flex items-center justify-center text-2xl">This is individual task page</div>}
  if(!title){return <SkullTask></SkullTask>}
  return (
    <div className="w-full h-[90%] flex items-center justify-center">
        <div className="shadow-2xl shadow-black border border-zinc-700 p-4 w-1/2 h-[80%] bg-zinc-900 rounded-lg text-zinc-200 flex flex-col gap-4">
          {warning && <div className="text-red-500 self-center">{warning}</div>}
          <div className="shadow-2xl shadow-black border border-zinc-700 p-4 w-full h-[30%] bg-zinc-900 rounded-lg text-zinc-200 flex flex-col gap-4">
          {title}
          </div>
          <div className="shadow-2xl shadow-black border border-zinc-700 p-4 w-full h-[80%] bg-zinc-900 rounded-lg text-zinc-200 flex flex-col gap-4">
          {description}
          </div>
        </div>
        
    </div>
  )
}

export default Task