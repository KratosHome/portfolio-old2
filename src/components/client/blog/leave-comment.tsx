'use client'
import { FC, useRef, useState } from 'react'
import { useLocale } from 'use-intl'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { verifyCaptcha } from '@/server/verifyCaptcha'
import { toast } from 'react-toastify'
import { addComments } from '@/server/blog/add-commetns'
import { useStore } from '@/store/user'
import Link from 'next/link'
import { Loader } from '@/components/UI/client/loader/loader'
import { ButtonCircle } from '@/components/UI/client/button-circle/button-circle'
import { Modal } from '@/components/UI/client/modal/modal'
import { Input } from '@/components/UI/client/input/input'

export const LeaveComment: FC<any> = ({ postId }) => {
  const locale = useLocale()
  const { user } = useStore()
  const t = useTranslations('post-client')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>()

  const [open, setClose] = useState<boolean>(false)
  const [openIsUser, setCloseIsUser] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean | undefined>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  async function handleCaptchaSubmission(token: string | null) {
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false))
  }

  const openModal = () => {
    if (user) {
      setClose(true)
    } else {
      setCloseIsUser(true)
    }
  }

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setLoading(true)
    const sendData = {
      userId: user?._id,
      postId: postId,
      author: user?.username,
      userLogo: user?.userLogo,
      locale: locale,
      message: data.message,
    }
    if (isVerified) {
      const result = await addComments(sendData)
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
      <div
        onClick={openModal}
        className="!z-50 mt-[115px] flex cursor-pointer justify-end"
        style={{
          zIndex: 50,
        }}
      >
        <ButtonCircle title={'LEAVE COMMENT'} className="!z-30" />
      </div>
      <Modal
        isOpen={open}
        onClose={() => setClose(false)}
        className="flex flex-col justify-end rounded-lg border-b border-black bg-[127deg] bg-gradient-to-r from-[rgba(11,102,245,0.30)] via-[rgba(78,128,206,0.15)] to-transparent px-3 backdrop-blur-[12.5px] lg:px-8"
      >
        <div className="w-[300px] lg:w-[400px]">
          <h2 className="text-center text-[40px] font-bold uppercase text-[#0B66F5]">
            {t('leave-comment')}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type={'textarea'}
                placeholder={t('message')}
                name={'message'}
                register={{
                  ...register('message', {
                    required: `${t('This field is required')}`,
                    minLength: {
                      value: 10,
                      message: `${t('Minimum number of characters')} 10`,
                    },
                    maxLength: {
                      value: 1000,
                      message: `${t('Maximum number of characters')} 1000`,
                    },
                  }),
                }}
                error={errors.message?.message}
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
      <Modal
        isOpen={openIsUser}
        onClose={() => setCloseIsUser(false)}
        className="flex flex-col justify-end rounded-lg border-b border-black bg-[127deg] bg-gradient-to-r from-[rgba(11,102,245,0.30)] via-[rgba(78,128,206,0.15)] to-transparent px-3 backdrop-blur-[12.5px] lg:px-8"
      >
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold">{t('please log in')}</h2>
          <p className="mt-4">
            {t('You must be logged in to leave a like or dislike.')}
          </p>
          <Link
            href="/login"
            className="mt-6 block rounded-lg bg-blue-500 px-6 py-2 text-white shadow-md transition-all duration-200 hover:bg-blue-600"
            onClick={() => setCloseIsUser(false)}
          >
            {t('sign in')}
          </Link>
        </div>
      </Modal>
    </>
  )
}
