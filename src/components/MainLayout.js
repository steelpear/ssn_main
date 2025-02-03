import Script from 'next/script'
import 'primeicons/primeicons.css'
import { Header } from '../components/Header'
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
      <main className='px-6 py-2'>
        {children}
      </main>
      {/* <Footer />
      <YandexMaps center={[44.692609, 37.779309]} zoom={15} />
      <ActionButton /> */}
    </div>
  )
}
