import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { Button } from "../../../components/button";
import { ChangeEvent, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ptBR } from "date-fns/locale"

interface DestinationAndDateType{
    isGuestsInputOpen: boolean;
    handleLocation: (element: ChangeEvent<HTMLInputElement>) => void;
    handleDate: (element: ChangeEvent<HTMLInputElement>) => void;
    closeGuestInput: () => void;
    openGuestsInput: () => void;
}

export function DestinationAndDateStep(props: Readonly<DestinationAndDateType>){
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);

  function openDateModal(){
    return setIsDateModalOpen(true);
  }

  function closeDateModal(){
    return setIsDateModalOpen(false);
  }

  return(
    <div className="flex items-center justify-center bg-zinc-900 rounded-xl h-16 px-4 gap-3 shadow-shape">
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="size-5 text-zinc-400"/>
          <input type="text"
                name="locationInput"
                id="locationInput"
                disabled={props.isGuestsInputOpen}
                className="bg-transparent placeholder-zinc-400 text-lg outline-none flex-1"
                onChange={props.handleLocation}
                placeholder="Para onde você vai?"/>
        </div>

        <button onClick={openDateModal} 
            disabled={props.isGuestsInputOpen} 
            className="flex items-center gap-2 text-left">              
          <Calendar className="size-5 text-zinc-400"/>
          <span
                id="dateInput"
                className="text-zinc-400 text-lg outline-none">
                Quando?
          </span>
        </button>

        {isDateModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="flex flex-col items-center bg-zinc-900 rounded-xl text-zinc-400 px-6 py-5 gap-5 shadow-shape">
              <div className="flex flex-col justify-center w-full gap-2">
                <div className="flex justify-between">
                  <h2 className="text-zinc-50 text-lg font-semibold">
                    Selecione as datas
                  </h2>
                  <button>
                    <X className="size-5" onClick={closeDateModal}/>
                  </button>
                </div>
              </div>
                <DayPicker
                  locale={ptBR}
                  mode="range"
                  showOutsideDays
                />
            </div>
          </div>
        )}

        <div className="w-px h-6 bg-zinc-800"/>
        {props.isGuestsInputOpen ? (
          <Button onClick={props.closeGuestInput} colors="secundary" size="default">
            <div className="w-40">Alterar local/data</div>
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