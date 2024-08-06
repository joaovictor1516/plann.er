import { MapPin, Calendar, Plus, Settings2, CircleCheck, Link2, CircleDashed, UserCog } from "lucide-react";

export function TripDetailsPage(){
    
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

                        <button className="bg-lime-300 text-lime-950 flex items-center gap-2 px-5 py-2 rounded-lg font-medium hover:bg-lime-400">
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

                            <button className="bg-zinc-800 text-zinc-200 flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-medium hover:bg-zinc-700 w-full h-11">
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
        </div>
    )
}