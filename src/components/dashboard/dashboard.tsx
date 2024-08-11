'use client'
import { FC } from 'react'

export const Dashboard: FC<any> = ({ dashboard }) => {
  console.log(dashboard)
  return (
    <div>
      <ul>
        {dashboard.map((item: any, index: number) => (
          <li key={index}>{item.title}</li>
        ))}
        <li>log out</li>
      </ul>
      <div>avatar</div>
    </div>
  )
}
