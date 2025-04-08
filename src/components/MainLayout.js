import Script from 'next/script'
import { Header } from '../components/Header'
import { Roboto } from '../styles/fonts'
import { Footer } from '../components/Footer'
import { YandexMetrikaContainer } from '../components/YandexMetrikaContainer'

const analyticsEnabled = !!(process.env.NODE_ENV === 'production')

export function MainLayout({ children }) {

  return (
    <>
      <div className='w-full'>
        <Script src='https://script.click-chat.ru/chat.js?wid=ae9850ec-f277-4ead-b094-4be22b38ea2b' />
        <Header />
        <main className={Roboto.className}>
          {children}
        </main>
        <Footer />
      </div>
      <YandexMetrikaContainer enabled={analyticsEnabled} />
    </>
  )
}
