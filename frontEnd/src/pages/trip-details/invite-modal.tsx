import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { Invite } from "../../lib/interfaces";

interface InviteModalType{
    openConfirmeInviteModal: () => void;
    invites: Invite[];
}

export function InviteModal(props: Readonly<InviteModalType>){
    return(
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Convidados</h2>
            
            <div className="space-y-5">
                
                {props.invites !== undefined ?
                    props.invites.map((invite) => {
                        return (
                            <div key={invite.id} className="text-zinc-400">
                                {invite.name ? (
                                    <span className="text-zinc-100 font-semibold">{invite.name}</span>
                                ) : (
                                    <span className="text-zinc-100 font-semibold">Participante sem a confirmação do nome</span>
                                )}

                                {invite.is_confirmed ? (
                                    <CircleCheck className="size-5 ml-auto mr-0 text-lime-300"/>
                                    ) : (
                                    <CircleDashed className="size-5 ml-auto mr-0"/>
                                )}
                                
                                <p className="w-60 h-[17px] truncate text-xs">
                                    {invite.email}
                                </p>
                            </div>
                        )
                    })
                    : (
                         <div className="text-zinc-400">
                                    <span className="text-zinc-100 font-semibold">Nenhum convite enviado</span>
                            </div>
                    )
                }

                <Button colors="secundary" size="full" onClick={props.openConfirmeInviteModal}>
                    <UserCog className=""/>
                    Gerenciar Convidados
                </Button>
            </div>
        </div>
    )
}