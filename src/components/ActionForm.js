import { useState, useRef } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputMask } from 'primereact/inputmask'
import { Toast } from 'primereact/toast'

export const ActionForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const emailToast = useRef(null)

  const mailer = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await fetch('/api/sendemail', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({text: `
          ${name}
          ${phone}
          ${comment}
        `})
      }) 
      emailToast.current.show({severity:'info', summary: 'Запрос отправлен', detail: 'Мы обязательно свяжемся с Вами!', life: 3000})
    } catch (error) {
      emailToast.current.show({severity:'danger', summary: 'Ошибка!', detail: 'Что-то пошло не так...', life: 3000})
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={mailer}>
      <div className='grid'>
        <div className='col-12 md:col-12 lg:col-6 xl:col-6 flex flex-column gap-2'>
          <InputText id='name' type='text' placeholder='Имя' className='p-inputtext-lg w-full border-round-lg' value={name} onChange={(e) => setName(e.target.value)} required />
          <InputMask id='phone' type='phone' placeholder='Телефон' value={phone} onChange={(e) => setPhone(e.target.value)} mask='9 (999) 999-99-99'  className='p-inputtext-lg w-full border-round-lg' required />
        </div>
        <div className='col-12 md:col-12 lg:col-6 xl:col-6'>
          <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Комментарий' rows={3} cols={30} className='p-inputtext-lg border-round-lg w-full' />
        </div>
      </div>
      <Button label='Отправить' icon={isLoading ? 'pi pi-spin pi-sync' : 'pi pi-send'} size='large' raised type='submit' className='border-round-lg mt-2 w-full py-3' style={{background: '#FF8400', borderColor: '#FF931E'}} />
      <Toast ref={emailToast} position="top-center" />
    </form>
  )
}
