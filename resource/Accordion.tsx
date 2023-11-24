import { useState } from 'react'
import router from 'next/router'

import { cn } from '@/utils/classnames'
import { Icon } from '@/components/base'

export interface AccordionContent {
  title: string
  links: string[]
}

interface AccordionProps {
  label: string
  content: AccordionContent[]
  className?: string
  labelClassName?: string
}

export function Accordion({ content, className = '', labelClassName = 'text-text-label' }: AccordionProps) {
  const [istoggleUp, setIsToggleUp] = useState<number>(-1)

  return (
    <div className={cn('flex w-full max-w-[640px] flex-col gap-4 rounded bg-white text-sm', className)}>
      {content.length &&
        content.map((item, index) => (
          <div
            key={index}
            className={cn(
              'max-h-[52px] rounded border border-black transition-all duration-300',
              istoggleUp === index && 'max-h-[1000px]'
            )}
          >
            <div
              className={cn(
                'text-text-label z-20 flex h-[50px] cursor-pointer items-center justify-between px-4 py-3 transition-colors duration-300',
                istoggleUp === index ? 'rounded-t bg-[#62A0A84D] ' : 'rounded'
              )}
              onClick={() => {
                if (index !== istoggleUp) {
                  setIsToggleUp(index)
                } else {
                  setIsToggleUp(-1)
                }
              }}
            >
              <span className={labelClassName}>{item.title}</span>
              <Icon
                name={'ChevronDown'}
                size={20}
                className={cn('text-black transition duration-300', istoggleUp === index && 'rotate-180')}
              />
            </div>
            <div
              className={cn(
                'flex flex-col gap-5 px-10 py-4 transition-all',
                index === istoggleUp ? 'h-auto border-t border-black opacity-100' : 'h-0 border-0 py-0 opacity-0'
              )}
            >
              {item.links.map((link, idx) => {
                console.log(link)
                return (
                  <div
                    key={idx * 100}
                    className={cn(
                      'text-submit hover:text-primary cursor-pointer text-start transition-all',
                      index === istoggleUp ? 'h-auto opacity-100' : 'h-0 p-0 opacity-0'
                    )}
                    onClick={() => router.push(`/support/${link}/${link}`)}
                  >
                    {link}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
    </div>
  )
}
