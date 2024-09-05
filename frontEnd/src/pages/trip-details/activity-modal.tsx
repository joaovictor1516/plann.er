import { Plus, CircleCheck } from "lucide-react";
import { Button } from "../../components/button";
import { ActivityInformations } from "../../lib/interfaces";

interface ActivityModalType{
    openCreatyActivityModal: () => void;
    activityInformations: ActivityInformations[];
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
            {props.activityInformations?.map((information) => {
                return (
                    <div className="space-y-3">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-zinc-300 text-xl font-semibold">{information.date}</span>
                            <span className="text-zinc-500 text-xs">{information.dateDayWeek}</span>
                        </div>

                        {information.activities?.map((activity) => {
                            return activity.hasActivity ? (
                                <>
                                    <div className="flex justify-between items-center gap-3 h-10 px-4 rounded-xl bg-zinc-900 text-zinc-100 shadow-shape">
                                        <CircleCheck className="size-5 text-lime-300"/>
                                        <span className="flex-1">{activity.title}</span>
                                        <p className="text-zinc-400 text-sm">{activity.time}</p>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nesta data.</p>
                                </div> 
                            )
                        })}
                    </div>
                )
            })}
        </div>
    </div>)
}