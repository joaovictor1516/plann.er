import { MapPin, Calendar, Settings2, ArrowRight } from "lucide-react";
import { ChangeEvent } from "react";

interface DestinationAndDateType{
    isGuestsInputOpen: boolean;
    handleLocation: (element: ChangeEvent<HTMLInputElement>) => void;
    handleDate: (element: ChangeEvent<HTMLInputElement>) => void;
    closeGuestInput: () => void;
    openGuestsInput: () => void;
}

export function DestinationAndDateStep(props: DestinationAndDateType){
    return(
        <div className="flex items-center bg-zinc-900 rounded-xl h-16 px-6 gap-3 shadow-shape">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-zinc-400"/>
              <input type="text"
                    name="locationInput"
                    id="locationInput"
                    disabled={props.isGuestsInputOpen}
                    className="bg-transparent placeholder-zinc-400 text-lg outline-none"
                    onChange={props.handleLocation}
                    placeholder="Para onde você vai?"/>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400"/>
              <input type="text"
                    name="dateInput"
                    id="dateInput"
                    disabled={props.isGuestsInputOpen}
                    className="bg-transparent placeholder-zinc-400 text-lg outline-none"
                    onChange={props.handleDate}
                    placeholder="Quando?"/>
            </div>
            <div className="w-px h-6 bg-zinc-800"/>
            {props.isGuestsInputOpen ? (
                <button className="bg-zinc-800 text-zinc-200 flex items-center text-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-zinc-700 w-56" onClick={props.closeGuestInput}>
                  Alterar local/data
                  <Settings2 className="size-5"/>
                </button>
              ):(
                <button className="bg-lime-300 text-lime-950 flex items-center text-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400" onClick={props.openGuestsInput}>
                  Continuar
                  <ArrowRight className="size-5"/>
                </button>
            )}
        </div>
    )
}