import { Link,useLocation } from "react-router-dom"
import { Button } from "./Button";

export const Navbar = function(){
    const location:any = useLocation();
    const logOut = function(){
        localStorage.setItem('token','');
    }
    return (
        <div className = "shadow-xl border border-zinc-800 shadow-black px-4 py-4 w-1/2 ml-[26%] bg-zinc-900 text-zinc-100 rounded-full flex gap-4 items-center justify-around font-(--font-sora) text-xl">
            <Link to='/dashboard'><div className={`${location.pathname==="/dashboard"?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>Dashboard</div></Link>
            <Link to='/signup'><div className={`${location.pathname==="/signup"?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>Signup</div></Link>
            <Link to='/signin'><div className={`${location.pathname==="/signin"?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>SignIn</div></Link>
            <Link to='/create'><div className={`${location.pathname==="/create"?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>Create</div></Link>
            <Link to='/update'><div className={`${location.pathname.startsWith('/update')?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>Update</div></Link>
            <Link to='/task'><div className={`${location.pathname.startsWith('/task')?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>Task</div></Link>
            <Button {...({label:"LogOut",handleClick:logOut})}></Button>
        </div>
    )
}