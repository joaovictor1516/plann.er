import { FormEvent, useState, useEffect } from "react";
import { Button } from "../../components/button";
import { Calendar, Tag, X } from "lucide-react";
import { Activity } from "../../lib/interfaces";
import { api } from "../../lib/axios";

interface UpdateActivityModal{
    closeUpdateModal: () => void;
    activityId: string;
}

export function UpdateActivityModal(props: UpdateActivityModal){
    const [activity, setActivity] = useState<Activity>();

    async function updateActivity(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const title = data.get("titleInput");
        const occurs_at = data.get("occursAtInput");

        if(title && occurs_at){
            await api.put(`/activities/:${props.activityId}/update`, {
                title,
                occurs_at
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    async function tackeActivity(activityId: string){
        await api.get(`/activities/${activityId}`)
        .then((response) => {
            setActivity(response.data.activity);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        tackeActivity(props.activityId);
    }, [props.activityId]);

    return (
        <main className="">
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                <div className="flex flex-col items-center bg-zinc-950 w-[540px] rounded-xl text-zinc-400 px-6 py-5">
                    <div className="w-full flex items-center justify-between">
                        <span className="">Atulização das atividades</span>
                        <Button colors="secundary" size="default" onClick={props.closeUpdateModal}>
                            <X className="size-5"/>
                        </Button>
                    </div>

                    <form onSubmit={updateActivity} className="space-y-3 w-full">
                        <div className="flex flex-col items-center gap-2 w-full">
                            <div className="flex items-center gap-2 w-full h-14 bg-zinc-950 px-3 py-2 rounded-lg">
                                <Tag className="size-5 text-zinc-400"/>
                
                                <input type="text"
                                    name="titleInput"
                                    id="titleInput"
                                    className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                                    placeholder={activity?.title}/>
                            </div>
                            <div className="flex items-center gap-2 w-full">
                                <div className="bg-zinc-950 flex flex-1 items-center h-14 py-4 px-2.5 gap-2.5 rounded-lg">
                                    <Calendar className="size-5 text-zinc-400"/>
                                    <input type="datetime-local"
                                        name="occursAtInput"
                                        id="occursAtInput"
                                        className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                                        placeholder={activity?.occurs_at.toString()}/>
                                </div>
                            </div>
                        </div>
                        <Button type="submit" color="primary" size="full">
                            Atualizar
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    )
}