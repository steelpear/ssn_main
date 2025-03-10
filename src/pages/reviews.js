import { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { MainLayout } from '../components/MainLayout'
import { ReviewzBar } from '../components/ReviewzBar'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Dialog } from 'primereact/dialog'
import { Divider } from 'primereact/divider'
import { Rating } from 'primereact/rating'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Reviews() {
  const toast = useRef(null)
  const [moreDialog, setMoreDialog] = useState(false)
  const [review, setReview] = useState({
    img: '',
    name: '',
    city: '',
    date: '',
    text: '',
    rating: '5',
    public: null
  })
  const items = [{ label: 'Отзывы' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }
  const { data: reviews } = useSWR('/api/reviews/getreviews', fetcher, { revalidateOnFocus: false })

  const openMoreDialog = (review) => {
    setReview(review)
    setMoreDialog(true)
  }

  const footerContent = (<div className='text-left pt-3'>
    <div className='text-sm text-800'>{review && review.name}</div>
    <div className='text-base font-semibold'>{review && review.city}{(review && review.date) && <span>&ensp;&bull;&ensp;{review && review.date}</span>}</div>
  </div>)

  const reviewTemplate = (review) => (
    <div key={review._id} className='col lg:col-5 p-3 border-round-2xl shadow-3 bg-white'>
      <div className='overflow-hidden text-overflow-ellipsis' style={{ width: '100%', height: '273px' }}>
      <div className='mb-0 text-base font-medium text-800'>{review.name}</div>
      <div className='text-base text-800 font-semibold mb-3'>{review && review.city}{(review && review.date) && <span>&ensp;&bull;&ensp;{review && review.date}</span>}</div>
      <div className='text-base font-normal text-800'>{review.text}</div>
      </div>
      <div className='text-sm text-center uppercase font-semibold cursor-pointer mt-4 text-blue-800' onClick={() => openMoreDialog(review)}>Читать полностью</div>
    </div>)

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Отзывы наших клиентов</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='mt-2 px-4 md:px-5 lg:px-8'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none ml-7'}}} />
          <div className='text-center text-3xl text-700 font-medium mt-4 mb-6'>Отзывы наших клиентов</div>
          <div className='flex flex-column lg:flex-row flex-wrap gap-4 justify-content-center'>
            {reviews && reviews.map(review => reviewTemplate(review))}
          </div>
          <div className='text-center text-3xl text-700 font-medium my-4'>Оставить отзыв</div>
          <Dialog visible={moreDialog} className='w-11 lg:w-6' footer={footerContent} onHide={() => {if (!moreDialog) return; setMoreDialog(false);}} pt={{ headerTitle: {className: 'text-lg'}, header: {className: 'pt-3 pb-0 px-3 border-round-top-3xl'}, footer: {className: ' border-round-bottom-3xl'}, closeButton: {className: 'bg-orange-500 border-none text-white'} }}>
            <Divider />
            <div className='flex align-items-center justify-content-between my-3 px-2'>
              <Rating value={review && review.rating} stars={review && review.rating} readOnly cancel={false} onIcon={<img src='/star.svg' alt='Star' width='28px' height='28px' />} />
              <img src='/quote.svg' alt='Quote' width='25px' height='40px' />
            </div>
            <div className='text-800 text-base'>{review && review.text}</div>
          </Dialog>
        </main>
        <ReviewzBar />
      </MainLayout>
    </>
  ) 
}
