import { type ReactNode } from 'react'

interface MainProps {
    children: ReactNode
}

export default function MainContent ( { children }: MainProps ) {
    return (
        <div className={'flex justify-center grow'}>
            {children}
        </div>
    )
}