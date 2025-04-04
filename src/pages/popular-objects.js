import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { MainLayout } from '../components/MainLayout'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Rating } from 'primereact/rating'
import { Loader } from '../components/Loader'
import { Manrope } from '../styles/fonts'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function PopularObjects() {
  const router = useRouter()
  const items = [{ label: 'Популярные объекты' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }
  const { data: objects } = useSWR('/api/hotels/getpublichotels', fetcher, { revalidateOnFocus: false })

  const objectTemplate = (object) => (
    <div key={object._id} className='col-12 md:col-5 surface-100 border-round-lg shadow-2'>
      <div className='grid grid-nogutter w-full pt-1'>
        <div className='col-12 xl:col-6'>
          <img src={(object.img && object.img.length > 0) ? object.img[0] : '/nophoto.jpg'} alt={object.name} className='mr-4 border-round-lg shadow-2 cursor-pointer w-full max-h-full xl:max-h-9rem' onClick={() => router.push(`/hotel/${object.slug}?p=${object.best}`)} />
        </div>
        <div className='col-12 xl:col-6 pl-3 relative'>
          <div className={`${Manrope.className} pt-2 md:pt-0 text-base text-blue-700 font-semibold cursor-pointer line-height-1 mb-2`} onClick={() => router.push(`/hotel/${object.slug}?p=${object.best}`)}>{object.name}</div>
          {object.stars && <Rating value={object.stars} stars={object.stars} readOnly cancel={false} pt={{ onIcon: {style: {color: 'gold', width: '.9rem' }}}} />}
          <div className='text-sm'>{object.city}</div>
          <div className='inline-block'>
            <div className='flex align-items-center surface-0 border-round-md px-2 inline-block py-2 mt-2 shadow-1'>
              <i className='pi pi-wallet mr-2' style={{ fontSize: '1.2rem', color: 'slateblue' }} />
              <div className='line-height-1'>
                <div className='text-sm font-medium'>от {object.price} ₽</div>
                <div className='text-xs'>{object.dprice}</div>
              </div>
            </div>
          </div>
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
          <div className='text-3xl text-700 font-medium text-center mt-4 mb-5'>Популярные объекты</div>
          <div className='grid gap-4 flex justify-content-center py-4'>
            {objects && objects.map(object => objectTemplate(object))}
          </div>
          <Link href='/tickets' className='block text-center my-4'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link>
        </main>
      </MainLayout>
    </>
  ) 
}
