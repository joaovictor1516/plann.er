import { UserRoundPlus, ArrowRight } from "lucide-react";
import { Button } from "../../../components/button";

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
                <Button onClick={props.confirmTravel} colors="primary" size="default">
                  Confirmar viagem
                  <ArrowRight className="size-5"/>
                </Button>
            </div>
    )
}