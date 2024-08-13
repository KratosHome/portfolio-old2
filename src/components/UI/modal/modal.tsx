'use client'
import { FC, ReactNode, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/utils/cn'
import { RxCross2 } from 'react-icons/rx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className: string
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: 'auto',
      })
      gsap.fromTo(
        modalRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
      )
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none',
      })
      gsap.to(modalRef.current, { y: -50, opacity: 0, duration: 0.5 })
    }
  }, [isOpen])

  return (
    <>
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-50 bg-black bg-opacity-50 opacity-0"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 opacity-0 shadow-lg',
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
  )
}
