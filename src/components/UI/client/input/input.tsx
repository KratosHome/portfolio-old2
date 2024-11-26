'use client'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import eyesClose from '@/assets/icons/eyes-close.svg'
import eyesOpen from '@/assets/icons/eyes-open.svg'
import Image from 'next/image'
import MaskedInput from 'react-text-mask'
import { cn } from '@/utils/cn'
import { Controller } from 'react-hook-form'

interface myInputProps {
  label?: string
  type: 'text' | 'password' | 'email' | 'phone' | 'number' | 'textarea'
  placeholder: string
  name?: string
  register?: ReturnType<typeof useForm>['register'] | any
  error?: string | any
  value?: string | number | boolean
  onChange?: (e: any) => void
  disabled?: boolean
  password?: string
  className?: string
  min?: number
  control?: any
  max?: number
  rules?: any
}

export const Input: FC<myInputProps> = ({
  type,
  placeholder,
  register,
  error,
  label,
  name,
  value,
  onChange,
  disabled,
  password,
  className,
  min,
  max,
  control,
  rules,
}) => {
  const [inputType, setInputType] = useState<string>(type)

  const toggleShowPassword = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  const getPasswordStrength = (password: string) => {
    if (!password) return 0
    if (password.length < 6) return 1
    if (
      password.length >= 6 &&
      /\d+/.test(password) &&
      /[a-zA-Z]+/.test(password)
    )
      return 2
    if (
      password.length >= 8 &&
      /\d+/.test(password) &&
      /[a-zA-Z]+/.test(password) &&
      /[^a-zA-Z\d]+/.test(password)
    )
      return 3
    return 0
  }

  const renderPasswordStrengthBar = (level: number) => {
    return (
      <div className="mt-[12px] flex h-[20px] w-full justify-end gap-2">
        <div
          className={`h-[10px] w-[100px] rounded-full border border-white/40 ${level >= 3 ? 'bg-stone-500/60' : ''}`}
        />
        <div
          className={`h-[10px] w-[100px] rounded-full border border-white/40 ${level >= 2 ? 'bg-stone-500/60' : ''}`}
        />
        <div
          className={`h-[10px] w-[100px] rounded-full border border-white/40 ${level >= 1 ? 'bg-stone-500/60' : ''}`}
        />
      </div>
    )
  }

  const passwordStrengthLevel = getPasswordStrength(password || '')

  return (
    <div className={`relative ${className}`}>
      {label && <label className="text-[20px] lg:text-[28px]">{label}</label>}
      <div>
        {type === 'phone' && name ? (
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field }) => (
              <MaskedInput
                {...field}
                className={`mt-[12px] h-[48px] w-full rounded-[8px] border-[1px] border-black bg-transparent px-[8px] py-[14px] text-[16px] text-black placeholder-black dark:border-white dark:text-[white] dark:placeholder-[#FAFAFA] ${
                  error ? 'border-[#A80E0E]' : ''
                }`}
                mask={[
                  '+',
                  /\d/,
                  /\d/,
                  ' ',
                  '(',
                  /\d/,
                  /\d/,
                  /\d/,
                  ')',
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  '-',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                placeholder={placeholder}
                disabled={disabled}
              />
            )}
          />
        ) : type === 'textarea' ? (
          <textarea
            className={cn(
              `mt-[12px] min-h-[148px] w-full resize-none rounded-[8px] border-[1px] border-black bg-transparent px-[8px] py-[14px] text-[20px] text-black placeholder-black dark:border-white dark:text-[white] dark:placeholder-[#FAFAFA] lg:text-[16px]`,
              `${error ? 'border-[#A80E0E]' : ''}`,
            )}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...register}
          />
        ) : (
          <input
            className={cn(
              `lg:text-[16px]" mt-[12px] h-[48px] w-full rounded-[8px] border-[1px] border-black bg-transparent px-[8px] py-[14px] text-[20px] text-black placeholder-black dark:border-white dark:text-[white] dark:placeholder-[#FAFAFA] lg:text-[16px]`,
              `${error ? 'border border-[#A80E0E]' : ''}`,
            )}
            min={min}
            max={max}
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...register}
          />
        )}
        {type === 'password' && (
          <div onClick={toggleShowPassword}>
            <Image
              className="absolute right-[15px] top-[60px] h-[18px] w-[18px] cursor-pointer lg:top-[72px]"
              src={inputType === 'password' ? eyesClose : eyesOpen}
              alt="eyes"
            />
          </div>
        )}
        {error ? (
          <div className="z-30 text-[20px] font-light text-[#A80E0E]">
            {error}
          </div>
        ) : null}
        {type === 'password' && (
          <> {renderPasswordStrengthBar(passwordStrengthLevel)}</>
        )}
      </div>
    </div>
  )
}
