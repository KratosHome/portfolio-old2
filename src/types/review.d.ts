import { StaticImageData } from 'next/image'

interface IReview {
  _id: number
  reviews: string
  userName: string
  position: string
  icon: string | StaticImageData
  link: string
}
