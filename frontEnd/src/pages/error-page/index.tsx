import { useRouteError } from "react-router-dom";

export function ErrorPage(){
    interface RouteError{
        message: string,
        statusText: string
    }

    const error = useRouteError() as RouteError;

    return(
        <div className="">
            <h1 className="">Oops!!</h1>

            {error.statusText.startsWith("4") && (
                <span>Descupa, não encontramos a página</span>
            )}

            {error.statusText.startsWith("5") && (
                <span>Desculpa, tivemos um error no nosso servidor</span>
            )}
        </div>
    )
}