import { FacebookIcon } from 'lucide-react'
import {  } from 'react'
import { FacebookShareButton } from 'react-share'

let sharedUrl = 'google.com'

export default function ShareLink () {


  return (
    <div className={'flex flex-col items-center grow p-3 gap-3'}>
      <div className={'text-[54px] mb-4'} >
        {'test content!'}
      </div>
      <div className={'text-[36px]'} >
        {'Share your mind!!'}
      </div>
      <div className={'mx-auto flex items-start '} >
        <FacebookShareButton
          url={ sharedUrl }
        >
          <FacebookIcon size={40} className={'rounded-full bg-blue-500 p-1'} />
        </FacebookShareButton>
      </div>

      <div className={'mx-auto w-[50%] h-auto flex text-justify p-3 \
        text-[24px] rounded-xl bg-rose-900/50'}>
        {`Comments: \
          Currently, only \'Links\' can be shared via button. Messages, quotes \
          or other personalized content can\'t be via this feature.` }
      </div>
    </div>
  )
}