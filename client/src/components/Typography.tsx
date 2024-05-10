import { ReactNode } from "react"

interface HeadingProps {
    children: ReactNode
}

export const Heading1 = ({children}: HeadingProps) => {
    return (
        <h1 className="uppercase leading-none m-[1rem_auto] text-[2.5rem] lg:text-[4rem]">
            {children}
        </h1>
    )
}

export const Heading2 = ({children}: HeadingProps) => {
    return (
        <h2 className="inline-block text-[1.7rem] lg:text-[2.5rem]">
            {children}
        </h2>
    )
}
export const Heading4 = ({children}: HeadingProps) => {
    return (
        <h4 className="font-[500] text-[1.2rem] mb-[1rem]">
            {children}
        </h4>
    )
}