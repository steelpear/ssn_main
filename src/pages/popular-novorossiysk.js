import Head from "next/head" 
import Link from 'next/link'
import useScript from '../useScript'
import { MainLayout } from '../components/MainLayout'
import { Top3 } from '../components/Top3'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Novorossiysk() {

  useScript('static/partner.fire.js')

  const items = [
    { template: () => <Link href='/popular-directions' className='no-underline'>Популярные направления</Link> },
    { label: 'Отдых в Новороссийске' }
  ]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Отдых в Новороссийске</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 mt-2 px-4 lg:px-8'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center my-5'>Отдых в Новороссийске</div>
          <img src='/novorossiysk.jpg' alt='Отдых в Новоросийске' width='100%' height={'100%'} className='shadow-2 border-round-sm' />
          <div className='text-lg my-3'>
            <span className='font-medium'>Новороссийский</span> морской порт — самый крупный в России и пятый в Европе по грузообороту. Здесь красивая природа и богатая история, однако главная сила притяжения в этом городе — море. Удачное географическое положение создаёт в окрестностях комфортный климат. Горы сдерживают сильные осадки, в бухте вода быстрее прогревается, а выход в открытое море приносит прохладные ветра.
          </div>
          <Top3 best='no' />
          <div className='s-partnership mb-4' style={{display:'none'}}>VJEKaEqMb2F9JNfYLSxU6gTz5ObYoZrJ2VAtbYGcFQ4%3D</div>
          <div className='text-center pb-3 pt-6'><Link href='/tickets' className='inline-block'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link></div>
        </main>
      </MainLayout>
    </>
  ) 
}
