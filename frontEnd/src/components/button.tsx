import { tv, VariantProps } from "tailwind-variants"; //tv -> abreviação para tailwind-variants.
import { ComponentProps, ReactNode } from "react";

const buttonVariants = tv({
    base: "flex items-center justify-center gap-2 px-5 rounded-lg font-medium",
    variants:{
        colors:{
            primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
            secundary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
        },
        size:{
            default: "py-2",
            full: "w-full h-11"
        }
    },
    defaultVariants:{
        colors: "primary",
        size: "default"
    }
});

interface ButtonType extends ComponentProps<"button">, VariantProps<typeof buttonVariants>{
    children: ReactNode;
}

export function Button({children, colors, size, ...props}: Readonly<ButtonType>){
    return(
        <button {...props} className={buttonVariants({colors, size})}>
            {children}
        </button>
    )
}