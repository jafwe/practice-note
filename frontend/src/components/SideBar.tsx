import { clsx } from 'clsx'
import { useState, type ReactNode } from 'react'
import Button from '@/components/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SideBar () {
  const [sideBarisClose, setSideBarisClose] = useState<boolean>(false)
  const router = useRouter()

  return (
    <>
      <aside className={
        clsx('absolute z-10 flex basis-60 flex-col bg-gray-900 p-4 gap-2',
        sideBarisClose && 'translate-x-[-100%]',
        'transition-transform')
      }>
        <div 
          className={'flex justify-end gap-2 inline-block'}
        >
          <div 
            className={`${ sideBarisClose && 'hidden' }`}
            onClick={() => setSideBarisClose(true)}
          >{'《'}</div>
          
          <div 
            className={`absolute -right-8 ${!sideBarisClose && 'hidden' }`}
            onClick={() => setSideBarisClose(false)}
          >{'三'}</div>
        </div>
        <Button>
          <Link href={'/'}>
            {'Back to Home'}
          </Link>
        </Button>
        <Button>
          <Link href={'/content'}>
            {'Content'}
          </Link>
        </Button>
      </aside>
    </>
  )
}