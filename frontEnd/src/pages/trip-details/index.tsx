import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { LinkModal } from "./link-modal";
import { InviteModal } from "./invite-modal";
import { useNavigate } from "react-router-dom";
import { ActivityModal } from "./activity-modal";
import { LocaleDateModal } from "./locale-date-modal";
import { ConfirmInviteModal } from "./confirm-invite-modal";
import { CreateActivityModal } from "./create-activite-modal";
import { RegistrationLinkModal } from "./registration-link-modal";
import { ActivityInformations, Activity } from "../../lib/interfaces";

export function TripDetailsPage(){
    const [isCreatyActivityModalOpen, setIsCreatyActivityModalOpen] = useState<boolean>(false);

    const [isLinkRegistrationModalOpen, setIsLinkRegistrationModalOpen] = useState<boolean>(false);

    const [isConfirmeInvatedModalOpen, setIsConfirmeInvatedModalOpen] = useState<boolean>(false);

    const [activityInformations, setActivityInformations] = useState<ActivityInformations[]>([]);

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
        api.get(`http://localhost:3333/trips/${tripId}/activities`)
        .then((response) => {
            console.log(response.data.activities);

            const activityElements: ActivityInformations[] = [];

            response.data.activities.map((values: {date: string, activity: Activity[]}) => {
                const activityDetails = values.activity;

                const activitiesOfTheDay: ActivityInformations = {
                    activities: undefined,

                    date: new Date(values.date).toLocaleDateString("pt-BR", {
                            day: "numeric",
                            month: "long"
                        }),
                    
                    dateDayWeek: new Date(values.date).toLocaleDateString("pt-BR", {
                            weekday: "long"
                        })
                }
                const activity: Activity[] = [];
                
                if(activityDetails.length > 0){

                    for(const i in activityDetails){
                        activity.push(activityDetails[i]);
                        console.log("teste" + activityDetails[i]);
                    }

                    activitiesOfTheDay.activities = activity;
                }

                activityElements.push(activitiesOfTheDay);
                setActivityInformations(activityElements);
            })
        })
        .catch((error) => {
            console.error(error);
        })
    }

    function CreateActivity(){

    }

    useEffect(() => {
        tackeActivities("a698e129-04d4-48fd-a805-004be703ce60");
    }, []);

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
                    activityInformations={activityInformations}
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
                <CreateActivityModal
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