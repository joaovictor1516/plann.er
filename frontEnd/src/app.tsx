import { ArrowRight, MapPin, Calendar, UserRoundPlus, Settings2, Plus, AtSign, X, Mail, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export function App(){
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState<boolean>(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState<boolean>(false);
  const [IsEndConfigTravel, setIsEndConfigTravel] = useState<boolean>(false);
  const [isEmailExist, setIsEmailExist] = useState<boolean>(false);

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

    checkEmailsExist();
  }

  function checkEmailsExist(){
    if(emailsToInvite.length !== 0){
      setIsEmailExist(true);
    } else{
      setIsEmailExist(false);
    }
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
        return;
      }

      toast.success("E-mail adicionado com sucesso.", {
        duration: 5000,
        closeButton: true,
      });
      
      setEmailsToInvite([...emailsToInvite, email]);
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
                      isEmailExist ? `${emailsToInvite.length} pessoa(s) convidada(s)` : "Quem estará na viagem?"
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
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="flex flex-col items-center bg-zinc-900 w-[640px] rounded-xl text-zinc-400 px-6 py-5 gap-5 shadow-shape">
              <div className="flex flex-col justify-center w-full gap-2">
                <div className="flex justify-between">
                  <h2 className="text-zinc-50 text-lg font-semibold">
                    Selecionar convidados
                  </h2>
                  <button>
                    <X className="size-5" onClick={closeGuestsModal}/>
                  </button>
                </div>

                <p className="text-left text-sm">
                  Os convidados irão receber e-mails para confirmar a participação na viagem.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {
                  emailsToInvite.map((email) => {
                    return(
                      <div key={emailsToInvite.indexOf(email)} className="flex gap-1 p-2 bg-zinc-800 rounded">
                        <span className="text-zinc-300">
                          {email}
                        </span>
                        <button className="" onClick={() => removeEmail(email)}>  
                          <X className="size-4 text-zinc-400"/>
                        </button>
                      </div>
                    )
                  })
                }
              </div>

              <div className="w-full h-px bg-zinc-800"/>
              
              <form onSubmit={insertEmail} className="flex items-center justify-between bg-zinc-950 border border-zinc-800 w-full rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <AtSign className="size-5 text-zinc-400"/>
                  <input type="email"
                        name="emailInput"
                        id="emailInput"
                        className="bg-transparent placeholder-zinc-400 text-lg outline-none w-64"
                        placeholder="Digite o e-mail do convidado"/>
                </div>

                <button type="submit" className="bg-lime-300 text-lime-950 flex items-center text-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400">
                  Convidar
                  <Plus className="size-5"/>
                </button>
              </form>
            </div>
          </div>
        )}

        {IsEndConfigTravel && (
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
                Para concluir a criação da viagem para <span className="text-zinc-100"> {locationInput} </span> nas datas <span className="text-zinc-100"> {dateInput} </span> preencha seus dados abaixo:
                </p>
              </div>
              
              <form className="flex flex-col items-center justify-between border w-full border-none gap-4">
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="flex items-center gap-2 w-full bg-zinc-950 px-3 py-2 rounded-lg">
                    <User className="size-5 text-zinc-400"/>
                    <input type="email"
                          name="emailInput"
                          id="emailInput"
                          className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full"
                          placeholder="Digite o seu nome completo"/>
                  </div>

                  <div className="flex items-center gap-2 w-full bg-zinc-950 px-3 py-2 rounded-lg">
                    <Mail className="size-5 text-zinc-400"/>
                    <input type="email"
                          name="emailInput"
                          id="emailInput"
                          className="bg-transparent placeholder-zinc-400 text-lg outline-none w-full"
                          placeholder="Digite o seu e-mail"/>
                  </div>
                </div>

                <button type="submit" className="bg-lime-300 text-lime-950 flex items-center text-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400 w-full">
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