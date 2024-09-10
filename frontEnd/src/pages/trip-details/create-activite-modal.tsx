import { X, Tag, Calendar } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";

interface CreateAtivityType{
    closeCreatyActivityModal: () => void;
    createActivity: (event: FormEvent<HTMLFormElement>) => void;
}

export function CreateActivityModal(props: Readonly<CreateAtivityType>){
    return(
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                <div className="flex flex-col items-center bg-zinc-900 w-[540px] rounded-xl text-zinc-400 px-6 py-5 shadow-shape">
                    <div className="flex flex-col justify-center w-full gap-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-zinc-50 text-lg font-semibold">
                                    Cadastrar atividade
                                </h2>
                            
                                <button>
                                    <X className="size-5" onClick={props.closeCreatyActivityModal}/>
                                </button>
                            </div>
                            
                            <p className="text-zinc-400 text-sm">
                                Todos convidados podem visualizar as atividades.
                            </p>
                        </div>
                    
                        <form onSubmit={props.createActivity} className="space-y-3 w-full">
                            <div className="flex flex-col items-center gap-2 w-full">
                                
                                <div className="flex items-center gap-2 w-full h-14 bg-zinc-950 px-3 py-2 rounded-lg">
                                    <Tag className="size-5 text-zinc-400"/>
                                
                                    <input type="text"
                                        name="titleInput"
                                        id="titleInput"
                                        className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                                        placeholder="Qual a atividade?"/>
                                </div>
                
                                <div className="flex items-center gap-2 w-full">
                                    <div className="bg-zinc-950 flex flex-1 items-center h-14 py-4 px-2.5 gap-2.5 rounded-lg">
                                        <Calendar className="size-5 text-zinc-400"/>

                                        <input type="datetime-local"
                                            name="occursAtInput"
                                            id="occursAtInput"
                                            className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                                            placeholder="Data"/>
                                    </div>
                                </div>
                            </div>
            
                            <Button type="submit" colors="primary" size="full">
                                Salvar atividade
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
    )
}