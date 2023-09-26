import { type ReactNode } from 'react'
import { Inter } from 'next/font/google'
import SideBar from '@/components/SideBar'
import MainContent from '@/components/MainContent'

const inter = Inter({ subsets: ['latin'], fallback: ['sans-serif'], variable: '--inter' })

interface MainProps {
    children: ReactNode
}

export default function Layout({ children }: MainProps) {

    return (
        <main className={'flex'}>
            <SideBar />
            <MainContent>
                {children}
            </MainContent>
        </main>
    )
}