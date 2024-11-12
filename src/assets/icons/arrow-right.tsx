import React from 'react'

export interface ISvg extends React.SVGProps<SVGSVGElement> {
  fill?: string
}

const ArrowLeft: React.FC<ISvg> = (props) => {
  return (
    <svg
      width="72"
      height="16"
      viewBox="0 0 72 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        id="Arrow 1"
        d="M71.2071 8.70711C71.5976 8.31658 71.5976 7.68342 71.2071 7.29289L64.8431 0.928932C64.4526 0.538408 63.8195 0.538408 63.4289 0.928932C63.0384 1.31946 63.0384 1.95262 63.4289 2.34315L69.0858 8L63.4289 13.6569C63.0384 14.0474 63.0384 14.6805 63.4289 15.0711C63.8195 15.4616 64.4526 15.4616 64.8431 15.0711L71.2071 8.70711ZM0.5 9H70.5V7H0.5V9Z"
        fill={props.fill || '#0B66F5'}
      />
    </svg>
  )
}

export default ArrowLeft
