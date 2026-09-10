export function SkullCard(){
  const array = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,1,1]
    return (
      <div className="animate-pulse w-full h-[88%] flex flex-wrap overflow-scroll scrollbar-thumb-zinc-950 gap-3 mt-4 text-4xl">
        {array.map(()=><div role="status" className="p-5 flex flex-col gap-2 items-center justify-between h-50 w-50 rounded-lg bg-neutral-quaternary rounded-base bg-zinc-800">
          <div className="w-full flex flex-col gap-2 mb-2">
              <div className="animate-pulse h-3 w-full bg-zinc-900 rounded-full"></div>
              <div className="animate-pulse h-3 w-full bg-zinc-900 rounded-full"></div>
              <div className="animate-pulse h-3 w-full bg-zinc-900 rounded-full"></div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="w-full flex gap-2">
              <button className="animate-pulse w-1/2 px-2 py-1 bg-zinc-900 rounded-lg text-zinc-900" >up</button>
              <button className="animate-pulse w-1/2 px-3 py-1 bg-zinc-900 rounded-lg text-zinc-900" >de</button>
            </div>
            <button className="animate-pulse w-full px-3 py-1 bg-zinc-900 rounded-lg text-zinc-900" onClick={()=>{}}>delete</button>
          </div>
          <span className="sr-only">Loading...</span>
        </div>)}
      </div>
    )
}