import { Link2, X, Tag, User, Mail } from "lucide-react";
import { useState } from "react";
import { CreateActiviteModal } from "./create-activite-modal";
import { LocaleDateModal } from "./locale-date-modal";
import { ActivityModal } from "./activity-modal";
import { LinkModal } from "./link-modal";
import { InviteModal } from "./invite-modal";

export function TripDetailsPage(){
    const [isCreatyActivityModalOpen, setIsCreatyActivityModalOpen] = useState<boolean>(false);

    const [isLinkRegistrationModalOpen, setIsLinkRegistrationModalOpen] = useState<boolean>(false);

    const [isConfirmeInvatedModalOpen, setIsConfirmeInvatedModalOpen] = useState<boolean>(false);

    function openCreatyActivityModal(){
        setIsCreatyActivityModalOpen(true);
    }

    function closeCreatyActivityModal(){
        setIsCreatyActivityModalOpen(false);
    }

    function openLinkRegistrationModal(){
        setIsLinkRegistrationModalOpen(true);
    }

    function closeLinkRegistrationModal(){
        setIsLinkRegistrationModalOpen(false);
    }

    function openConfirmeInviteModal(){
        setIsConfirmeInvatedModalOpen(true);
    }

    function closeConfirmeInviteModal(){
        setIsConfirmeInvatedModalOpen(false);
    }

    return(
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <LocaleDateModal/>

            <main className="flex gap-16 px-4">
                <ActivityModal 
                    openCreatyActivityModal={openCreatyActivityModal}
                />

                <div className="w-80 space-y-6">
                    <LinkModal
                        openLinkRegistrationModal={openLinkRegistrationModal}
                    />

                    <div className="w-full h-px bg-zinc-800"/>

                    <InviteModal
                      openConfirmeInviteModal={openConfirmeInviteModal}
                    />
                </div>
            </main>

            { isCreatyActivityModalOpen && (
                <CreateActiviteModal
                    closeCreatyActivityModal={closeCreatyActivityModal}
                />
            )}

            { isLinkRegistrationModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                <div className="flex flex-col items-center bg-zinc-900 w-[540px] rounded-xl text-zinc-400 px-6 py-5 gap-5 shadow-shape">
                  <div className="flex flex-col justify-center w-full gap-2">
                    <div className="flex justify-between">
                      <h2 className="text-zinc-50 text-lg font-semibold">
                        Cadastrar link
                      </h2>
                      <button>
                        <X className="size-5" onClick={closeLinkRegistrationModal}/>
                      </button>
                    </div>
    
                    <p className="text-left text-sm">
                    Todos convidados podem visualizar os links importantes.
                    </p>
                  </div>
                  
                  <form className="space-y-3 w-full">
                    <div className="flex flex-col items-center gap-2 w-full">
                      <div className="flex items-center gap-2 w-full bg-zinc-950 px-3 py-2 rounded-lg">
                        <Tag className="size-5 text-zinc-400"/>
                        <input type="text"
                              name="nameLinkInput"
                              id="nameLinkInput"
                              className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                              placeholder="Título do link"/>
                      </div>
    
                      <div className="flex items-center gap-2 w-full bg-zinc-950 px-3 py-2 rounded-lg">
                        <Link2 className="size-5 text-zinc-400"/>
                        <input type="text"
                              name="urlInput"
                              id="urlInput"
                              className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                              placeholder="URL"/>
                      </div>
                    </div>
    
                    <button className="bg-lime-300 text-lime-950 flex items-center justify-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400 w-full">
                      Salvar link
                    </button>
                  </form>
                </div>
            </div>
            )}

            { isConfirmeInvatedModalOpen && (
               <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
               <div className="flex flex-col items-center bg-zinc-900 w-[540px] rounded-xl text-zinc-400 px-6 py-5 gap-5 shadow-shape">
                 <div className="flex flex-col justify-center w-full gap-2">
                   <div className="flex justify-between">
                     <h2 className="text-zinc-50 text-lg font-semibold">
                       Confirmar participação
                     </h2>
                     <button>
                       <X className="size-5" onClick={closeConfirmeInviteModal}/>
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
            )}
        </div>
    )
}