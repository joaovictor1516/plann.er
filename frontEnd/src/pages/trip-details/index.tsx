import { MapPin, Calendar, Plus, Settings2 } from "lucide-react";

export function TripDetailsPage(){
    
    return(
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <div className="flex items-center justify-between bg-zinc-900 px-4 h-16 rounded-xl shadow-shape">
                <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-zinc-400"/>
                    <span className="text-zinc-100">
                        Rio de Janeiro, Brasil
                    </span>
                </div>
                <div className="flex items-center gap-5">
                    <Calendar className="size-5 text-zinc-400"/>
                    <span className="text-zinc-100">
                        17 a 23 de Agosto
                    </span>
                    <div className="w-px h-6 bg-zinc-800"/>
                    <button className="bg-zinc-800 text-zinc-200 flex items-center gap-2 px-5 py-2 rounded-lg font-medium hover:bg-zinc-700">
                        Alterar local/data
                        <Settings2 className="size-5"/>
                    </button>
                </div>
            </div>

            <main className="flex gap-16 px-6">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">
                            Atividades
                        </h2>
                        <button className="bg-lime-300 text-lime-950 flex items-center gap-2 px-5 py-2 rounded-lg font-medium hover:bg-lime-400">
                            <Plus className="size-5"/>
                            Cadastrar atividade
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <div className="flex gap-2 items-baseline">
                                <span className="text-zinc-300 text-xl font-semibold">Dia 17</span>
                                <span className="text-zinc-500 text-xs">Sábado</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-80 space-y-6">

                </div>
            </main>
        </div>
    )
}