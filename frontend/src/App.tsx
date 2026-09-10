import { Navbar } from "./components/Navbar";
import { Routes,Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Task from "./pages/Task";
import Update from "./pages/Update";
import Create from "./pages/Create";
export default function App(){
  return (
  <div className="p-6 w-full h-screen bg-zinc-950 text-white">
    <Navbar></Navbar>
    <Routes>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/signin" element={<Signin></Signin>}></Route>
      <Route path="/update/:id" element={<Update/>}></Route>
      <Route path="/task/:id" element={<Task/>}></Route>
      <Route path="/create" element={<Create/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
  </div>)
}