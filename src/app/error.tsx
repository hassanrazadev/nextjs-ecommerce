"use client";
import React, {useEffect} from 'react';

function Error({
   error,
   reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    return (
        <main className={"px-32 py-16"}>{error.message}</main>
    );
}

export default Error;