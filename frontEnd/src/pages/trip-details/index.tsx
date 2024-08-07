import { MapPin, Calendar, Plus, Settings2, CircleCheck, Link2, CircleDashed, UserCog, X, Tag, Clock } from "lucide-react";
import { useState } from "react";

export function TripDetailsPage(){
    const [isCreatyActivityModalOpen, setIsCreatyActivityModalOpen] = useState<boolean>(false);

    const [isLinkRegistrationModalOpen, setIsLinkRegistrationModalOpen] = useState<boolean>(false);

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

    return(
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <div className="flex items-center justify-between bg-zinc-900 px-4 h-16 rounded-xl shadow-shape">
                <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-zinc-400"/>

                    <span className="text-zinc-100">
                        Rio de Janeiro, Brasil
                    </span>
                </div>
                
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <Calendar className="size-5 text-zinc-400"/>

                        <span className="text-zinc-100">
                            17 a 23 de Agosto
                        </span>
                    </div>

                    <div className="w-px h-6 bg-zinc-800"/>

                    <button className="bg-zinc-800 text-zinc-200 flex items-center gap-2 px-5 py-2 rounded-lg font-medium hover:bg-zinc-700">
                        Alterar local/data
                        <Settings2 className="size-5"/>
                    </button>
                </div>
            </div>

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">
                            Atividades
                        </h2>

                        <button className="bg-lime-300 text-lime-950 flex items-center gap-2 px-5 py-2 rounded-lg font-medium hover:bg-lime-400" onClick={openCreatyActivityModal}>
                            <Plus className="size-5"/>
                            Cadastrar atividade
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <div className="flex gap-2 items-baseline">
                                <span className="text-zinc-300 text-xl font-semibold">Dia 17</span>
                                <span className="text-zinc-500 text-xs">Sábado</span>
                            </div>
                            
                            <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nesta data.</p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-2 items-baseline">
                                <span className="text-zinc-300 text-xl font-semibold">Dia 18</span>
                                <span className="text-zinc-500 text-xs">Domingo</span>
                            </div>

                            <div className="flex justify-between items-center gap-3 h-10 px-4 rounded-xl bg-zinc-900 text-zinc-100 shadow-shape">
                                <CircleCheck className="size-5 text-lime-300"/>
                                <span className="flex-1">Corrida de Kart</span>
                                <p className="text-zinc-400 text-sm">14:00h</p>
                            </div>

                            <div className="flex justify-between items-center gap-3 h-10 px-4 rounded-xl bg-zinc-900 text-zinc-100 shadow-shape">
                                <CircleCheck className="size-5 text-lime-300"/>
                                <span className="flex-1">Jantar</span>
                                <p className="text-zinc-400 text-sm">21:00h</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-80 space-y-6">
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Links importantes</h2>
                        
                        <div className="space-y-5">
                            <div className="text-zinc-400 flex items-center justify-between">
                                <div className="space-y-1.5 flex-1">
                                    <span className="text-zinc-100 block font-semibold">
                                        Reserva AirBnB
                                    </span>
                                    
                                    <a href="#" className="w-60 h-[17px] block truncate text-xs hover:text-zinc-200">
                                        https://www.airbnb.com.br/rooms/104700011
                                    </a>
                                </div>

                                <Link2 className="size-5"/>
                            </div>

                            <div className="text-zinc-400 flex items-center justify-between">
                                <div className="space-y-1.5 flex-1">
                                    <span className="text-zinc-100 block font-semibold">
                                        Regras da casa
                                    </span>
                                    
                                    <a href="#" className="w-60 h-[17px] block truncate text-xs hover:text-zinc-200">
                                        https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000
                                    </a>
                                </div>

                                <Link2 className="size-5"/>
                            </div>

                            <button onClick={openLinkRegistrationModal} className="bg-zinc-800 text-zinc-200 flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-medium hover:bg-zinc-700 w-full h-11">
                                <Plus className=""/>
                                Cadastrar novo link
                            </button>
                        </div>
                    </div>

                    <div className="w-full h-px bg-zinc-800"/>

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

                            <button className="bg-zinc-800 text-zinc-200 flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-medium hover:bg-zinc-700 w-full h-11">
                                <UserCog className=""/>
                                Gerenciar Convidados
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            { isCreatyActivityModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="flex flex-col items-center bg-zinc-900 w-[540px] rounded-xl text-zinc-400 px-6 py-5 shadow-shape">
                        <div className="flex flex-col justify-center w-full gap-5">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-zinc-50 text-lg font-semibold">
                                        Cadastrar atividade
                                    </h2>
                                
                                    <button>
                                        <X className="size-5" onClick={closeCreatyActivityModal}/>
                                    </button>
                                </div>
                                
                                <p className="text-zinc-400 text-sm">
                                    Todos convidados podem visualizar as atividades.
                                </p>
                            </div>
                        
                            <form className="space-y-3 w-full">
                                <div className="flex flex-col items-center gap-2 w-full">
                                    
                                    <div className="flex items-center gap-2 w-full h-14 bg-zinc-950 px-3 py-2 rounded-lg">
                                        <Tag className="size-5 text-zinc-400"/>
                                    
                                        <input type="text"
                                            name="nameUserInput"
                                            id="nameUserInput"
                                            className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                                            placeholder="Qual a atividade?"/>
                                    </div>
                    
                                    <div className="flex items-center gap-2 w-full">
                                        <div className="bg-zinc-950 flex flex-1 items-center h-14 py-4 px-2.5 gap-2.5 rounded-lg">
                                            <Calendar className="size-5 text-zinc-400"/>

                                            <input type="text"
                                                name="dateInput"
                                                id="dateInput"
                                                className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                                                placeholder="Data"/>
                                        </div>

                                        <div className="bg-zinc-950 flex items-center w-[140px] h-14 py-4 px-2.5 gap-2.5 rounded-lg">
                                            <Clock className="size-5 text-zinc-400 shrink-0"/>

                                            <input type="text"
                                                name="clockInput"
                                                id="clockInput"
                                                className="bg-transparent placeholder-zinc-400 text-lg outline-none text-zinc-100"
                                                placeholder="Horário"/>
                                        </div>
                                    </div>
                                </div>
                
                                <button className="bg-lime-300 text-lime-950 flex items-center justify-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400 w-full">
                                    Salvar atividade
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
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
        </div>
    )
}