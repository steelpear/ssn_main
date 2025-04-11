import Script from 'next/script'
import { Header } from '../components/Header'
import { Roboto } from '../styles/fonts'
import { Footer } from '../components/Footer'
import { YandexMetrikaContainer } from '../components/YandexMetrikaContainer'

const analyticsEnabled = !!(process.env.NODE_ENV === 'production')

export function MainLayout({ children }) {

  return (
    <div className='w-full'>
      <Script src='https://script.click-chat.ru/chat.js?wid=affd5ad6-be0f-4d91-810b-a3f580a82fa1' />
      <Header />
      <main className={Roboto.className}>
        {children}
      </main>
      <Footer />
      <YandexMetrikaContainer enabled={analyticsEnabled} />
    </div>
  )
}
