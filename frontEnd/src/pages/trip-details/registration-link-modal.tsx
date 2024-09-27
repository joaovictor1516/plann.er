import { Button } from "../../components/button";
import { X, Tag, Link2 } from "lucide-react";
import { FormEvent } from "react";

interface RegistrationLinkModalType{
    closeLinkRegistrationModal: () => void;
    createLink: (event: FormEvent<HTMLFormElement>) => void;
}

export function RegistrationLinkModal(props: Readonly<RegistrationLinkModalType>){
    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="flex flex-col items-center bg-zinc-900 w-[540px] rounded-xl text-zinc-400 px-6 py-5 gap-5 shadow-shape">
                <div className="flex flex-col justify-center w-full gap-2">
                    <div className="flex justify-between">
                        <h2 className="text-zinc-50 text-lg font-semibold">
                        Cadastrar link
                        </h2>
                        <Button size="default" color="secundary">
                            <X className="size-5" onClick={props.closeLinkRegistrationModal}/>
                        </Button>
                    </div>

                    <p className="text-left text-sm">
                    Todos convidados podem visualizar os links importantes.
                    </p>
                </div>
                
                <form onSubmit={props.createLink} className="space-y-3 w-full">
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="flex items-center gap-2 w-full bg-zinc-950 px-3 py-2 rounded-lg">
                            <Tag className="size-5 text-zinc-400"/>
                            <input type="text"
                                    name="titleInput"
                                    id="titleInput"
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

                    <Button type="submit" colors="primary" size="full">
                        Salvar link
                    </Button>
                </form>
            </div>
        </div>
    )
}