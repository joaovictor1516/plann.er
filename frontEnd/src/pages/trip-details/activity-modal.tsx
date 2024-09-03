import { Plus, CircleCheck } from "lucide-react";
import { Button } from "../../components/button";

interface ActivityModalType{
    openCreatyActivityModal: () => void;
    takeActivities: (id: string) => void;
}

export function ActivityModal(props: Readonly<ActivityModalType>){
    return(<div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">
                Atividades
            </h2>

            <Button colors="primary" size="default" onClick={props.openCreatyActivityModal}>
                <Plus className="size-5"/>
                Cadastrar atividade
            </Button>
        </div>

        <div className="space-y-8">
            <div className="space-y-3">
                <div className="flex gap-2 items-baseline">
                    <span className="text-zinc-300 text-xl font-semibold">Dia 17</span>
                    <span className="text-zinc-500 text-xs">Sábado</span>
                </div>
                
                <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nesta data.</p>
            </div>

            <div className="space-y-3">
                <div className="flex gap-2 items-baseline">
                    <span className="text-zinc-300 text-xl font-semibold">Dia 18</span>
                    <span className="text-zinc-500 text-xs">Domingo</span>
                </div>

                <div className="flex justify-between items-center gap-3 h-10 px-4 rounded-xl bg-zinc-900 text-zinc-100 shadow-shape">
                    <CircleCheck className="size-5 text-lime-300"/>
                    <span className="flex-1">Corrida de Kart</span>
                    <p className="text-zinc-400 text-sm">14:00h</p>
                </div>

                <div className="flex justify-between items-center gap-3 h-10 px-4 rounded-xl bg-zinc-900 text-zinc-100 shadow-shape">
                    <CircleCheck className="size-5 text-lime-300"/>
                    <span className="flex-1">Jantar</span>
                    <p className="text-zinc-400 text-sm">21:00h</p>
                </div>
            </div>
        </div>
    </div>)
}