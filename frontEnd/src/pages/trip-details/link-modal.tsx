import { Link2, Plus } from "lucide-react";

interface LinkModalType {
    openLinkRegistrationModal: () => void;
}

export function LinkModal(props: Readonly<LinkModalType>){
    return(
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

                            <button onClick={props.openLinkRegistrationModal} className="bg-zinc-800 text-zinc-200 flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-medium hover:bg-zinc-700 w-full h-11">
                                <Plus className=""/>
                                Cadastrar novo link
                            </button>
                        </div>
                    </div>
    )
}