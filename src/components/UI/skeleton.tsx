import { cn } from '@/utils/cn'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-400/30', className)}
      {...props}
    />
  )
}

export { Skeleton }
