import Head from "next/head" 
import { MainLayout } from '../components/MainLayout'
import { Reviewz } from '../components/Reviewz'
import useScript from '../useScript'
import { PopularDirections } from '../components/PopularDirections'
import { ActionFormSection } from '../components/ActionFormSection'
import { ToursPanel } from '../components/ToursPanel'

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
          <div className='text-xl text-800 font-normal my-4 px-4 lg:px-7'>На нашем сайте вы найдете огромный выбор туров по всему миру: от пляжного отдыха до экстремальных приключений.  Используйте удобный поиск по направлениям, датам и бюджету.  Узнайте о горящих турах и специальных предложениях!</div>
          <ToursPanel />
          <PopularDirections />
          <section className='px-4 lg:px-7'>
            <div className='text-3xl text-700 font-medium text-center mt-4'>Поиск туров</div>
            <div className='pt-4 mb-3 ml-0 lg:ml-2 s-partnership w-full flex justify-content-center' style={{display:'none'}}>1lfkWbUBGRHAhwNX11e1EPDYRc%2FZim6IqCdP12kmWCE%3D</div>
            {/* <div className="s-partnership" data-site-id="13372" data-integration-type="finder_hotels" data-param-person-reserve="pseudo" data-param-touragency-reserve="none" data-param-show-finder="1" data-param-show-video="1" data-param-show-commission="0" style={{display:'none'}}></div> */}
          </section>
          <ActionFormSection />
          <Reviewz />
        </main>
      </MainLayout>
    </>
  ) 
}
