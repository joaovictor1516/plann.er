import { FormEvent, useState, useEffect } from "react";
import { Activity, Trip } from "../../lib/interfaces";
import { Button } from "../../components/button";
import { Calendar, Tag, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface UpdateActivityModal{
    closeUpdateModal: () => void;
    activityId: string;
}

export function UpdateActivityModal(props: Readonly<UpdateActivityModal>){
    const [tripDetails, setTripDetails] = useState<Trip>();
    const [activity, setActivity] = useState<Activity>();

    const {tripId} = useParams();

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

    async function tackeTripDetails(tripId: string){
        try{
            await api.get(`trips/${tripId}/details`)
            .then((response) => {
                setTripDetails(response.data.trip);
            })
            .catch((error) => {
                console.error(error);
            })
        }
        catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        tripId && tackeTripDetails(tripId);
        tackeActivity(props.activityId);
    }, [props.activityId, tripId]);

    return (
        <main className="">
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                <div className="flex flex-col items-center bg-zinc-950 w-[540px] rounded-xl text-zinc-400 px-6 py-5">
                    <div className="w-full flex items-center justify-between">
                        <h2 className="text-zinc-50 text-lg font-semibold">
                            Atulização das atividades
                        </h2>
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
                                    {tripDetails?.starts_at && tripDetails?.ends_at && activity?.occurs_at ? (
                                        <input type="datetime-local"
                                            name="occursAtInput"
                                            id="occursAtInput"
                                            className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                                            data-min={tripDetails.starts_at}
                                            data-max={tripDetails.ends_at}
                                            placeholder={activity.occurs_at.toString()}/>
                                        ) : (
                                        <input type="datetime-local"
                                        name="occursAtInput"
                                        id="occursAtInput"
                                        className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"/>
                                    )}
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