interface props{
    label:string,
    handleClick:()=>void;
}
export function Button({label,handleClick}:props){
    return (
        <div className = " w-1/4 self-center flex items-center justify-center px-3 py-2 border border-white bg-zinc-200 rounded-full font-semibold text-2xl text-zinc-800">
            <button onClick={()=>handleClick()}>{label}</button>
        </div>
    )
}