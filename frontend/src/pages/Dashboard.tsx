import axios from "axios";
import { useEffect, useState } from "react"
import { Card } from "../components/Card";
import { useNavigate } from "react-router-dom";
import { SkullCard } from "../components/SkullCard";

function Dashboard() {
  const navigate = useNavigate();
  const [tasks,setTasks] = useState<any[]>([]);
  const [warning,setWarning] = useState<string>('');
  const BACKEND_URL = 'https://task-manager-5jg0.onrender.com'
  let flag:string= "notLoading";
  const onOpenClick = function(id:string){
    navigate(`/task/${id}`);
  }
  const onUpdateClick = function(id:string){
    navigate(`/update/${id}`);
  }
  const onDeleteClick = async function(id:string){
    try{
      const response = await axios.delete(`${BACKEND_URL}/task/delete/`+`${id}`,
        {headers:{
          Authorization:localStorage.getItem('token')
        } }
      )
      setTasks((prevTasks)=>prevTasks.filter((task)=>task.id!=response.data.deletedTask.id))
    }catch(e:any){setWarning(e.response.data.message)}
  }
  // const updateTask = function(updatedTask:any){
  //   setTasks((prevTasks)=>prevTasks.map((task:any)=>task.id===updatedTask.id?updatedTask:task))
  // }
  useEffect(()=>{
    flag="Loading";
    async function getTask(){
      try{const response = await axios.get(`${BACKEND_URL}/task`,{
        headers:{
          Authorization:localStorage.getItem('token')
        }
      })
      console.log(response.data.tasks);
      setTasks(response.data.tasks);}
      catch(e:any){setWarning(e.response.data.message)}
    }
    getTask();
  },[])
  if(tasks.length===0 && flag=="Loading"){return (
    <>
    <SkullCard></SkullCard>
    </>
  )}
  return (
    <div className="w-full h-[88%] flex gap-3 p-3 mt-4">
      {warning && <div className="text-zinc-500 text-2xl self-center ml-[33%]">{warning}</div>}
      {tasks.map((el:any)=><Card {...({onOpenClick:onOpenClick,title:el.title,id:el.id,onUpdateClick:onUpdateClick,onDeleteClick:onDeleteClick})}></Card>)}
    </div>
  )
}

export default Dashboard