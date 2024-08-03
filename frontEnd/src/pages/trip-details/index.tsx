import { MapPin, Calendar, Plus, Settings2 } from "lucide-react";

export function TripDetailsPage(){
    
    return(
        <div className="flex flex-col items-center justify-center bg-zinc-950 w-screen py-10 gap-8">
            <div className="flex gap-5 bg-zinc-900 w-[1100px] pl-6 pr-4 h-16 items-center justify-center rounded-xl">
                <div className="flex flex-1 items-center gap-2">
                        <MapPin className="size-5"/>
                        <input type="text" className="bg-transparent"/>
                </div>
                <div className="flex flex-1 items-center gap-2">
                        <Calendar className="size-5"/>
                        <input type="text" className="bg-transparent "/>
                </div>
                <button className="bg-zinc-800 text-zinc-200 flex justify-center text-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-zinc-700 w-56">
                    Alterar local/data
                    <Settings2 className="size-5"/>
                </button>
            </div>
            
            <div className="flex">
                <div className="flex flex-col self-start">
                    <div className="flex items-center justify-between w-max">
                        <span className="">Atividades</span>

                        <button className="bg-lime-300 text-lime-950 flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-medium">
                            <Plus className="size-5"/>
                            Cadastrar atividade
                        </button>
                    </div>
                    <div className="">

                    </div>
                </div>
                <div className="">

                </div>
            </div>
        </div>
    )
}