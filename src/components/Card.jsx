import React from "react";

export function Card({children}){
    return (
        <main className="card">
            <>{children}</>
        </main>
    )
}