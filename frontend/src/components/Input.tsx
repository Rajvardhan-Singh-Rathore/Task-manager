interface props {
    label:string,
    onChange:(e:any)=>void,
}

export  function Input({label,onChange}:props){
    return (
        <div>
            <span className="block mb-2 text-2xl font-medium text-zinc-100">{label}</span>
            <input onChange={(e)=>onChange(e)} type="text" placeholder="••••••••" className="w-full px-4 py-2 text-2xl outline-none bg-zinc-800 border border-zinc-700 rounded-lg block"/>
        </div>
)
}