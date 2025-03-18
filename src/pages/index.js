import Head from "next/head" 
import { MainLayout } from '../components/MainLayout'
import { Reviewz } from '../components/Reviewz'
import useScript from '../useScript'
import { PopularBar } from '../components/PopularBar'
import { ActionFormSection } from '../components/ActionFormSection'

export default function Home() {

  useScript(process.env.NEXT_PUBLIC_SCRIPT_URL)

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР»</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 w-full'>
          <div className='text-xl line-height-1 text-800 font-medium py-5 px-4 lg:px-8' style={{backgroundColor: '#F5F6F9'}}>
            <div className='my-2'><i className='pi pi-check font-bold mr-2' style={{ color: '#FF8400', fontSize: '1.5rem' }} />На нашем сайте вы найдете огромный выбор туров по всему миру: от пляжного отдыха до экстремальных приключений!</div>
            <div className='my-2'><i className='pi pi-check font-bold mr-2' style={{ color: '#FF8400', fontSize: '1.5rem' }} />Используйте удобный поиск по направлениям, датам и бюджету.</div>
            <div className='my-2'><i className='pi pi-check font-bold mr-2' style={{ color: '#FF8400', fontSize: '1.5rem' }} />Узнайте о горящих турах и специальных предложениях!</div>
          </div>
          <PopularBar />
          <section className='px-4 lg:px-8'>
            <div className='text-3xl text-700 font-medium text-center mt-4'>Поиск туров</div>
            <div className='pt-4 mb-3 s-partnership w-full flex justify-content-center' style={{display:'none'}}>1lfkWbUBGRHAhwNX11e1EPDYRc%2FZim6IqCdP12kmWCE%3D</div>
          </section>
          <ActionFormSection />
          <Reviewz />
        </main>
      </MainLayout>
    </>
  ) 
}
