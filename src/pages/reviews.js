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
  <div className='text-600'>{review && review.name}</div>
  <div className='text-600'>{review && review.city}{(review && review.date) && <span>&ensp;&bull;&ensp;{review && review.date}</span>}</div>
</div>)

  const reviewTemplate = (review) => (
    <div key={review._id} className='m-2 px-2 md:px-4 py-3 border-round-2xl shadow-3 bg-white w-5'>
      <div className='text-base overflow-hidden text-overflow-ellipsis' style={{ width: '100%', height: '243px' }}>
        <div className='mb-2 text-base font-medium'>{review.name}</div>
        <div className='text-sm mb-2'>{review && review.city}{(review && review.date) && <span>&ensp;&bull;&ensp;{review && review.date}</span>}</div>
        <div className='text-base font-light'>{review.text}</div>
      </div>
      <div className='text-center cursor-pointer mt-3 text-blue-700' onClick={() => openMoreDialog(review)}>Читать полностью</div>
    </div>)

  return (
    <>
      <Head>
        <title>Организация спортивных сборов в Краснодарском крае</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content={`Спортивные сборы в Краснодарском крае ${new Date().getFullYear()}. Компания «Про100-Тур» предлагает базы отдыха, детские лагеря и пансионаты для проведения спортивных и тренировочных сборов в Краснодарском крае.`} />
        <meta property="og:title" content="Организация спортивных сборов в Краснодарском крае" />
        <meta property="og:description" content={`Спортивные сборы в Краснодарском крае ${new Date().getFullYear()}. Компания «Про100-Тур» предлагает базы отдыха, детские лагеря и пансионаты для проведения спортивных и тренировочных сборов в Краснодарском крае.`} />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-center text-3xl text-700 font-medium mt-4 mb-6'>Отзывы наших клиентов</div>
          <div className='grid gap-3 justify-content-center'>
            {reviews && reviews.map(review => reviewTemplate(review))}
          </div>
          <div className='text-center text-3xl text-700 font-medium my-4'>Оставить отзыв</div>
          <ReviewzBar />
          <Dialog visible={moreDialog} style={{ width: '50vw' }} footer={footerContent} onHide={() => {if (!moreDialog) return; setMoreDialog(false);}} pt={{ headerTitle: {className: 'text-lg'}, header: {className: 'pt-3 pb-0 px-3 border-round-top-3xl'}, footer: {className: ' border-round-bottom-3xl'}, closeButton: {className: 'bg-orange-500 border-none text-white'} }}>
            <Divider />
            <div className='flex align-items-center justify-content-between my-3 px-2'>
              <Rating value={review && review.rating} stars={review && review.rating} readOnly cancel={false} onIcon={<img src='/star.svg' alt='Star' width='28px' height='28px' />} />
              <img src='/quote.svg' alt='Quote' width='25px' height='40px' />
            </div>
            <div className='text-800 text-lg'>{review && review.text}</div>
          </Dialog>
        </main>
      </MainLayout>
    </>
  ) 
}
