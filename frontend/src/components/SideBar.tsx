import { clsx } from 'clsx'
import { useState, type ReactNode, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import Icon from '@/components/Icon'

export default function SideBar () {
  const [sideBarisClose, setSideBarisClose] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', () => setSideBarisClose(true))
    return (() => { router.events.off('routeChangeComplete', () => setSideBarisClose(true)) })
  }, [setSideBarisClose, router]) 
  
  return (
    <>
      <aside className={
        clsx(
          'absolute z-20 flex basis-60 flex-col bg-gray-900 p-4 gap-4',
          'h-full transition-transform',
          sideBarisClose && 'translate-x-[-100%]',
        )
      }>
        <div 
          className={'flex justify-end inline-block mb-2'}
        >
          <button 
            className={`transition ${ sideBarisClose && 'invisible' }`}
            onClick={() => setSideBarisClose(true)}
          >
            <Icon name={'ArrowLeftFromLine'} size={'21px'} />
          </button>
          
          <button 
            className={`absolute -right-8 transition duration-150 ${!sideBarisClose && 'hidden' }`}
            onClick={() => setSideBarisClose(false)}
          >
            <Icon name={'Menu'} size={'21px'} />
          </button>
        </div>

        {/* Practice router.push and <Link /> */}
        {/* When encounter external URL, use 'window.location' instead */}
        <button 
          className={'rounded-xl bg-blue-800 hover:bg-blue-900 font-bold shadow-2xl p-2'}
          onClick={() => router.push('/')}
        >
          {'Back to Home'}
        </button>

        <button 
          className={'rounded-xl bg-blue-800 hover:bg-blue-900 font-bold shadow-2xl p-2'}
          onClick={() => router.push('/content/')}
        >
          {'Content'}
          {/* <Link href={'/content'}>
            {'Content'}
          </Link> */}
        </button>

        <button 
          className={'rounded-xl bg-blue-800 hover:bg-blue-900 font-bold shadow-2xl p-2'}
          onClick={() => router.push('/content/getBalance')}
        >
          {'getBalance'}
        </button>

      </aside>
    </>
  )
}