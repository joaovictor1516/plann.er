import { MapPin, Calendar, Settings2, ArrowRight } from "lucide-react";
import { Button } from "../../../components/button";
import { ChangeEvent } from "react";

interface DestinationAndDateType{
    isGuestsInputOpen: boolean;
    handleLocation: (element: ChangeEvent<HTMLInputElement>) => void;
    handleDate: (element: ChangeEvent<HTMLInputElement>) => void;
    closeGuestInput: () => void;
    openGuestsInput: () => void;
}

export function DestinationAndDateStep(props: Readonly<DestinationAndDateType>){
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
          <Button onClick={props.closeGuestInput} colors="secundary" size="default">
            <div className="w-36">Alterar local/data</div>
            <Settings2 className="size-5"/>
          </Button>
        ):(
          <Button onClick={props.openGuestsInput} colors="primary" size="default">
            Continuar
            <ArrowRight className="size-5"/>
          </Button>
        )}
    </div>
  )
}