import Head from 'next/head'
import Link from 'next/link'
import { BreadCrumb } from 'primereact/breadcrumb'
import { MainLayout } from '../components/MainLayout'
import { TransportLogos } from '../components/TransportLogos'
import { Partners } from '../components/Partners'

export default function About() {
  const items = [{ label: 'О компании' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / О компании</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 px-7'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-800 text-3xl font-semibold my-5'>О компании</div>
          <div className='text-lg text-800 mb-6'>
            <p>Туристическая компания «ПРО100-ТУР» предлагает услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы.</p>
            <p>Для вас мы ищем и сравниваем лучшие предложения по турам, отелям и авиа- ЖД/билетам.</p>
            <p>История фирмы зародилась в 2015 году и успешно развивалась, собирая в команду лучших специалистов по путешествиям. Сильный прорыв произошел в легендарном 2020 году, когда по причине всем известных событий с распространением новой короновирусной инфекции (COVID-2019), пришлось перейти на удаленный формат работы. Тогда закрылись многие турфирмы и отличные опытное специалисты остались без работы. С этого периода для нас стало возможным, собрать лучшую команду из разных уголков земли, имеющих собственный опыт путешествий и перелетов.</p>
            <p>Партнеры также предложили удобные сервисы для бронирования онлайн, без поездок в офис, без поиска парковок, с возможностью сразу оформить тур с перелетом или поездкой на поезде.</p>
          </div>
          <div className='text-800 text-3xl font-semibold my-5'>Почему нам доверяют клиенты</div>
          <div className='text-lg text-800 mb-7'>
            <p>Мы очень тщательно выбираем себе партнеров и работаем только с лучшими, это компании проверенные временем, такие как:</p>
            <TransportLogos />
            <div className='text-800 text-center text-2xl font-semibold my-5'>Наши партнёры</div>
            <Partners />
          </div>
        </main>
      </MainLayout>
    </>
  ) 
}
