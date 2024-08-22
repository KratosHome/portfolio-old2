'use client'
import './footer.scss'
import Link from 'next/link'
import arrowDown from '@/assets/icons/arrow-down.svg'
import ArrowRight from '@/assets/icons/ArrowRight.svg'
import Image from 'next/image'
import { Input } from '@/components/UI/input/input'
import { useLocale } from 'use-intl'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { ButtonCircle } from '@/components/UI/button-circle/button-circle'
import gitHubLight from '@/assets/icons/githubLight.svg'
import gitHub from '@/assets/icons/github.svg'
import linkedinLight from '@/assets/icons/linkedinLight.svg'
import linkedin from '@/assets/icons/linkedin.svg'
import telegramLight from '@/assets/icons/telegramLight.svg'
import telegram from '@/assets/icons/telegram.svg'
import { useTheme } from 'next-themes'
import ReCAPTCHA from 'react-google-recaptcha'
import { verifyCaptcha } from '@/server/verifyCaptcha'
import { messageMe } from '@/server/telegram/message-me.server'
import { Loader } from '@/components/UI/loader/loader'
import { toast } from 'react-toastify'

export const Footer = () => {
  const { theme } = useTheme()
  const locale = useLocale()
  const t = useTranslations('footer')
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()

  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean | undefined>(false)

  const year = new Date().getFullYear()

  async function handleCaptchaSubmission(token: string | null) {
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false))
  }

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true)
    const sendData = {
      type: 'footer message',
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
      } else {
        toast(`${t("Something happened, it's sad!")}`, {
          type: 'error',
        })
      }
    }
    setLoading(false)
  }

  return (
    <footer className="relative lg:pt-[250px]">
      {loading && <Loader />}
      <div className="absolute -top-[600px] left-[200px] -z-20 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:block" />
      <div className="absolute -right-[400px] -top-[400px] -z-20 hidden h-[1900px] w-[1900px] transform bg-hero-pattern lg:-top-[100px] lg:right-[200px] lg:block" />
      <div className="relative mx-auto max-w-[1442px] px-[24px]">
        <div className="flex flex-col items-end justify-end">
          <div className="animate-scale-in-out absolute -top-[55px] left-0 -z-20 size-[200px] -translate-x-1/2 bg-group-pattern opacity-[0.1] lg:size-[200px]" />
          <div className="text-[24px] uppercase lg:text-[64px] lg:font-light">
            {t('any-questions')}
          </div>
          <div className="text-[24px] text-[32px] font-bold text-[#0B66F5] lg:mt-[32px]">
            {t('Just fill out the form below')}
          </div>
          <Image className="mt-[83px]" src={arrowDown} alt={t('arrow down')} />
        </div>
      </div>
      <div className="mt-[155px] h-[1px] w-full bg-stone-500/30 lg:mt-[380px]" />
      <div className="relative h-10 min-h-max w-full">
        <div className="absolute -top-[45px] right-[0] max-w-[1445px] rotate-[25deg] justify-end lg:-top-[80px]">
          <div className="circle-footer absolute right-[100px] ml-[110px] mt-[70px] size-[55px] rounded-full bg-[rgba(255,255,255,0.3)] p-[55px] opacity-40 blur-2xl lg:size-[125px] lg:p-[135px]" />
          <div className="absolute right-[115px] ml-[120px] mt-[80px] size-[85px] rounded-full bg-black lg:size-[250px]" />
          <div className="planet-footer absolute right-[100px] z-10 ml-[80px] mt-[25px] size-[80px] rounded-full bg-white opacity-40 blur-2xl lg:h-40 lg:w-40"></div>
        </div>
      </div>
      <div className="relative mx-auto mt-[55px] max-w-[1442px] px-[24px]">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="lg:mr-[100px]">
            <div className="text-[34px] uppercase lg:text-[64px]">
              {t('Oleg-Tkach')}
            </div>
            <div className="mt-[121px]">
              <div className="text-[40px] font-bold text-[#0B66F5]">
                {t('contact-and')}
              </div>
              <div className="mt-[13px] text-[32px]">
                {t('watch your ideas turn into beautifully coded realities')}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="mr-3 mt-[60px] h-[1px] w-[289px] bg-[#FAFAFA]/50" />
              <div className="mt-[45px] flex flex-col items-center text-[20px]">
                <span>{t('let-connect')}</span>
                <Image
                  src={ArrowRight}
                  alt={t('arrow-right')}
                  width={90}
                  height={20}
                />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-[150px]">
            <div className="max-w-[400px]">
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
            <div className="mt-[24px] flex w-[300px] flex-col items-center justify-between px-10 lg:w-[500px] lg:flex-row lg:items-start lg:px-0">
              <ReCAPTCHA
                className="recaptcha"
                sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
              />
              <div className="mt-[22px] flex w-full items-end justify-end lg:mt-0">
                <ButtonCircle title={t('send')} />
              </div>
            </div>
          </form>
        </div>
        <div className="mb-[40px] mt-[62px] flex flex-col-reverse items-center justify-between gap-[20px] lg:flex-row">
          <div>
            (c) {year} {t('Oleg-Tkach')}
          </div>
          <div className="flex flex-row justify-between gap-[16px]">
            <a
              href="https://github.com/KratosHome"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="GitHub"
            >
              <Image
                className="!fill-amber-700 !stroke-red-500 transition-transform duration-300 hover:scale-[1.2]"
                src={theme === 'light' ? gitHubLight : gitHub}
                alt="github"
                width={40}
                height={40}
              />
            </a>
            <a
              className="block"
              href="https://www.linkedin.com/in/olegtkach101/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="LinkedIn"
            >
              <Image
                className="transition-transform duration-300 hover:scale-[1.2]"
                src={theme === 'light' ? linkedinLight : linkedin}
                alt="linkedin"
                width={40}
                height={40}
              />
            </a>
            <a
              href="https://t.me/KratosHome"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="Telegram"
            >
              <Image
                className="transition-transform duration-300 hover:scale-[1.2]"
                src={theme === 'light' ? telegramLight : telegram}
                alt="telegram"
                width={40}
                height={40}
              />
            </a>
          </div>
          <Link href={'privacy-policy'} className="">
            {t('Privacy Policy')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
