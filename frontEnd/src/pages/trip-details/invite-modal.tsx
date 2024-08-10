import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";

interface InviteModalType{
    openConfirmeInviteModal: () => void;
}

export function InviteModal(props: Readonly<InviteModalType>){
    return(
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Convidados</h2>
            
            <div className="space-y-5">
                <div className="text-zinc-400">
                    <span className="text-zinc-100 font-semibold">Samanta</span>
                    
                    <CircleCheck className="size-5 ml-auto mr-0 text-lime-300"/>
                    
                    <p className="w-60 h-[17px] truncate text-xs">
                        samanta228@gmail.com
                    </p>
                </div>

                <div className="text-zinc-400">
                    <span className="text-zinc-100 font-semibold">Claudio</span>

                    <CircleDashed className="size-5 ml-auto mr-0"/>

                    <p className="w-60 h-[17px] truncate text-xs">
                        claudio551@gmail.com
                    </p>
                </div>

                <Button colors="secundary" size="full" onClick={props.openConfirmeInviteModal}>
                    <UserCog className=""/>
                    Gerenciar Convidados
                </Button>
            </div>
        </div>
    )
}