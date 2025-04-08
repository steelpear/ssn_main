import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Link from 'next/link'
import { MainLayout } from '../components/MainLayout'
import { directions } from '../components/directions'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function PopularDirections() {
  const router = useRouter()
  const items = [{ label: 'Популярные направления' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  const directionTemplate = (direction, index) => (
    <div key={index} className='flex align-items-center my-3'>
      <img src={direction.img} alt={direction.name} className='w-3 mr-4 border-round-lg shadow-2 cursor-pointer' onClick={() => router.push(direction.path)} />
      <div>
        <div className='text-xl text-blue-700 font-semibold cursor-pointer line-height-1 mb-1' onClick={() => router.push(direction.path)}>{direction.name}</div>
        <div className='hidden lg:block surface-overlay white-space-nowrap overflow-hidden text-overflow-ellipsis' style={{width:600}}>{direction.description.replace(/(<([^>]+)>)/ig, '')}</div>
        <div className='text-base text-blue-700 cursor-pointer mt-2' onClick={() => router.push(direction.path)}>Подробнее...</div>
      </div>
    </div>)

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Популярные направления</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='mt-2 px-4 lg:px-8'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center mt-4'>Популярные направления</div>
          <div className='flex flex-column flex-wrap gap-4 justify-content-start my-6'>
            {directions.map((direction, index) => directionTemplate(direction, index))}
          </div>
          <div className='text-center pb-3 pt-6'><Link href='/tickets' className='inline-block'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link></div>
        </main>
      </MainLayout>
    </>
  ) 
}
