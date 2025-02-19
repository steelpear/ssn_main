import Script from 'next/script'
import 'primeicons/primeicons.css'
import { Header } from '../components/Header'
import { Roboto } from '../styles/fonts'
import { Footer } from '../components/Footer'

export function MainLayout({ children }) {

  return (
    <div  className='relative w-full'>
      <Script src='https://script.click-chat.ru/chat.js?wid=ae9850ec-f277-4ead-b094-4be22b38ea2b' />
      <Header />
      <main className={Roboto.className}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
