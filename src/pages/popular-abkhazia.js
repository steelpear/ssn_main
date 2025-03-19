import Head from 'next/head'
import Link from 'next/link'
import useScript from '../useScript'
import { MainLayout } from '../components/MainLayout'
import { Top3 } from '../components/Top3'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Abkhazia() {

  useScript('static/partner.fire.js')

  const items = [
    { template: () => <Link href='/popular-directions' className='no-underline'>Популярные направления</Link> },
    { label: 'Курорты Абхазии' }
  ]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Курорты Абхазии</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 mt-2 px-4 lg:px-8'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center my-5'>Курорты Абхазии</div>
          <img src='/abkhazia.jpg' alt='Курорты Абхазии' width='100%' height={'100%'} className='shadow-2 border-round-sm' />
          <div className='text-lg my-3'>
            <span className='font-medium'>Абхазия</span>: отдых в стране души! Откройте для себя красоту и гостеприимство Абхазии!  Уникальная природа,  чистейшее Черное море,  величественные горы,  древние крепости и уютные курортные городки – все это ждет вас.  Отдых в Абхазии – это возможность насладиться спокойствием,  прикоснуться к истории и почувствовать неповторимый колорит этой гостеприимной страны.
          </div>
          <Top3 best='ab' />
          <div className='s-partnership mb-4' style={{display:'none'}}>MIA2C6ZOC69VBOLTHUUT0MZohNpUUAt1AJZPK05mGto%3D</div>
          <Link href='/tickets' className='block text-center py-3'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link>
        </main>
      </MainLayout>
    </>
  ) 
}
