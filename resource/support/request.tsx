import Link from 'next/link'

import { RequestForm, SearchForm } from '@/components/form'

export default function RequestPage() {
  function onSubmit() {
    try {
    } catch (e) {}
  }

  return (
    <div className={'bg-subtle w-full pt-16'} id={'top'}>
      <div className={'mx-auto flex max-w-[1160px] flex-col justify-start px-10 pb-10 pt-5'}>
        <div className={'mb-[52px] flex w-full justify-between'}>
          {/* Breadcrumb */}
          <div className={'flex items-center'}>
            <Link href={'/support'} className={'text-primary h-[42px] py-[11px] text-start text-sm hover:underline'}>
              {'Support Center'}
            </Link>
            <div className={'text-text-hint mx-2  text-sm'}>{'>'}</div>
            <div className={'text-text-hint h-[42px] py-[11px] text-start text-sm'}>{'Submit a request'}</div>
          </div>
          {/* Search input */}
          <SearchForm formClassName={'max-w-[300px]'} inputClassName={'border-[#00000033]'} />
        </div>

        <RequestForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}
