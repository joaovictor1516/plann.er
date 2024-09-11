import { Button } from "../../components/button";
import { Link } from "../../lib/interfaces";
import { Link2, Plus } from "lucide-react";

interface LinkModalType {
    openLinkRegistrationModal: () => void;
    links: Link[];
}

export function LinkModal(props: Readonly<LinkModalType>){
    return(
        <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Links importantes</h2>
                        
                        <div className="space-y-5">
                            {props.links.map((link) => {
                                return (
                                    <div key={link.id} className="text-zinc-400 flex items-center justify-between">
                                        <div className="space-y-1.5 flex-1">
                                            <span className="text-zinc-100 block font-semibold">
                                                {link.title}
                                            </span>
                                            
                                            <a href={link.url} className="w-60 h-[17px] block truncate text-xs hover:text-zinc-200">
                                                {link.url}
                                            </a>
                                        </div>

                                        <Link2 className="size-5"/>
                                    </div>
                                )
                            })}

                            <Button colors="secundary" size="full" onClick={props.openLinkRegistrationModal}>
                                <Plus className=""/>
                                Cadastrar novo link
                            </Button>
                        </div>
                    </div>
    )
}