import { useState, useRef } from 'react'
import {useRouter} from 'next/router'
import useSWR from 'swr'
import { Carousel } from 'primereact/carousel'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Divider } from 'primereact/divider'
import { Rating } from 'primereact/rating'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { FloatLabel } from 'primereact/floatlabel'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const Reviewz = () => {
  const toast = useRef(null)
  const router = useRouter()
  const [moreDialog, setMoreDialog] = useState(false)
  const [addDialog, setAddDialog] = useState(false)
  const [review, setReview] = useState({
    img: '',
    name: '',
    city: '',
    date: '',
    text: '',
    rating: '5',
    public: null
  })
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

  const handleChange = e => {
    const { name, value } = e.target
    setReview(prevState => ({
        ...prevState,
        [name]: value
    }))}

  const openMoreDialog = (review) => {
    setReview(review)
    setMoreDialog(true)
  }

  const openAddDialog = (review) => {
    setReview({
      img: '',
      name: '',
      city: '',
      date: '',
      text: '',
      rating: '5',
      public: false
    })
    setAddDialog(true)
  }

  const mailer = async () => {
    try {
      await fetch('/api/reviews/mailer', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({text: `
          ${review.name}
          ${review.text}
        `})
      }) 
    } catch (error) {console.log(error)}
  }

  const sendReview = async () => {
    event.preventDefault()
    const res = await fetch('/api/reviews/addreview', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(review)
    })
    const response = await res.json()
    if (response) {mailer(); toast.current.show({severity:'success', summary: 'Отзыв отправлен', detail:'Спасибо, отзыв будет добавлен после модерации', life: 3000})}
    else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
    setAddDialog(false)
    setReview({
      img: '',
      name: '',
      city: '',
      date: '',
      text: '',
      rating: '5',
      public: false
    })
  }

  const footerContent = (<div className='text-left pt-3'>
    <div className='text-600'>{review && review.name}</div>
    <div className='text-600'>{review && review.city}{(review && review.date) && <span>&ensp;&bull;&ensp;{review && review.date}</span>}</div>
  </div>)

  const reviewTemplate = (review) => (
      <div className='m-2 px-3 lg:px-4 py-3 border-round-2xl shadow-3 bg-white'>
        <div className='text-base overflow-hidden text-overflow-ellipsis' style={{ width: '100%', height: '250px' }}>
          <div className='mb-2 text-base font-medium'>{review.name}</div>
          <div className='text-sm mb-2'>{review && review.city}{(review && review.date) && <span>&ensp;&bull;&ensp;{review && review.date}</span>}</div>
          <div className='text-base font-light'>{review.text}</div>
        </div>
        <div className='text-center cursor-pointer mt-3 text-blue-700' onClick={() => openMoreDialog(review)}>Читать полностью</div>
      </div>)

  return (
    <main className='mt-6 px-4 lg:px-7 pt-5 pb-7 w-full' style={{backgroundColor: '#F5F6F9'}}>
      <div className='text-3xl text-700 font-medium ml-3 my-4 flex align-items-center justify-content-between'>
        <div>Отзывы наших клиентов</div>
        <div className='grid gap-3 mr-3'>
          <Button label='Все отзывы' severity='secondary' outlined pt={{ root: {className: 'border-round-xl px-4'}, label: {className: 'text-800'} }} onClick={() => router.push('/reviews')} />
          <Button label='Оставить отзыв' pt={{ root: {className: 'border-round-xl px-4', style: {backgroundColor: '#FF8400', borderColor: '#FF8400'}} }} onClick={() => openAddDialog()} />
        </div>
      </div>
      {reviews && <Carousel value={reviews} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={reviewTemplate} showIndicators={false} showNavigators={false} className='z-5' />}
      {/* Показать полностью */}
      <Dialog visible={moreDialog} className='w-11 lg:w-6' footer={footerContent} onHide={() => {if (!moreDialog) return; setMoreDialog(false);}} pt={{ headerTitle: {className: 'text-lg'}, header: {className: 'pt-3 pb-0 px-3 border-round-top-3xl'}, footer: {className: ' border-round-bottom-3xl'}, closeButton: {className: 'bg-orange-500 border-none text-white'} }}>
        <Divider />
        <div className='flex align-items-center justify-content-between my-3 px-2'>
          <Rating value={review && review.rating} stars={review && review.rating} readOnly cancel={false} onIcon={<img src='/star.svg' alt='Star' width='28px' height='28px' />} />
          <img src='/quote.svg' alt='Quote' width='25px' height='40px' />
        </div>
        <div className='text-800 text-lg'>{review && review.text}</div>
      </Dialog>
      {/* Добавить отзыв */}
      <Dialog visible={addDialog} className='w-11 lg:w-6' footer={<></>} onHide={() => {if (!addDialog) return; setAddDialog(false);}} pt={{ headerTitle: {className: 'text-lg'}, content: {className: 'pb-1'}, header: {className: 'pt-3 pb-0 px-3 border-round-top-3xl'}, footer: {className: ' border-round-bottom-3xl'}, closeButton: {className: 'bg-orange-500 border-none text-white'} }}>
        <form onSubmit={sendReview}>
          <div className='grid gap-4 w-full pl-2 pt-4 pb-0'>
            <div className='w-full flex flex-column lg:flex-row gap-2 lg:gap-3 align-items-center'>
              <div className='col px-0'>
                <FloatLabel>
                  <InputText id='name' name='name' type='text' variant='filled' className='w-full p-inputtext-lg border-round-2xl' value={review.name} onChange={(e) => handleChange(e)} required />
                  <label htmlFor='name'>Имя</label>
                </FloatLabel>
              </div>
              <div className='col px-0'>
                <FloatLabel>
                  <InputText id='city' name='city' type='text' variant='filled' className='w-full p-inputtext-lg border-round-2xl' value={review.city} onChange={(e) => handleChange(e)} />
                  <label htmlFor='city'>Где отдыхали</label>
                </FloatLabel>
              </div>
            </div>
            <div className='w-full flex flex-column lg:flex-row gap-2 align-items-center'>
              <div className='col px-0'>
                <FloatLabel>
                  <InputText id='date' name='date' type='text' variant='filled' className='w-full p-inputtext-lg border-round-2xl' value={review.date} onChange={(e) => handleChange(e)} />
                  <label htmlFor='date'>Когда отдыхали</label>
                </FloatLabel>
              </div>
              <div className='col px-0 ml-0 lg:ml-4'>
                <Rating name='rating' value={review.rating} onIcon={<img src='/star.svg' alt='Star' width='28px' height='28px' />} offIcon={<img src='/star-outlined.svg' alt='Star' width='24px' height='24px' />} onChange={(e) => handleChange(e)} />
              </div>
            </div>
            <FloatLabel className='w-full'>
              <InputTextarea id='text' name='text' variant='filled' className='w-full p-inputtext-lg border-round-2xl' value={review.text} onChange={(e) => handleChange(e)} rows={3} cols={30} required />
              <label htmlFor='text'>Текст отзыва</label>
            </FloatLabel>
            <Button label='Отправить' type='submit' pt={{ root: {className: 'border-round-xl px-5', style: {backgroundColor: '#FF8400', borderColor: '#FF8400'}} }} raised />
          </div>
        </form>
      </Dialog>
      <Toast ref={toast} position='top-center' />
    </main>
  )
}
   