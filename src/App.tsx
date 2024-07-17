import { ArrowRight, MapPin, Calendar, User, UserRoundPlus, Settings2, Plus, AtSign, X } from "lucide-react";
import { useState } from "react";

export function App(){


  return(
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full text-center space-y-10">
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        
        <div className="flex items-center bg-zinc-900 rounded-xl h-16 px-6 gap-3 shadow-shape">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-zinc-400"/>
              <input type="text"
                    name=""
                    id=""
                    className="bg-transparent placeholder-zinc-400 text-lg outline-none"
                    placeholder="Para onde você vai?"/>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400"/>
              <input type="text"
                    name=""
                    id=""
                    className="bg-transparent placeholder-zinc-400 text-lg outline-none"
                    placeholder="Quando?"/>
            </div>

          <div className="w-px h-6 bg-zinc-800"/>

          <div className="bg-lime-300 text-lime-950 flex items-center text-center px-5 py-2 gap-2 rounded-lg font-medium hover:bg-lime-400">
            <button className="">Continuar</button>
            <ArrowRight className="size-5"/>
          </div>
        </div>
        
        <p className="text-zinc-500 text-sm">
        Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
        com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>
    </div>
  )
}