import * as React from 'react'
import { Controller, type Control, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form'

import { cn } from '@/utils/classnames'
import { Icon } from '@/components/base'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded border border-gray-400 bg-white p-[10px] shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

interface FormInputProps<T extends FieldValues, U extends FieldPath<T>> extends InputProps {
  label: string
  name: U
  control: Control<T>
  optional?: boolean
  rules?: RegisterOptions<T, U>
  hint?: string
}

export function FormInput<T extends FieldValues, U extends FieldPath<T>>({
  name,
  label,
  type,
  control,
  rules,
  hint,
  className,
  optional = false,
  ...props
}: FormInputProps<T, U>) {
  const [inputType, setInputType] = React.useState(type)

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => (
        <div className={'text-text-label flex w-full flex-col gap-1 text-start'}>
          <label htmlFor={name} className={'self-start whitespace-nowrap text-sm'}>
            {label}
            {optional && <span className={'text-text-hint'}>{'(optional)'}</span>}
          </label>

          <div className={'relative'}>
            <Input id={name} type={inputType} className={className} {...field} {...props} />
          </div>

          {fieldState.error && fieldState.error.message !== '' && (
            <div className={'bg-background-danger text-danger border-danger flex gap-1 rounded border p-1 text-xs'}>
              <Icon name={'Alert'} size={14} />
              {fieldState.error.message}
            </div>
          )}
          {hint && <span className={'text-text-hint text-xs'}>{hint}</span>}
        </div>
      )}
    />
  )
}

interface SearchInputProps<T extends FieldValues, U extends FieldPath<T>> extends InputProps {
  name: U
  control: Control<T>
}

export function SearchInput<T extends FieldValues, U extends FieldPath<T>>({
  name,
  type,
  control,
  className,
  ...props
}: SearchInputProps<T, U>) {
  const [inputType, setInputType] = React.useState(type)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={'text-text-label flex w-full flex-col gap-1 text-start'}>
          <div className={'relative'}>
            <Icon name={'Search'} size={18} className={cn('absolute left-3 h-full text-gray-500')} />
            {field.value !== '' && (
              <button
                type={'button'}
                className={cn(
                  'text-text-label hover:bg-background absolute right-0 h-full rounded-r-full px-4 hover:text-white focus:border focus:border-black'
                )}
                onClick={() => field.onChange('')}
                tabIndex={-1}
              >
                <Icon name={'Close'} size={14} />
              </button>
            )}
            <Input
              id={name}
              type={inputType}
              className={cn('rounded-full pl-[40px] text-sm focus:border', className)}
              placeholder={'Search'}
              {...field}
              {...props}
            />
          </div>
        </div>
      )}
    />
  )
}
