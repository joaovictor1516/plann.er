import { Button } from "../../components/button";
import { Link2, Tag, X } from "lucide-react";
import { api } from "../../lib/axios";
import { FormEvent } from "react";

interface UpdateLinkModalType {
    closeUpdateModal: () => void;
    linkId: string;
}

export function UpdateLinkModal(props: Readonly<UpdateLinkModalType>){
     async function editLink(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const title = data.get("titleInput");
        const url = data.get("urlInput");

        if(title && url){
            await api.put(`/links/${props.linkId}/update`, {title, url})
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    return (
        <main className="fixed inset-0 bg-black/60 flex items-center justify-center ">
            <div className="flex flex-col items-center bg-zinc-900 w-[540px] rounded-xl text-zinc-400 px-6 py-5 gap-5 shadow-shape">
                <div className="flex flex-col justify-center w-full">
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-zinc-50 text-lg font-semibold">
                            Editar link
                        </h2>
                        <Button size="default" color="secundary" onClick={props.closeUpdateModal}>
                            <X className="size-5"/>
                        </Button>
                    </div>
                    <form onSubmit={editLink} className="space-y-3 w-full">
                        <div className="flex flex-col items-center gap-2 w-full">
                            <div className="flex items-center gap-2 w-full">
                                <Tag className="size-5 text-zinc-400"/>
                                <input type="text"
                                        name="titleInput"
                                        id="titleInput"
                                        className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                                        placeholder="Título do link"/>
                            </div>
                            <div className="flex items-center gap-2 w-full">
                                <Link2 className="size-5 text-zinc-400"/>
                                <input type="text"
                                        name="urlInput"
                                        id="urlInput"
                                        className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                                        placeholder="URL"/>
                            </div>
                            <Button type="submit" size="full" color="primary">
                                Atualizar link
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}