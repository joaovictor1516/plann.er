import { X, User, Mail } from "lucide-react";

interface ConfirmTravelModalType{
    locationInput: string;
    dateInput: string;
    disconfirmTravel: () => void;
}

export function ConfirmTravelModal(props: ConfirmTravelModalType){
    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="flex flex-col items-center bg-zinc-900 w-[640px] rounded-xl text-zinc-400 px-6 py-5 gap-5 shadow-shape">
              <div className="flex flex-col justify-center w-full gap-2">
                <div className="flex justify-between">
                  <h2 className="text-zinc-50 text-lg font-semibold">
                    Confirmar criação da viagem.
                  </h2>
                  <button>
                    <X className="size-5" onClick={props.disconfirmTravel}/>
                  </button>
                </div>

                <p className="text-left text-sm">
                Para concluir a criação da viagem para <span className="text-zinc-100 font-semibold"> {props.locationInput} </span> nas datas <span className="text-zinc-100 font-semibold"> {props.dateInput} </span> preencha seus dados abaixo:
                </p>
              </div>
              
              <form className="space-y-4 w-full">
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="flex items-center gap-2 w-full bg-zinc-950 px-3 py-2 rounded-lg">
                    <User className="size-5 text-zinc-400"/>
                    <input type="text"
                          name="nameUserInput"
                          id="nameUserInput"
                          className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                          placeholder="Digite o seu nome completo"/>
                  </div>

                  <div className="flex items-center gap-2 w-full bg-zinc-950 px-3 py-2 rounded-lg">
                    <Mail className="size-5 text-zinc-400"/>
                    <input type="email"
                          name="emailInput"
                          id="emailInput"
                          className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                          placeholder="Seu e-mail pessoal"/>
                  </div>
                </div>

                <button type="submit" className="bg-lime-300 text-lime-950 flex items-center justify-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400 w-full">
                  Confirmar criação da vigem.
                </button>
              </form>
            </div>
        </div>
    )
}