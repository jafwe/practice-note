import { clsx } from 'clsx'
import { useState, type ReactNode, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import Icon from '@/components/Icon'

type LinkType = {
  path: string,
  title: string,
  iconName: string,
}

export default function SideBar () {
  const [sideBarisClose, setSideBarisClose] = useState<boolean>(true)
  const router = useRouter()

  const links = useMemo<LinkType[]>(() => {
    return [
      {
        path: '/',
        title: 'Home',
        iconName: 'Home',
      },
      {
        path: '/content/bubble',
        title: 'Bubble',
        iconName: 'Home',
      },
      {
        path: '/content/sharelink',
        title: 'Share Link',
        iconName: 'CornerUpRight',
      },
      {
        path: '/content/getbalance',
        title: 'getBalance',
        iconName: 'DollarSign',
      },
      {
        path: '/content/weather',
        title: 'Weather',
        iconName: 'CloudSunRain',
      },
    ]
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', () => setSideBarisClose(true))
    return (() => { router.events.off('routeChangeComplete', () => setSideBarisClose(true)) })
  }, [setSideBarisClose, router]) 
  
  return (
    <>
      <aside className={
        clsx(
          'absolute z-20 flex basis-60 flex-col bg-gray-900 p-4 gap-4',
          'w-[20%] h-full transition-transform',
          sideBarisClose && 'translate-x-[-100%]',
        )
      }>
        <div 
          className={'flex justify-end mb-2'}
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
        {links.map((item, index) => (
          <div className={'mx-auto flex w-[80%] gap-3'}>
            <button 
              className={'w-full flex grow rounded-xl bg-blue-800 hover:bg-blue-900 font-bold \
                items-center shadow-2xl p-2 gap-2'}
              onClick={() => router.push(item.path)}
            >
              <Icon name={item.iconName} size={'24px'} />
              <div className={'w-full h-full flex justify-center'}>
                {item.title}
              </div>
            </button>
          </div>
        ))}

      </aside>
    </>
  )
}