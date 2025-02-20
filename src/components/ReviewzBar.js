import { useState, useRef } from 'react'
import { Button } from 'primereact/button'
import { Rating } from 'primereact/rating'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { FloatLabel } from 'primereact/floatlabel'

export const ReviewzBar = () => {
  const toast = useRef(null)
  const [review, setReview] = useState({
    img: '',
    name: '',
    city: '',
    date: '',
    text: '',
    rating: '5',
    public: null
  })

  const handleChange = e => {
    const { name, value } = e.target
    setReview(prevState => ({
        ...prevState,
        [name]: value
    }))}

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

  return (
    <main className='w-full flex justify-content-center' style={{backgroundColor: '#F5F6F9'}}>
      <form className='w-6' onSubmit={sendReview}>
        <div className='grid gap-4 my-4 py-4'>
          <div className='w-full flex gap-3 align-items-center'>
            <div className='col px-0'>
              <FloatLabel>
                <InputText id='name' name='name' type='text' className='w-full p-inputtext-lg border-round-2xl' value={review.name} onChange={(e) => handleChange(e)} required />
                <label htmlFor='name'>Имя</label>
              </FloatLabel>
            </div>
            <div className='col px-0'>
              <FloatLabel>
                <InputText id='city' name='city' type='text' className='w-full p-inputtext-lg border-round-2xl' value={review.city} onChange={(e) => handleChange(e)} />
                <label htmlFor='city'>Где отдыхали</label>
              </FloatLabel>
            </div>
          </div>
          <div className='w-full flex gap-2 align-items-center'>
            <div className='col px-0'>
              <FloatLabel>
                <InputText id='date' name='date' type='text' className='w-full p-inputtext-lg border-round-2xl' value={review.date} onChange={(e) => handleChange(e)} />
                <label htmlFor='date'>Когда отдыхали</label>
              </FloatLabel>
            </div>
            <div className='col px-0 ml-4'>
              <Rating name='rating' value={review.rating} onIcon={<img src='/star.svg' alt='Star' width='28px' height='28px' />} offIcon={<img src='/star-outlined.svg' alt='Star' width='24px' height='24px' />} onChange={(e) => handleChange(e)} />
            </div>
          </div>
          <FloatLabel className='w-full'>
            <InputTextarea id='text' name='text' className='w-full p-inputtext-lg border-round-2xl' value={review.text} onChange={(e) => handleChange(e)} rows={5} cols={30} required />
            <label htmlFor='text'>Текст отзыва</label>
          </FloatLabel>
          <Button label='Отправить' type='submit' pt={{ root: {className: 'border-round-xl px-5', style: {backgroundColor: '#FF8400', borderColor: '#FF8400'}} }} raised />
        </div>
      </form>
      <Toast ref={toast} position='top-center' />
    </main>
  )
}
   