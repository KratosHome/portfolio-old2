'use client'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import eyesClose from '@/assets/icons/eyes-close.svg'
import eyesOpen from '@/assets/icons/eyes-open.svg'
import Image from 'next/image'

interface myInputProps {
  label?: string
  type: 'text' | 'password' | 'email' | 'phone'
  placeholder: string
  name: string
  register?: ReturnType<typeof useForm>['register'] | any
  error?: string | any
  value?: string | number | boolean
  onChange?: (e: any) => void
  disabled?: boolean
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

  const passwordStrengthLevel = getPasswordStrength(value?.toString() || '')

  return (
    <div className="relative">
      {label && <label className="text-[28px]">{label}</label>}
      <div>
        <input
          className="mt-[12px] h-[48px] w-[400px] rounded-[8px] border-[1px] border-white px-[8px] py-[14px] text-[16px] text-[white] placeholder-[#FAFAFA]"
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...register}
        />
        {type === 'password' && (
          <div onClick={toggleShowPassword}>
            <Image
              className="absolute right-[15px] top-[72px] h-[18px] w-[18px] cursor-pointer"
              src={inputType === 'password' ? eyesClose : eyesOpen}
              alt="eyes"
            />
          </div>
        )}
        {error ? <div className="absolute bg-red-400">{error}</div> : null}
        {inputType === 'password' && (
          <> {renderPasswordStrengthBar(passwordStrengthLevel)}</>
        )}
      </div>
    </div>
  )
}
