import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { MainLayout } from '../components/MainLayout'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Rating } from 'primereact/rating'
import { Loader } from '../components/Loader'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function PopularObjects() {
  const router = useRouter()
  const items = [{ label: 'Популярные объекты' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }
  const { data: objects } = useSWR('/api/hotels/getpublichotels', fetcher, { revalidateOnFocus: false })

  const objectTemplate = (object) => (
    <div key={object._id} className='flex flex-column md:flex-row align-items-start my-3'>
      <img src={(object.img && object.img.length > 0) ? object.img[0] : '/nophoto.jpg'} alt={object.name} className='mr-4 border-round-lg shadow-2 cursor-pointer' style={{width: 250, height: 148}} onClick={() => router.push(`/hotel/${object.slug}?p=${object.best}`)} />
      <div>
        <div className='pt-2 md:pt-0 text-xl text-blue-700 font-semibold cursor-pointer line-height-1 mb-2' onClick={() => router.push(`/hotel/${object.slug}?p=${object.best}`)}>{object.name}</div>
        {object.stars && <Rating value={object.stars} stars={object.stars} readOnly cancel={false} pt={{ onIcon: {style: {color: 'gold', width: '1rem' }}}} />}
        <div className='text-base mt-1'>{object.city}</div>
        <div className='surface-200 border-round-md px-3 py-1 mt-2 inline-block'>
          <div className='text-sm font-medium'>от {object.price} ₽</div>
          <div className='text-xs'>{object.dprice}</div>
        </div>
      </div>
    </div>)

  if (!objects) return <Loader />

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Популярные объекты</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='mt-2 px-4 lg:px-8'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center mt-4 mb-6'>Популярные объекты</div>
          <div className='flex flex-column flex-wrap gap-2 justify-content-start my-6'>
            {objects && objects.map(object => objectTemplate(object))}
          </div>
          <Link href='/tickets' className='block text-center py-3'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link>
        </main>
      </MainLayout>
    </>
  ) 
}
