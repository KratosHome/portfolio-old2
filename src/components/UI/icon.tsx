import React from 'react'
import ArrowLeftIcon from '@/assets/icons/arrow-left'
import ArrowRightIcon from '@/assets/icons/arrow-right'

type IconName = 'arrowLeft' | 'arrowRight'

const icons: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const SvgIcon = icons[name]

  if (!SvgIcon) {
    return null
  }

  return <SvgIcon {...props} />
}

export default Icon
