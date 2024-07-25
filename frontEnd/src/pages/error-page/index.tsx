import { useRouteError } from "react-router-dom";

export function ErrorPage(){
    const error:any = useRouteError();

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