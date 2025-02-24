import Head from 'next/head'
import Link from 'next/link'
import useScript from '../useScript'
import { MainLayout } from '../components/MainLayout'
import { Top3 } from '../components/Top3'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Crimea() {

  useScript('static/partner.fire.js')

  const items = [{ label: 'Курорты Крыма' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Курорты Крыма</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 px-7'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center my-5'>Курорты Крыма</div>
          <img src='/crimea.jpg' alt='Курорты Крыма' width='100%' height={450} className='shadow-2 border-round-sm' />
          <div className='text-lg my-3'>
            <span className='font-medium'>Крым</span>: жемчужина отдыха у моря! Откройте для себя волшебство Крыма!  Многообразие курортов – от фешенебельных Ялты и Алушты до уютных Коктебеля и Судака – подарит незабываемые впечатления.  Чистейшие пляжи, величественные горы, исторические достопримечательности и гостеприимные жители ждут вас!  Выбирайте свой идеальный курорт и наслаждайтесь отдыхом на берегу Черного моря!
          </div>
          <Top3 best='cr' />
          <div className='s-partnership mb-4' style={{display:'none'}}>jx9tyNsvV6LNedhcztMWjq2UATGNVCdM%2BDSFHsxbNbA%3D</div>
        </main>
      </MainLayout>
    </>
  ) 
}
