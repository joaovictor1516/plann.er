import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants"; //tv -> abreviação para tailwind-variants.

const buttonVariants = tv({
    base: "flex items-center gap-2 px-5 py-2 rounded-lg font-medium",
    variants:{
        colors:{
            primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
            secundary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
        }
    },
    defaultVariants:{
        colors: "primary"
    }
})

interface ButtonType extends ComponentProps<"button">, VariantProps<typeof buttonVariants>{
    children: ReactNode;
}

export function Button({children, colors, ...props}: Readonly<ButtonType>){
    return(
        <button {...props} className={buttonVariants({colors})}>
            {children}
        </button>
    )
}