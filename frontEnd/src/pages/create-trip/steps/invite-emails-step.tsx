import { UserRoundPlus, ArrowRight } from "lucide-react";

interface InviteEmailsStepType{
    emailsToInvite: string[];
    openGuestsModal: () => void;
    confirmTravel: () => void;
}

export function InviteEmailsStep(props: InviteEmailsStepType){
    return(
        <div className="flex items-center justify-between bg-zinc-900 rounded-xl h-16 px-6 gap-3 shadow-shape">
                <button className="flex items-center gap-2 w-[460px] text-zinc-400" onClick={props.openGuestsModal}>
                  <UserRoundPlus className="size-5"/>
                  <span className="text-left text-lg flex-1">
                    {
                      props.emailsToInvite.length > 0 ? 
                        (<span className="text-zinc-100">{props.emailsToInvite.length} pessoa(s) convidada(s)</span>) : 
                        (<span className="">Quem estará na viagem?</span>)
                    }
                  </span>
                </button>
                <button className="bg-lime-300 text-lime-950 flex items-center text-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400" onClick={props.confirmTravel}>
                  Confirmar viagem
                  <ArrowRight className="size-5"/>
                </button>
            </div>
    )
}