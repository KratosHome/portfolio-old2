export const formatDate = (
  date: Date | string,
  isTime: boolean = true,
): string => {
  const validDate = new Date(date)

  const day = validDate.getDate().toString().padStart(2, '0')
  const month = (validDate.getMonth() + 1).toString().padStart(2, '0')
  const year = validDate.getFullYear().toString()
  let timePart = ''

  if (isTime) {
    const hours = validDate.getHours().toString().padStart(2, '0')
    const minutes = validDate.getMinutes().toString().padStart(2, '0')
    timePart = ` о ${hours}.${minutes}`
  }

  return `${day}.${month}.${year}${timePart}`
}
