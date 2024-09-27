import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { Link2, Tag } from "lucide-react";

interface UpdateLinkModalType {
    closeUpdateModal: () => void;
    linkId: string;
}

export function UpdateLinkModal(props: Readonly<UpdateLinkModalType>){
     async function editLink(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        await api.put(`/links/${props.linkId}/update`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    return (
        <main className="fixed inset-0 bg-black/60 flex items-center justify-center ">
            <div className="flex flex-col items-center bg-zinc-900 w-[540px] rounded-xl text-zinc-400 px-6 py-5 gap-5 shadow-shape">
                <div className="flex flex-col justify-center w-full">
                    <form onSubmit={editLink} className="space-y-3 w-full">
                        <div className="flex flex-col items-center gap-2 w-full">
                            <Tag className="size-5 text-zinc-400"/>
                            <input type="text"
                                    name="titleInput"
                                    id="titleInput"
                                    className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                                    placeholder="Título do link"/>
                        </div>
                
                        <div className="">
                            <Link2 className="size-5 text-zinc-400"/>
                            <input type="text"
                                    name="urlInput"
                                    id="urlInput"
                                    className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                                    placeholder="URL"/>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}