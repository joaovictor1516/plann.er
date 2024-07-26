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

            <p>Desculpa, aconteceu erro</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
        </div>
    )
}