'use client'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

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

  return (
    <div>
      {label && <label>{label}</label>}
      <div>
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...register}
        />
        {type === 'password' && <div onClick={toggleShowPassword}>ddd</div>}
        {error ? <div>{error}</div> : null}
      </div>
    </div>
  )
}
