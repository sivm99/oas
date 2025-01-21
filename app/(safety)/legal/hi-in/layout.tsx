import React from "react";
import {Mukta} from "next/font/google"

const mukta = Mukta({
    weight: "400",
    subsets: ["devanagari"]
}) 

export default function HindiLayout({children}: {
    children: React.ReactNode
}){
    return (
        <main lang="hi-in" dir="ltr" className={mukta.className}>
        
            {children}
        </main>
    )
}