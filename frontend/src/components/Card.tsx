interface props{
    title:string,
    onOpenClick:(id:string)=>void,
    onUpdateClick:(id:string)=>void,
    onDeleteClick:(id:string)=>void,
    id:string
}
export function Card({title,onOpenClick,onUpdateClick,onDeleteClick,id}:props){
    return (
        <div className="w-50 h-50 bg-zinc-900 p-2 rounded-lg">
            <div className="p-2 w-full h-full bg-zinc-950 rounded-lg flex flex-col justify-between">
                <div className="title">{title}</div>
                <div className="flex flex-col gap-1 ">
                <div className="flex gap-2 ">
                    <button className="w-full px-3 py-1 bg-blue-600 rounded-lg" onClick={()=>onUpdateClick(id)}>update</button>
                    <button className="w-full px-3 py-1 bg-green-500 rounded-lg" onClick={()=>onOpenClick(id)}>open</button>
                </div>
                <button className="w-full px-3 py-1 bg-red-500 rounded-lg" onClick={()=>onDeleteClick(id)}>delete</button>
                </div>
            </div>
        </div>
    )
}