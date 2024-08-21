export const base64ToFile = (base64: string, filename: string): File => {
  const byteString = atob(base64.split(',')[1])
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
  return new File([blob], filename, { type: 'application/pdf' })
}
