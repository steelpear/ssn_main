import Head from 'next/head'
import Link from 'next/link'
// import useScript from '../useScript'
import { MainLayout } from '../components/MainLayout'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Tickets() {
  const items = [{ label: 'Билеты' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  // useScript('/static/tickets.js')

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Билеты</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='mt-2 px-4 lg:px-8'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center mt-4'>Билеты</div>
          <wl-embedded-portal partnerId="pro100tur_wl"></wl-embedded-portal>
        </main>
      </MainLayout>
    </>
  ) 
}
