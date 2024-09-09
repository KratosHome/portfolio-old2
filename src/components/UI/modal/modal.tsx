'use client'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/utils/cn'
import { RxCross2 } from 'react-icons/rx'
import { useGSAP } from '@gsap/react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const [shouldRender, setShouldRender] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  useGSAP(
    () => {
      if (isOpen) {
        setShouldRender(true)
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          pointerEvents: 'auto',
        })

        gsap.fromTo(
          modalRef.current,
          {
            opacity: 0,
            scale: 0.9,
            rotate: -5,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.5,
            ease: 'power4.out',
            boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          },
        )
      } else if (!isOpen && shouldRender) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          pointerEvents: 'none',
        })

        gsap.to(modalRef.current, {
          opacity: 0,
          scale: 0.9,
          rotate: -5,
          duration: 0.3,
          ease: 'power4.in',
          onComplete: () => setShouldRender(false),
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        })
      }
    },
    { dependencies: [isOpen, shouldRender] },
  )

  return shouldRender ? (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black bg-opacity-50 opacity-0"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 max-h-[90vh] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 opacity-0 shadow-lg',
          className,
        )}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-blue-500 duration-300 hover:scale-125"
        >
          <RxCross2 />
        </button>
      </div>
    </>
  ) : null
}
