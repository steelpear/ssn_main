import Head from 'next/head'
import Link from 'next/link'
import useCruScript from '../useCruScript'
import { BreadCrumb } from 'primereact/breadcrumb'
import { MainLayout } from '../components/MainLayout'

export default function Special() {
  const items = [{template: () => <Link className='no-underline' href='/cruises'>Круизы</Link>} , { label: 'Специальные предложения' }]

  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  useCruScript('static/runner.js')

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Круизы. Специальные предложения</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 mt-2 pb-4 px-4 lg:px-7'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center my-4'>Специальные предложения</div>
          <div className='text-800 text-lg mb-5'>
            <div id='awidget'></div>
          </div>
        </main>
      </MainLayout>
    </>
  ) 
}
