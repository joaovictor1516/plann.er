import { X, AtSign, Plus } from "lucide-react";
import { FormEvent } from "react";

interface InviteGuestsModalType{
    emailsToInvite: string[];
    insertEmail: (event: FormEvent<HTMLFormElement>) => void;
    removeEmail: (emails: string) => void;
    closeGuestsModal: () => void;
}

export function InviteGuestsModal(props: InviteGuestsModalType){
   return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="flex flex-col items-center bg-zinc-900 w-[640px] rounded-xl text-zinc-400 px-6 py-5 gap-5 shadow-shape">
              <div className="flex flex-col justify-center w-full gap-2">
                <div className="flex justify-between">
                  <h2 className="text-zinc-50 text-lg font-semibold">
                    Selecionar convidados
                  </h2>
                  <button>
                    <X className="size-5" onClick={props.closeGuestsModal}/>
                  </button>
                </div>

                <p className="text-left text-sm">
                  Os convidados irão receber e-mails para confirmar a participação na viagem.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {
                  props.emailsToInvite.map((email) => {
                    return(
                      <div key={props.emailsToInvite.indexOf(email)} className="flex gap-1 p-2 bg-zinc-800 rounded">
                        <span className="text-zinc-300">
                          {email}
                        </span>
                        <button className="" onClick={() => props.removeEmail(email)}>  
                          <X className="size-4 text-zinc-400"/>
                        </button>
                      </div>
                    )
                  })
                }
              </div>

              <div className="w-full h-px bg-zinc-800"/>
              
              <form onSubmit={props.insertEmail} className="flex items-center justify-between bg-zinc-950 border border-zinc-800 w-full rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <AtSign className="size-5 text-zinc-400"/>
                  <input type="email"
                        name="emailInput"
                        id="emailInput"
                        className="bg-transparent placeholder-zinc-400 text-lg outline-none w-64 text-zinc-100"
                        placeholder="Digite o e-mail do convidado"/>
                </div>

                <button type="submit" className="bg-lime-300 text-lime-950 flex items-center text-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400">
                  Convidar
                  <Plus className="size-5"/>
                </button>
              </form>
            </div>
        </div>
   ) 
}