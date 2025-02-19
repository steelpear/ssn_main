import { useState, useRef } from 'react'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import { Carousel } from 'primereact/carousel'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Divider } from 'primereact/divider'
import { Rating } from 'primereact/rating'
import { Toast } from 'primereact/toast'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const Reviewz = () => {
  const toast = useRef(null)
  const router = useRouter()
  const [moreDialog, setMoreDialog] = useState(false)
  const [review, setReview] = useState(null)
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

  const openMoreDialog = (review) => {
    console.log(review)
    setReview(review)
    setMoreDialog(true)
  }

  const footerContent = (<div className='text-left pt-3'>
    <div className='text-600'>{review && review.name}</div>
    <div className='text-600'>{review && review.city}{(review && review.date) && <span>&ensp;&bull;&ensp;{review && review.date}</span>}</div>
  </div>)

  const reviewTemplate = (review) => (
      <div className='m-2 px-2 md:px-4 py-3 border-round-2xl shadow-3 bg-white'>
        <div className='text-base overflow-hidden text-overflow-ellipsis' style={{ width: '100%', height: '250px' }}>
          <div className='mb-2 text-base font-medium'>{review.name}</div>
          <div className='text-sm mb-2'>{review && review.city}{(review && review.date) && <span>&ensp;&bull;&ensp;{review && review.date}</span>}</div>
          <div className='text-base font-light'>{review.text}</div>
        </div>
        <div className='text-center cursor-pointer mt-3 text-blue-700' onClick={() => openMoreDialog(review)}>Читать полностью</div>
      </div>)

  return (
    <main className='mt-6 px-7 pt-5 pb-7 w-full' style={{backgroundColor: '#F5F6F9'}}>
      <div className='text-3xl text-700 font-medium ml-3 my-4 flex align-items-center justify-content-between'>
        <div>Отзывы наших клиентов</div>
        <div className='grid gap-3 mr-3'>
          <Button label='Все отзывы' severity='secondary' outlined pt={{ root: {className: 'border-round-xl px-4'}, label: {className: 'text-800'} }} onClick={() => router.push('/reviews')} />
          <Button label='Оставить отзыв' pt={{ root: {className: 'border-round-xl px-4', style: {backgroundColor: '#FF8400', borderColor: '#FF8400'}} }} />
        </div>
      </div>
      {reviews && <Carousel value={reviews} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={reviewTemplate} showIndicators={false} showNavigators={false} className='z-5' />}
      <Dialog visible={moreDialog} style={{ width: '50vw' }} footer={footerContent} onHide={() => {if (!moreDialog) return; setMoreDialog(false);}} pt={{ headerTitle: {className: 'text-lg'}, header: {className: 'pt-3 pb-0 px-3 border-round-top-3xl'}, footer: {className: ' border-round-bottom-3xl'}, closeButton: {className: 'bg-orange-500 border-none text-white'} }}>
        <Divider />
        <div className='flex align-items-center justify-content-between my-3 px-2'>
          <Rating value={review && review.rating} stars={review && review.rating} readOnly cancel={false} onIcon={<img src='/star.svg' alt='Star' width='28px' height='28px' />} />
          <img src='/quote.svg' alt='Quote' width='25px' height='40px' />
        </div>
        <div className='text-800 text-lg'>{review && review.text}</div>
      </Dialog>
    </main>
  )
}
   