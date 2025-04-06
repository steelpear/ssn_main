import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { MainLayout } from '../components/MainLayout'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Loader } from '../components/Loader'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function PopularTours() {
  const router = useRouter()
  const items = [{ label: 'Популярные туры' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }
  const { data: tours } = useSWR('/api/tours/gettours', fetcher, { revalidateOnFocus: false })

  const tourTemplate = (tour) => (
    <div key={tour._id} className='flex align-items-center my-3'>
      <img src={tour.img[0]} alt={tour.name} className='w-2 mr-4 border-round-lg shadow-2 cursor-pointer' onClick={() => router.push(`/tour/${tour.slug}`)} />
      <div>
        <div className='text-xl text-blue-700 font-semibold cursor-pointer line-height-1' onClick={() => router.push(`/tour/${tour.slug}`)}>{tour.name}</div>
        <div className='hidden lg:block surface-overlay white-space-nowrap overflow-hidden text-overflow-ellipsis' style={{width:500}}>{tour.description.replace(/(<([^>]+)>)/ig, '')}</div>
      </div>
    </div>)

  if (!tours) return <Loader />

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Популярные туры</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='mt-2 px-4 lg:px-8'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center mt-4 mb-6'>Популярные туры</div>
          <div className='flex flex-column flex-wrap gap-4 justify-content-start my-6'>
            {tours && tours.map(tour => tourTemplate(tour))}
          </div>
          <div className='text-center pb-3 pt-6'><Link href='/tickets' className='inline-block'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link></div>
        </main>
      </MainLayout>
    </>
  ) 
}
