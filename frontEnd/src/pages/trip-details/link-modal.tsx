import { Link2, Plus, Trash, Pencil } from "lucide-react";
import { Button } from "../../components/button";
import { Link } from "../../lib/interfaces";

interface LinkModalType {
    openUpdateLinkModal: (linkId: string) => void;
    openLinkRegistrationModal: () => void;
    deleteLink: (linkId: string) => void;
    links: Link[];
}

export function LinkModal(props: Readonly<LinkModalType>){
    return(
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Links importantes</h2>
            
            <div className="space-y-5">
                {props.links !== undefined ? 
                    props.links.map((link) => {
                        return (
                            <div key={link.id} className="flex flex-col gap-1">
                                <div className="text-zinc-400 flex items-center justify-between">
                                    <div className="space-y-1.5 flex-1">
                                        <span className="text-zinc-100 block text-lg font-semibold">
                                            {link.title}
                                        </span>
                                    
                                        <a href={link.url} className="w-60 h-[17px] block truncate text-base hover:text-zinc-200">
                                            {link.url}
                                        </a>
                                    </div>

                                    <div className="flex flex-row gap-0.5">
                                        <Button color="primary" size="default" onClick={() => {props.openUpdateLinkModal(link.id)}}>
                                            <Pencil className="size-5"/>
                                        </Button>
                                        <Button color="primary" size="default" onClick={() => {props.deleteLink(link.id)}}>
                                            <Trash className="size-5"/>
                                        </Button>
                                    </div>
                                    
                                    <Link2 className="size-5"/>
                                </div>
                            </div>
                        )
                    }) : (
                        <span className="text-zinc-100 block text-lg font-semibold">
                            Nenhum link cadastrado
                        </span>
                    )
                }

                <Button colors="secundary" size="full" onClick={props.openLinkRegistrationModal}>
                    <Plus className=""/>
                    Cadastrar novo link
                </Button>
            </div>
        </div>
    )
}