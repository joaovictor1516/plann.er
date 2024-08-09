import { X, User, Mail } from "lucide-react";

interface ConfirmInviteModalType{
    closeConfirmeInviteModal: () => void;
}

export function ConfirmInviteModal(props: Readonly<ConfirmInviteModalType>){
    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="flex flex-col items-center bg-zinc-900 w-[540px] rounded-xl text-zinc-400 px-6 py-5 gap-5 shadow-shape">
                <div className="flex flex-col justify-center w-full gap-2">
                <div className="flex justify-between">
                    <h2 className="text-zinc-50 text-lg font-semibold">
                    Confirmar participação
                    </h2>
                    <button>
                    <X className="size-5" onClick={props.closeConfirmeInviteModal}/>
                    </button>
                </div>

                <div className="space-y-3.5">
                    <p className="text-left text-sm">
                        Você foi convidado(a) para participar de uma viagem para <span className="text-zinc-100 font-semibold">Florianópolis, Brasil</span> nas datas de <span className="text-zinc-100 font-semibold">16 a 27 de Agosto de 2024</span>.
                    </p>

                    <p className="text-left text-sm">
                        Para confirmar sua presença na viagem, preencha os dados abaixo:
                    </p>
                </div>
                </div>
                
                <form className="space-y-3 w-full">
                <div className="flex flex-col items-center gap-2 w-full">
                    <div className="flex items-center gap-2 w-full bg-zinc-950 px-3 py-2 rounded-lg">
                    <User className="size-5 text-zinc-400"/>
                    <input type="text"
                            name="userNameInput"
                            id="userNameInput"
                            className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                            placeholder="Seu nome completo"/>
                    </div>

                    <div className="flex items-center gap-2 w-full bg-zinc-950 px-3 py-2 rounded-lg">
                    <Mail className="size-5 text-zinc-400"/>
                    <input type="email"
                            name="emailInput"
                            id="emailInput"
                            className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                            placeholder="Seu e-mail"/>
                    </div>
                </div>

                <button className="bg-lime-300 text-lime-950 flex items-center justify-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400 w-full">
                    Confirmar minha presença
                </button>
                </form>
            </div>
        </div>
    )
}