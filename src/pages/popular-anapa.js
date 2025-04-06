import Head from 'next/head'
import Link from 'next/link'
import useScript from '../useScript'
import { MainLayout } from '../components/MainLayout'
import { Top3 } from '../components/Top3'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Anapa() {

  useScript('static/partner.fire.js')

  const items = [
    { template: () => <Link href='/popular-directions' className='no-underline'>Популярные направления</Link> },
    { label: 'Семейный отдых в Анапе' }
  ]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Семейный отдых в Анапе</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 mt-2 px-4 lg:px-8'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center my-5'>Семейный отдых в Анапе</div>
          <img src='/anapa.jpg' alt='Семейный отдых в Анапе' width='100%' height={'100%'} className='shadow-2 border-round-sm' />
          <div className='text-lg my-3'>
            <span className='font-medium'>Анапа</span>: незабываемый семейный отдых! Солнечные пляжи, теплое море,  развлечения для детей и взрослых – все это ждет вас в Анапе!  Идеальное место для семейного отдыха с малышами и подростками.  Выбирайте комфортабельное жилье,  отправляйтесь на экскурсии, наслаждайтесь морскими прогулками и создавайте незабываемые воспоминания вместе с семьей!
          </div>
          <Top3 best='an' />
          <div className='s-partnership mb-4' style={{display:'none'}}>gZywdgP8UdNi6hwL1KCvaoPtMC6l6k6ix1EyfdMVoDw%3D</div>
          <div className='text-center pb-3 pt-6'><Link href='/tickets' className='inline-block'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link></div>
        </main>
      </MainLayout>
    </>
  ) 
}
