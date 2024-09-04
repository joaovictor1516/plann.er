import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useState } from "react";

interface LocalDateModalType{
    changeDateTime: () => void;
}

export function LocaleDateModal(props: Readonly<LocalDateModalType>){
    const [destination, setDestination] = useState<string>("");
    const [startsAt, setStartsAt] = useState<string>("");
    const [endsAt, setEndsAt] = useState<string>("");

    const options: object = {
                weekday: "long",
                month: "long",
                year: "numeric",
                day: "numeric"
            }
    
    function tackeDastinationAndDate(tripId: string): void{
        api.get(`http://localhost:3333/trips/${tripId}/details`)
        .then((response) => {
            const tripDetails = response.data.trip;

            setDestination(tripDetails.destination);
            setStartsAt(new Date(tripDetails.starts_at).toLocaleDateString("pt-BR", options));
            setEndsAt(new Date(tripDetails.ends_at).toLocaleDateString("pt-BR", options));
        })
        .catch((error) => {
            console.error(error);
        })
    }

   tackeDastinationAndDate("a698e129-04d4-48fd-a805-004be703ce60");
    return(
        <div className="space-x-4 bg-zinc-900">
            <div className="flex items-center justify-between bg-zinc-900 px-4 h-16 rounded-xl shadow-shape">
                <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-zinc-400"/>

                    <span className="text-zinc-100">
                        {destination}
                    </span>
                </div>
                
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <Calendar className="size-5 text-zinc-400"/>

                        <span className="text-zinc-100">
                            {startsAt} até {endsAt}
                        </span>
                    </div>

                    <div className="w-px h-6 bg-zinc-800"/>

                    <Button colors="secundary" size="default" onClick={props.changeDateTime}>
                        Alterar local/data
                        <Settings2 className="size-5"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}