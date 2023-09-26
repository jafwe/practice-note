import { type ReactNode } from 'react'

// need to learn how to completely write a button

interface ButtonProps {
  children: ReactNode
}

export default function Button ( { children }: ButtonProps ) {
  return (
    <button className={'rounded-xl bg-blue-800 hover:bg-blue-900 font-bold shadow-2xl p-1'}>
      { children }
    </button>
  )
}