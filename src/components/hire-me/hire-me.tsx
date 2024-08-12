'use client'
import { ButtonCircle } from '@/components/UI/button-circle/button-circle'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/UI/input/input'
import ReCAPTCHA from 'react-google-recaptcha'
import { verifyCaptcha } from '@/server/verifyCaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'
import { messageMe } from '@/server/telegram/message-me.server'
import { toast } from 'react-toastify'
import { useLocale } from 'use-intl'
import { Modal } from '@/components/UI/modal/modal'

export const HireMe: FC<any> = ({ title }) => {
  const locale = useLocale()
  const t = useTranslations('HireMe')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()

  const [open, setClose] = useState<boolean>(false)
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
      <div onClick={() => setClose(true)}>
        <ButtonCircle title={title} />
      </div>
      <Modal isOpen={open} onClose={() => setClose(false)}>
        fvsdfvd
      </Modal>
    </>
  )
}

/*
      <ModalBody className="flex flex-col justify-end bg-[linear-gradient(127deg,rgba(11,102,245,0.30)_49.23%,rgba(78,128,206,0.15)_83.27%,rgba(255,255,255,0)_102.62%)] px-3 backdrop-blur-[12.5px] lg:px-8">
        <ModalContent className="p-0" key="unique-modal-key">
          <h2 className="text-center text-[40px] font-bold uppercase text-[#0B66F5]">
            Contact Me
          </h2>
          <button
            onClick={() => contextType.setOpen(false)}
            className="right-0 top-0 bg-red-400 p-3"
          >
            asdvs
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                className="pb-5"
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
                className="pb-5"
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
                className="pb-5"
                type={'phone'}
                placeholder={t('phone')}
                name={'phone'}
                register={{
                  ...register('phone', {
                    required: `${t('This field is required')}`,
                    pattern: {
                      value: /^\+\d{2} \(\d{3}\) \d{3}-\d{4}$/,
                      message: `${t('Invalid phone number format')}`,
                    },
                  }),
                }}
                error={errors.phone?.message}
              />
              <textarea
                className={`mt-[12px] h-[125px] w-full resize-none rounded-[8px] border-[1px] border-white px-[8px] py-[14px] text-[16px] text-[white] placeholder-[#FAFAFA]`}
                placeholder={t('message')}
                {...register('message', {
                  required: false,
                })}
              />
            </div>
            <div className="mt-[20px] flex flex-col items-center">
              <ReCAPTCHA
                className="recaptcha"
                sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
              />
              <div className="mt-[20px]">
                <ButtonCircle title={t('send')} />
              </div>
            </div>
          </form>
        </ModalContent>
      </ModalBody>
 */
