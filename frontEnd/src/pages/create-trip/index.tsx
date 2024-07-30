import { ArrowRight, MapPin, Calendar, UserRoundPlus, Settings2, X, Mail, User } from "lucide-react";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export function CreateTripPage(){
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState<boolean>(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState<boolean>(false);
  const [isEndConfigTravel, setIsEndConfigTravel] = useState<boolean>(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
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

  return(
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full text-center space-y-10">
        <div className="flex items-center justify-center flex-col gap-2">
          <img src="/logo.svg" alt="Logo escrita plann.er" className="" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center bg-zinc-900 rounded-xl h-16 px-6 gap-3 shadow-shape">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400"/>
                <input type="text"
                      name="locationInput"
                      id="locationInput"
                      disabled={isGuestsInputOpen}
                      className="bg-transparent placeholder-zinc-400 text-lg outline-none"
                      onChange={handleLocation}
                      placeholder="Para onde você vai?"/>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400"/>
                <input type="text"
                      name="dateInput"
                      id="dateInput"
                      disabled={isGuestsInputOpen}
                      className="bg-transparent placeholder-zinc-400 text-lg outline-none"
                      onChange={handleDate}
                      placeholder="Quando?"/>
              </div>
            <div className="w-px h-6 bg-zinc-800"/>
            { isGuestsInputOpen ? (
                <button className="bg-zinc-800 text-zinc-200 flex items-center text-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-zinc-700 w-56" onClick={closeGuestInput}>
                  Alterar local/data
                  <Settings2 className="size-5"/>
                </button>
              ):(
                <button className="bg-lime-300 text-lime-950 flex items-center text-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400" onClick={openGuestsInput}>
                  Continuar
                  <ArrowRight className="size-5"/>
                </button>
            )}
          </div>
          {isGuestsInputOpen && (
              <div className="flex items-center justify-between bg-zinc-900 rounded-xl h-16 px-6 gap-3 shadow-shape">
                <button className="flex items-center gap-2 w-[460px] text-zinc-400" onClick={openGuestsModal}>
                  <UserRoundPlus className="size-5"/>
                  <span className="text-left text-lg flex-1">
                    {
                      emailsToInvite.length > 0 ? 
                        (<span className="text-zinc-100">{emailsToInvite.length} pessoa(s) convidada(s)</span>) : 
                        (<span className="">Quem estará na viagem?</span>)
                    }
                  </span>
                </button>
                <button className="bg-lime-300 text-lime-950 flex items-center text-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400" onClick={confirmTravel}>
                  Confirmar viagem
                  <ArrowRight className="size-5"/>
                </button>
              </div>
            )}
        </div>

        {isGuestsModalOpen && (
          <InviteGuestsModal 
            closeGuestsModal={closeGuestsModal}
            emailsToInvite={emailsToInvite}
            insertEmail={insertEmail}
            removeEmail={removeEmail}
          />
        )}

        {isEndConfigTravel && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="flex flex-col items-center bg-zinc-900 w-[640px] rounded-xl text-zinc-400 px-6 py-5 gap-5 shadow-shape">
              <div className="flex flex-col justify-center w-full gap-2">
                <div className="flex justify-between">
                  <h2 className="text-zinc-50 text-lg font-semibold">
                    Confirmar criação da viagem.
                  </h2>
                  <button>
                    <X className="size-5" onClick={disconfirmTravel}/>
                  </button>
                </div>

                <p className="text-left text-sm">
                Para concluir a criação da viagem para <span className="text-zinc-100 font-semibold"> {locationInput} </span> nas datas <span className="text-zinc-100 font-semibold"> {dateInput} </span> preencha seus dados abaixo:
                </p>
              </div>
              
              <form className="space-y-4 w-full">
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="flex items-center gap-2 w-full bg-zinc-950 px-3 py-2 rounded-lg">
                    <User className="size-5 text-zinc-400"/>
                    <input type="text"
                          name="nameUserInput"
                          id="nameUserInput"
                          className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                          placeholder="Digite o seu nome completo"/>
                  </div>

                  <div className="flex items-center gap-2 w-full bg-zinc-950 px-3 py-2 rounded-lg">
                    <Mail className="size-5 text-zinc-400"/>
                    <input type="email"
                          name="emailInput"
                          id="emailInput"
                          className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full text-zinc-100"
                          placeholder="Seu e-mail pessoal"/>
                  </div>
                </div>

                <button type="submit" className="bg-lime-300 text-lime-950 flex items-center justify-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400 w-full">
                  Confirmar criação da vigem.
                </button>
              </form>
            </div>
          </div>
        )}

        <p className="text-zinc-500 text-sm">
        Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
        com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>
    </div>
  )
}