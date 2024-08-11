'use client'
import { FC } from 'react'
import logOutIcon from '@/assets/dashboard/log out.png'
import logUser from '@/assets/dashboard/users.png'
import Link from 'next/link'

export const Dashboard: FC<any> = ({ dashboard }) => {
  console.log(dashboard)
  return (
    <div className="flex flex-col justify-between border border-r-red-400">
      <ul>
        {dashboard.map((item: any, index: number) => (
          <li key={index}>
            <Link href={`/admin/${item.link}`}>{item.title}</Link>
          </li>
        ))}
        <li>log out</li>
      </ul>
      <div>avatar</div>
    </div>
  )
}
