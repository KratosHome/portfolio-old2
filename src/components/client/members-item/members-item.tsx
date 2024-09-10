'use client'
import { FC } from 'react'
import { ButtonCircle } from '@/components/UI/button-circle/button-circle'
import Link from 'next/link'
import Image from 'next/image'
import { RxAvatar } from 'react-icons/rx'

interface MembersItemProps {
  item: any
}

const MembersItem: FC<MembersItemProps> = ({ item }) => {
  console.log('item', item)
  return (
    <div className="background-item relative mb-[24px] overflow-hidden rounded-2xl border border-stone-500/30 px-[24px] py-[12px]">
      <div className="flex">
        <Link
          href={`${item._id}`}
          className="z-10 mb-4 transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-500"
        >
          {item.userLogo ? (
            <Image
              src={item.userLogo}
              alt={`user logo  ${item.username}`}
              width={100}
              height={100}
              className="size-[100px] rounded-full object-cover"
            />
          ) : (
            <RxAvatar className="size-12" />
          )}
        </Link>
        <div>
          <div>{item.username}</div>
          <div className="text-[#0B66F5]">
            Experience: {item.workExperience} years
          </div>
        </div>
        <div>dscd</div>
        <div>
          <div>{item.role}</div>
          <div>Senior</div>
        </div>
      </div>
      <div>d</div>
      <div>
        <ButtonCircle title={'profile'} className="bg-black/60" />
        <ButtonCircle title={'join'} />
      </div>
    </div>
  )
}

export default MembersItem
