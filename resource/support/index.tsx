import { Accordion, Icon, type AccordionContent } from '@/components/base'
import { SearchForm } from '@/components/form'

export default function HelpPage() {
  const supports = [
    {
      icon: <Icon name={'Announcement'} size={96} />,
      title: 'Announcements'
    },
    {
      icon: <Icon name={'Setup'} size={96} />,
      title: 'Account Setup & Configuration'
    },
    {
      icon: <Icon name={'FAQ'} size={96} />,
      title: 'FAQs'
    }
  ]

  const getStartedContent: AccordionContent[] = [
    {
      title: 'Signing up for an account',
      links: ['1', '2', '3']
    },
    {
      title: 'Mobile platform installation',
      links: ['1', '2', '3']
    },
    {
      title: 'Subscription & payment',
      links: ['1', '2', '3']
    },
    {
      title: 'Key features',
      links: ['1', '2', '3']
    }
  ]

  return (
    <div className={'bg-subtle flex w-full flex-col justify-center pt-16'} id={'top'}>
      <div className={'bg-support-center h-[350px]'}>
        <div className={'flex h-full w-full flex-col items-center bg-[#00000033] px-16'}>
          <div className={'my-auto flex w-full flex-col items-center gap-5'}>
            <div className={'text-4xl font-semibold tracking-wide text-white'}>{'Support Center'}</div>

            <SearchForm formClassName={'max-w-[600px]'} inputClassName={'border-[#00000033]'} />
          </div>
        </div>
      </div>

      <div className={'mx-auto flex w-full max-w-[1160px] flex-col justify-center gap-16 p-16'}>
        <div className={'flex flex-col gap-4'}>
          <span className={'text-text-title mb-5 text-4xl font-semibold tracking-[0.015em]'}>{'Getting Started'}</span>
          <Accordion className={'mx-auto'} label={'Signing up for an account'} content={getStartedContent} />
        </div>

        <div className={'flex flex-col gap-4'}>
          <span className={'text-text-title mb-5 text-4xl font-semibold tracking-[0.015em]'}>{'Further Support'}</span>
          <div className={'flex items-center justify-center gap-10'}>
            {supports.map((item, index) => (
              <div
                key={index}
                className={
                  'shadow-help-card hover:shadow-card-hover flex h-[250px] w-[250px] cursor-pointer justify-center'
                }
              >
                <div className={'my-auto flex flex-col items-center gap-4'}>
                  {item.icon}
                  <span className={'text-text-title text-xl font-medium'}>{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
