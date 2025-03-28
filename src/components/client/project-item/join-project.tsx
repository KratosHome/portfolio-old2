import React, { FC, useRef, useState } from 'react'
import { useLocale } from 'use-intl'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { verifyCaptcha } from '@/server/verifyCaptcha'
import { messageMe } from '@/server/telegram/message-me.server'
import { toast } from 'react-toastify'
import { Loader } from '@/components/UI/client/loader/loader'
import { ButtonCircle } from '@/components/UI/client/button-circle/button-circle'
import { Modal } from '@/components/UI/client/modal/modal'
import { Input } from '@/components/UI/client/input/input'

interface JoinProjectProps {
  open: boolean
  setClose: (value: boolean) => void
}

export const JoinProject: FC<JoinProjectProps> = ({ open, setClose }) => {
  const locale = useLocale()
  const t = useTranslations('home-page.HireMe')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<any>()

  const [loading, setLoading] = useState<boolean | undefined>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  async function handleCaptchaSubmission(token: string | null) {
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false))
  }

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true)
    const sendData = {
      type: 'hire',
      locale: locale,
      name: data.name,
      email: data.email,
      number: data.phone,
      message: data.message,
    }
    if (isVerified) {
      const result = await messageMe(sendData)
      if (result?.success) {
        toast(`${t('The message has been sent')}`, {
          type: 'success',
        })
        reset()
        setClose(false)
      } else {
        toast(`${t("Something happened, it's sad!")}`, {
          type: 'error',
        })
      }
    }
    setLoading(false)
  }

  return (
    <>
      {loading && <Loader />}
      <Modal
        isOpen={open}
        onClose={() => setClose(false)}
        className="flex flex-col justify-end rounded-lg border-b border-black bg-[127deg] bg-gradient-to-r from-[rgba(11,102,245,0.30)] via-[rgba(78,128,206,0.15)] to-transparent px-3 backdrop-blur-[12.5px] lg:px-8"
      >
        <div className="w-[300px] lg:w-[400px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type={'text'}
                placeholder={t('name')}
                name={'name'}
                register={{
                  ...register('name', {
                    required: `${t('This field is required')}`,
                    minLength: {
                      value: 4,
                      message: `${t('Minimum number of characters')} 4`,
                    },
                    maxLength: {
                      value: 50,
                      message: `${t('Maximum number of characters')} 50`,
                    },
                  }),
                }}
                error={errors.name?.message}
              />
              <Input
                type={'text'}
                placeholder={t('email')}
                name={'email'}
                register={{
                  ...register('email', {
                    required: `${t('This field is required')}`,
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      message: `${t('This is not an email')}`,
                    },
                  }),
                }}
                error={errors.email?.message}
              />
              <Input
                type={'phone'}
                placeholder={t('phone')}
                name={'phone'}
                control={control}
                rules={{
                  required: `${t('This field is required')}`,
                  pattern: {
                    value: /^\+\d{2}\s?\(\d{3}\)\s?\d{3}-\d{4}$/,
                    message: `${t('Invalid phone number format')}`,
                  },
                }}
                error={errors.phone?.message}
              />
              <textarea
                className={`mt-[12px] h-[125px] w-full resize-none rounded-[8px] border-[1px] border-white bg-transparent px-[8px] py-[14px] text-[16px] text-[white] placeholder-[#FAFAFA]`}
                placeholder={t('message')}
                {...register('message', {
                  required: false,
                })}
              />
            </div>
            <div className="flex flex-col items-center">
              <ReCAPTCHA
                className="recaptcha"
                sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
                hl={locale}
              />
              <ButtonCircle title={t('send')} className="mt-3" />
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
