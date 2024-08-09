import { useState } from "react";
import { CreateActiviteModal } from "./create-activite-modal";
import { LocaleDateModal } from "./locale-date-modal";
import { ActivityModal } from "./activity-modal";
import { LinkModal } from "./link-modal";
import { InviteModal } from "./invite-modal";
import { RegistrationLinkModal } from "./registration-link-modal";
import { ConfirmInviteModal } from "./confirm-invite-modal";

export function TripDetailsPage(){
    const [isCreatyActivityModalOpen, setIsCreatyActivityModalOpen] = useState<boolean>(false);

    const [isLinkRegistrationModalOpen, setIsLinkRegistrationModalOpen] = useState<boolean>(false);

    const [isConfirmeInvatedModalOpen, setIsConfirmeInvatedModalOpen] = useState<boolean>(false);

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

    return(
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <LocaleDateModal/>

            <main className="flex gap-16 px-4">
                <ActivityModal 
                    openCreatyActivityModal={openCreatyActivityModal}
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