import Head from 'next/head'
import Link from 'next/link'
import useTutuScript from '../useTutuScript'
import { MainLayout } from '../components/MainLayout'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Tickets() {
  const items = [{ label: 'Билеты' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  useTutuScript('https://static.advcake.com/js/widgets/tutu/bundle.js?showLogo=true&showLogoTab=true&openNewTab=true&locale=ru&colorTheme=basic_white&utmLabels=https%3A%2F%2Fgo.2038.pro%2Fd8fe2294e2de1031%3Ferid%3DLdtCKAcNs%26dl%3D&formTabs=[0,1,2]&tabDef=0&avia=[,,,,,]&train=[,,,,,]&bus=[,,,,,]')

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
        <main className='mt-2 px-4 pb-6 lg:px-8'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center my-6'>Билеты</div>
          <div id='widget-container'></div>
        </main>
      </MainLayout>
    </>
  ) 
}
