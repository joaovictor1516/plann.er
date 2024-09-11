import { ActivityInformations, Activity, Link } from "../../lib/interfaces";
import { RegistrationLinkModal } from "./registration-link-modal";
import { CreateActivityModal } from "./create-activite-modal";
import { ConfirmInviteModal } from "./confirm-invite-modal";
import { FormEvent, useEffect, useState } from "react";
import { LocaleDateModal } from "./locale-date-modal";
import { ActivityModal } from "./activity-modal";
import { useNavigate } from "react-router-dom";
import { InviteModal } from "./invite-modal";
import { LinkModal } from "./link-modal";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { toast } from "sonner";

export function TripDetailsPage(){
    const [isCreatyActivityModalOpen, setIsCreatyActivityModalOpen] = useState<boolean>(false);

    const [isLinkRegistrationModalOpen, setIsLinkRegistrationModalOpen] = useState<boolean>(false);

    const [isConfirmeInvatedModalOpen, setIsConfirmeInvatedModalOpen] = useState<boolean>(false);

    const [activityInformations, setActivityInformations] = useState<ActivityInformations[]>([]);

    const [links, setLinks] = useState<Link[]>([])

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

    async function tackeActivities(tripId: string){
        await api.get(`/trips/${tripId}/activities`)
        .then((response) => {
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
                        activityDetails[i].occurs_at = format((new Date(activityDetails[i].occurs_at)), "HH:mm");
                        activity.push(activityDetails[i]);
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

    async function createActivity(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const occurs_at = data.get("occursAtInput")?.toString();

        const title = data.get("titleInput")?.toString();

        await api.post("/trips/a698e129-04d4-48fd-a805-004be703ce60/activities", {
            title,
            occurs_at
        })
        .then((response) => {
            toast.success("Tarefa criada com sucesso.", {
                duration: 5000,
                closeButton: true
            });
            console.log(response);
        })
        .catch((error) => {
            toast.error("Falha na criação da tarefa.", {
                duration: 5000,
                closeButton: true
            });
            console.error(error);
        })
    }

    async function deleteActivity(activityId: string){
        await api.delete(`/activities/${activityId}/delete`)
        .then((response) => {
            console.log(response);
            toast.message("Tarefa deletada com sucesso.", {
                duration: 5000,
                closeButton: true
            });
        })
        .catch((error) => {
            console.error(error);
        })
    }

    async function tackeLinks(tripId: string){
        await api.get(`/trips/${tripId}/links`)
        .then((response) => {
            const links = response.data.links;
            setLinks(links);
        })
        .catch((error) => {
            console.error(error);
        })
    }
    
    useEffect(() => {
        tackeActivities("a698e129-04d4-48fd-a805-004be703ce60");
        tackeLinks("a698e129-04d4-48fd-a805-004be703ce60");
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
                    deleteActivity={deleteActivity}
                />

                <div className="w-80 space-y-6">
                    <LinkModal
                        openLinkRegistrationModal={openLinkRegistrationModal}
                        links={links}
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
                    createActivity={createActivity}
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