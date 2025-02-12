import Script from 'next/script'
import 'primeicons/primeicons.css'
import { Header } from '../components/Header'
import { Roboto } from '../styles/fonts'
// import { Footer } from '../components/Footer'
// import { YandexMaps } from '../components/YandexMaps'
// import { ActionButton } from '../components/ActionButton'

export function MainLayout({ children }) {

  return (
    <div  className='relative w-full'>
      <Script
        type="text/javascript" 
        id="hs-script-loader" 
        async 
        defer 
        src='https://stells.info/assets/js/partner.fire.js'
      />
      <Script src='https://script.click-chat.ru/chat.js?wid=ae9850ec-f277-4ead-b094-4be22b38ea2b' />
      <Header />
      <main className={`${Roboto.className} py-2 px-8 w-full`}>
        {children}
      </main>
      {/* <Footer />
      <YandexMaps center={[44.692609, 37.779309]} zoom={15} />
      <ActionButton /> */}
    </div>
  )
}
