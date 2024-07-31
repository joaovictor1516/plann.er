import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteEmailsStep } from "./steps/invite-emails-step";
import { ConfirmTravelModal } from "./confirm-travel-modal";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function CreateTripPage(){
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState<boolean>(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState<boolean>(false);
  const [isEndConfigTravel, setIsEndConfigTravel] = useState<boolean>(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const navigate = useNavigate();

  function openGuestsInput(){
    setIsGuestsInputOpen(true);
  }

  function closeGuestInput(){
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal(){
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal(){
    setIsGuestsModalOpen(false);
  }

  function insertEmail(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("emailInput")?.toString();

    if(email){
      if(emailsToInvite.includes(email)){
        event.currentTarget.reset();

        toast.error("Este e-mail já foi adicaionado.", {
          duration: 5000,
          closeButton: true,
        });
      } else{
        toast.success("E-mail adicionado com sucesso.", {
          duration: 5000,
          closeButton: true,
        });
        setEmailsToInvite([...emailsToInvite, email]);
      }
    } else{
      toast.error("Por favor digite um e-mail válido.", {
        duration: 5000,
        closeButton: true,
      });
    }

    event.currentTarget.reset();
  }

  function removeEmail(email: string){
    const index = emailsToInvite.indexOf(email);
    emailsToInvite.splice(index, 1);
    setEmailsToInvite([...emailsToInvite]);
  }

  function confirmTravel(){
    setIsEndConfigTravel(true);
  }

  function disconfirmTravel(){
    setIsEndConfigTravel(false);
  }

  function handleLocation(element: ChangeEvent<HTMLInputElement>){
    const location = element.target.value;

    if(location !== ""){
      setLocationInput(location);
    }
  }

  function handleDate(element: ChangeEvent<HTMLInputElement>){
    const date = element.target.value;

    if(date !== ""){
      setDateInput(date);
    }
  }

  function createTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    navigate("/trips/123");
  }

  return(
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full text-center space-y-10">
        <div className="flex items-center justify-center flex-col gap-2">
          <img src="/logo.svg" alt="Logo escrita plann.er" className="" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        
        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestInput={closeGuestInput}
            handleDate={handleDate}
            handleLocation={handleLocation}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
          />
        </div>

        {isGuestsInputOpen && (
          <InviteEmailsStep
            openGuestsModal={openGuestsModal}
            confirmTravel={confirmTravel}
            emailsToInvite={emailsToInvite}  
          />      
        )}

        {isGuestsModalOpen && (
          <InviteGuestsModal 
            closeGuestsModal={closeGuestsModal}
            emailsToInvite={emailsToInvite}
            insertEmail={insertEmail}
            removeEmail={removeEmail}
          />
        )}

        {isEndConfigTravel && (
          <ConfirmTravelModal
            locationInput={locationInput}
            dateInput={dateInput}
            disconfirmTravel={disconfirmTravel}
            createTrip={createTrip}
          />
        )}

        <p className="text-zinc-500 text-sm">
        Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
        com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>
    </div>
  )
}