import {useRouter} from 'next/router'
import useSWR from 'swr'
import { Carousel } from 'primereact/carousel'
import { Button } from 'primereact/button'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const Reviewz = () => {
  const router = useRouter()
  const { data: reviews } = useSWR('/api/reviews/getreviews', fetcher, { revalidate: false })
  const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    },
    {
      breakpoint: '320px',
      numVisible: 1,
      numScroll: 1
    }
  ]
  const reviewTemplate = (review) => (
      <div className='m-2 px-2 md:px-4 py-3 border-round-2xl shadow-3 bg-white'>
        <div className='font-light text-base overflow-hidden text-overflow-ellipsis' style={{ width: '100%', height: '250px' }}>
          <div className='mb-2 text-base font-medium'>{review.name}</div>
          <div>{review.text}</div>
        </div>
        <div className='text-center cursor-pointer mt-3 text-blue-700'>Читать полностью</div>
      </div>)

  return (
    <main className='my-6 px-4 py-6 w-full' style={{backgroundColor: '#F5F6F9'}}>
      <div className='text-3xl text-700 font-medium ml-3 my-4 flex align-items-center justify-content-between'>
        <div>Отзывы наших клиентов</div>
        <div className='grid gap-3 mr-3'>
          <Button label='Все отзывы' severity='secondary' outlined pt={{ root: {className: 'border-round-xl px-4'}, label: {className: 'text-800'} }} onClick={() => router.push('/reviews')} />
          <Button label='Оставить отзыв' pt={{ root: {className: 'border-round-xl px-4', style: {backgroundColor: '#FF8400', borderColor: '#FF8400'}} }} />
        </div>
      </div>
      {reviews && <Carousel value={reviews} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={reviewTemplate} showIndicators={false} showNavigators={false} className='z-5' />}
    </main>
  )
}
   