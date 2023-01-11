import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function Error() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            {error && (
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            )}
        </div>
    );
}
