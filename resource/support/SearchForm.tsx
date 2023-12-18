import { useForm } from 'react-hook-form'

import { cn } from '@/utils/classnames'
import { SearchInput } from '@/components/base'

interface searchFormProps {
  formClassName?: string
  inputClassName?: string
}

interface searchValue {
  keyword: string
}

const defaultValues: searchValue = {
  keyword: ''
}

export function SearchForm({ formClassName = '', inputClassName = '' }: searchFormProps) {
  const { control, handleSubmit } = useForm<searchValue>({ defaultValues })
  return (
    <form onSubmit={handleSubmit(() => {})} className={cn('flex w-full', formClassName)}>
      <SearchInput control={control} name={'keyword'} className={inputClassName} />
    </form>
  )
}
