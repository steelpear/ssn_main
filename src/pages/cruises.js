import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { BreadCrumb } from 'primereact/breadcrumb'
import { CruisBanner } from '../components/CruisBanner'
import { CruisesButtonsGroup } from '../components/CruisesButtonsGroup'
import { CruisesFAQ } from '../components/CruisesFAQ'
import { MainLayout } from '../components/MainLayout'

export default function Cruises() {
  const items = [{ label: 'Круизы' }]
  const home = { template: () => <Link href='/'><i className='pi pi-home' /></Link> }

  useEffect(() => {
    {window.awidgetInfo = {
      host: '//cruisenavigator.ru',
      agentId: '0367b872-2e94-4b94-b40f-b1e6dd9cde14',
      background: '#ffffff'
      }}
    const script = document.createElement('script')
    script.src = 'static/runner.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Круизы</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 mt-2 pb-4 px-4 lg:px-7'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center mt-4 mb-3'>Круизы: морские и речные приключения</div>
          <CruisBanner />
          <CruisesButtonsGroup />
          <div className='text-2xl text-700 font-medium text-center mt-6 mb-3'>Специальные предложения</div>
          <div className='flex justify-content-center'>
          </div>
          <div id='awidget'></div>
          <CruisesFAQ />
          <CruisesButtonsGroup />
        </main>
      </MainLayout>
    </>
  ) 
}
