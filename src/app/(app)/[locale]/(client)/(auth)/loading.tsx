import { LoaderPage } from '@/components/UI/loader-page/loader-page'

export default function loading() {
  return (
    <div
      className="container"
      style={{
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        height: '70vh',
        zIndex: 9999,
      }}
    >
      <LoaderPage />
    </div>
  )
}
