import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { validation } from '@/constant/validation'
import { Button, FormInput, FormSelect, SelectItem } from '@/components/base'

interface RequestFormProps {
  onSubmit: () => void
}

interface Request {
  email: string
  name: string
  inquiryType: string
  subject: string
  description: string
  attachment?: File[]
}

const defaultValues: Request = {
  email: '',
  name: '',
  inquiryType: '',
  subject: '',
  description: ''
}
export function RequestForm({ onSubmit }: RequestFormProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<Request>({ defaultValues })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={'flex w-full max-w-[650px] flex-col justify-start gap-8 text-start'}
    >
      <span className={'text-text-label text-4xl font-bold'}>{'Submit a request'}</span>
      <FormInput
        control={control}
        name={'email'}
        label={'Your email address'}
        rules={{
          required: validation.required.message('Email'),
          validate: {
            email: (v) => validation.email.pattern.test(v) || validation.email.message()
          }
        }}
      />
      <FormInput
        control={control}
        name={'name'}
        label={'Full Name'}
        rules={{
          required: validation.required.message('Full Name')
        }}
        hint={'Please provide your full name'}
      />
      <FormSelect
        control={control}
        name={'inquiryType'}
        label={'Inquiry Type'}
        rules={{ required: validation.required.message('Inquiry Type') }}
        open={isSelectOpen}
        onOpenChange={(open) => {
          setIsSelectOpen(open)
        }}
      >
        <SelectItem value={'General Inquiry'}>{'General Inquiry'}</SelectItem>
        <SelectItem value={'Enterprise'}>{'Enterprise'}</SelectItem>
      </FormSelect>
      <FormInput
        control={control}
        name={'subject'}
        label={'Subject'}
        rules={{
          required: validation.required.message('Subject')
        }}
        hint={'Please enter your inquiry subject'}
      />
      <FormInput
        control={control}
        name={'description'}
        label={'Description'}
        rules={{
          required: validation.required.message('Description')
        }}
        hint={
          'Please enter the details of your request. A member of our support staff will respond as soon as possible.'
        }
      />
      <Button type={'submit'} variant={'submit'} className={'mt-10 w-[200px]'} disabled={isSubmitting}>
        {'Submit'}
      </Button>
    </form>
  )
}
