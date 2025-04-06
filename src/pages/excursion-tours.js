import Head from 'next/head'
import Link from 'next/link'
import useScript from '../useScript'
import { MainLayout } from '../components/MainLayout'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function excursionTours() {
  const items = [{ label: 'Экскурсионные туры' }]
  const home = { template: () => <Link href='/'><i className='pi pi-home' /></Link> }

  useScript('static/tourtrans.js')

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Экскурсионные туры</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='mt-2 w-full'>
          <div className='px-3 lg:px-8'>
            <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
            <div className='text-3xl text-700 font-medium text-center my-4'>Экскурсионные туры</div>
            <div class="ttv-hottours" data-catalog-url="/excursion-tours"></div>
            <div class="ttv-search" data-catalog-url="/excursion-tours"></div>
            <div class="ttv-catalog" data-email="89886200970@mail.ru"></div>
          </div>
          <div className='text-center pb-3 pt-6'><Link href='/tickets' className='inline-block'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link></div>
        </main>
      </MainLayout>
    </>
  ) 
}
