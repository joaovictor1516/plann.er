import { ArrowRight, MapPin, Calendar, User, UserRoundPlus, Settings2, Plus, AtSign, X } from "lucide-react";
import { useState } from "react";

export function App(){


  return(
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        
        <div className="flex items-center bg-zinc-900 rounded-xl h-16 px-4 space-x-5 shadow-shape">
          <div className="space-x-5 flex items-center">
            <div className="flex items-center space-x-2">
              <MapPin className=""/>
              <input type="text"
                    name=""
                    id=""
                    className="bg-transparent ml-6 placeholder-zinc-400 text-lg"
                    placeholder="Para onde você vai?"/>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className=""/>
              <input type="text"
                    name=""
                    id=""
                    className="bg-transparent ml-6 placeholder-zinc-400 text-lg"
                    placeholder="Quando?"/>
            </div>
          </div>

          <div className="bg-lime-300 flex items-center text-lime-950 text-center px-5 h-9 space-x-2 rounded-lg">
            <button className="">Continuar</button>
            <ArrowRight/>
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