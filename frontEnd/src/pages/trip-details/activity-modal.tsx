import { Plus, CircleCheck, CircleDashed, Trash } from "lucide-react";
import { Button } from "../../components/button";
import { ActivityInformations } from "../../lib/interfaces";

interface ActivityModalType{
    openCreatyActivityModal: () => void;
    deleteActivity: (activityId: string) => void;
    completeActivity: (activityId: string) => void;
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
            {props.activityInformations?.map((information, index) => {
                return (
                    <div key={index} className="space-y-3">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-zinc-300 text-xl font-semibold">{information.date}</span>
                            <span className="text-zinc-500 text-xs">{information.dateDayWeek}</span>
                        </div>

                        {information.activities ? (
                                information.activities.map((activity) => {
                                    return (
                                        <div key={activity.id} className="flex justify-between items-center gap-3 h-12 px-4 rounded-xl bg-zinc-900 text-zinc-100 shadow-shape">
                                            {activity.is_complited ? (
                                                <CircleCheck className="size-5 text-lime-300"/>
                                            ) : (
                                                <div>
                                                <CircleDashed className="size-5 text-zinc-400"/>
                                                <p>{activity.is_complited}</p>
                                                </div>
                                            )}
                                            <span className="flex-1">{activity.title}</span>
                                            <p className="text-zinc-400 text-sm">{activity.occurs_at}</p>
                                            <Button colors="primary" size="default" onClick={() => props.completeActivity(activity.id)}>
                                                Completar tarefa
                                            </Button>
                                            <Button colors="primary" size="default" onClick={() => props.deleteActivity(activity.id)}>
                                                <Trash className="size-5"/>
                                                Deletar
                                            </Button>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nesta data.</p>
                                </div> 
                            )
                        }
                    </div>
                )
            })}
        </div>
    </div>)
}