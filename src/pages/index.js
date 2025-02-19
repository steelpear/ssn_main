import Head from "next/head" 
import { MainLayout } from '../components/MainLayout'
import { Reviewz } from '../components/Reviewz'
import useScript from '../useScript'
import { PopularDirections } from '../components/PopularDirections'
import { ActionFormSection } from '../components/ActionFormSection'

export default function Home() {

  useScript('static/partner.fire.js')

  return (
    <>
      <Head>
        <title>Организация спортивных сборов в Краснодарском крае</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content={`Спортивные сборы в Краснодарском крае ${new Date().getFullYear()}. Компания «Про100-Тур» предлагает базы отдыха, детские лагеря и пансионаты для проведения спортивных и тренировочных сборов в Краснодарском крае.`} />
        <meta property="og:title" content="Организация спортивных сборов в Краснодарском крае" />
        <meta property="og:description" content={`Спортивные сборы в Краснодарском крае ${new Date().getFullYear()}. Компания «Про100-Тур» предлагает базы отдыха, детские лагеря и пансионаты для проведения спортивных и тренировочных сборов в Краснодарском крае.`} />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800'>
          <div className="text-center text-700 text-3xl font-semibold my-6">ПРО100-ТУР - Ваш идеальный отдых – от мечты до реальности!</div>
          <div className='text-xl text-800 font-normal mb-4 px-7'>На нашем сайте вы найдете огромный выбор туров по всему миру: от пляжного отдыха до экстремальных приключений.  Используйте удобный поиск по направлениям, датам и бюджету.  Узнайте о горящих турах и специальных предложениях!</div>
          <PopularDirections />
          <section className='px-7'>
            <div className='text-3xl text-700 font-medium text-center mt-4'>Поиск туров</div>
            <div className='pt-4 mb-3 ml-2 s-partnership w-full flex justify-content-center' style={{display:'none'}}>1lfkWbUBGRHAhwNX11e1EPDYRc%2FZim6IqCdP12kmWCE%3D</div>
          </section>
          <ActionFormSection px={7} />
          <Reviewz />
        </main>
      </MainLayout>
    </>
  ) 
}
