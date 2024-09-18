import { useRouteError } from "react-router-dom";

export function ErrorPage(){
    interface RouteError{
        message: string
    }

    const error = useRouteError() as RouteError;
    console.log(error);

    return(
        <div className="text-center">
            <h1 className="">404</h1>
            <span className="">Ops!!! Não encontramos a página</span>
        </div>
    )
}