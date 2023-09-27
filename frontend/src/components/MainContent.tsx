import { type ReactNode } from 'react'

interface MainProps {
    children: ReactNode
}

export default function MainContent ( { children }: MainProps ) {
    return (
        <div className={'flex justify-center grow w-screen h-screen bg-cyan-800'}>
            {children}
        </div>
    )
}