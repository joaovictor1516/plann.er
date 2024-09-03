import { useState } from "react";
import { api } from "../../lib/axios";
import { LinkModal } from "./link-modal";
import { InviteModal } from "./invite-modal";
import { useNavigate } from "react-router-dom";
import { ActivityModal } from "./activity-modal";
import { LocaleDateModal } from "./locale-date-modal";
import { ConfirmInviteModal } from "./confirm-invite-modal";
import { CreateActiviteModal } from "./create-activite-modal";
import { RegistrationLinkModal } from "./registration-link-modal";

export function TripDetailsPage(){
    const [isCreatyActivityModalOpen, setIsCreatyActivityModalOpen] = useState<boolean>(false);

    const [isLinkRegistrationModalOpen, setIsLinkRegistrationModalOpen] = useState<boolean>(false);

    const [isConfirmeInvatedModalOpen, setIsConfirmeInvatedModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();

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

    function tackeActivities(tripId: string){
        api.get(`https://localhost:3333/trips/${tripId}/activities`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    function changeDateTime(){
        navigate("/");
    }

    return(
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <LocaleDateModal
                changeDateTime={changeDateTime}
            />

            <main className="flex gap-16 px-4">
                <ActivityModal 
                    openCreatyActivityModal={openCreatyActivityModal}
                    takeActivities={() => {tackeActivities("a698e129-04d4-48fd-a805-004be703ce60")}}
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
                <RegistrationLinkModal
                  closeLinkRegistrationModal={closeLinkRegistrationModal}
                />
            )}

            { isConfirmeInvatedModalOpen && (
              <ConfirmInviteModal
                closeConfirmeInviteModal={closeConfirmeInviteModal}
              />
            )}
        </div>
    )
}