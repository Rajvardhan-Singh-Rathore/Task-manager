export function SkullTask(){
    return (
        <div className="w-full h-[90%] flex items-center justify-center animate-pulse">
        <div className="shadow-2xl shadow-black border border-zinc-700 p-4 w-1/2 h-[80%] bg-zinc-900 rounded-lg text-zinc-200 flex flex-col gap-4">
          <div className="shadow-2xl shadow-black border border-zinc-700 p-4 w-full h-[30%] bg-zinc-900 rounded-lg text-zinc-300 flex flex-col gap-4 animate-pulse">
            title loading...
          </div>
          <div className="shadow-2xl shadow-black border border-zinc-700 p-4 w-full h-[80%] bg-zinc-900 rounded-lg text-zinc-300 flex flex-col gap-4 animate-pulse">
            description loading...
          </div>
        </div>
        
    </div>
    )
}