import { useState, useRef} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Dialog } from 'primereact/dialog'
import { Card } from 'primereact/card'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import { Checkbox } from 'primereact/checkbox'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { Roboto } from '../styles/fonts'

export const Footer = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [checked, setChecked] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [feedbackDialog, setFeedbackDialog] = useState(false)
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
    <div className={`${Roboto.className} h-auto px-6 py-5 text-white footer-wrap`}>
      <div className='grid grid-nogutter w-full'>
        <div className='col-12 md:col-6 lg:col-4'>
          <div className='text-base'>
            <p><i className='pi pi-phone mr-2' /><a className='no-underline text-white' href='tel:+79886698337'>+7 (988) 669-83-37</a></p>
            <p><i className='pi pi-phone mr-2' /><a className='no-underline text-white' href='tel:+74951270565'>+7 (495) 127-05-65</a></p>
            <p><i className='pi pi-at mr-2' /><a className='no-underline text-white' href='mailto:89886200970@mail.ru'>89886200970@mail.ru</a></p>
            <p><i className='pi pi-map-marker mr-2' />353920, РФ, Краснодарский край,<br />г. Новороссийск, просп. Дзержинского, 183 (этаж 2, офис 10)</p>
          </div>
        </div>
        <div className='hidden lg:block col-12 lg:col-4 lg:text-center'>
          <Link href='/'><img src='/bird-white.png' alt='logo' className='w-4 py-3' /></Link>
        </div>
        <div className='col-12 md:col-6 lg:col-4 pl-0 md:pl-8'>
          <div className='text-base'>
            <div className='mb-1'>
              <a className='no-underline text-white' href='https://pro100tur.ru'>&copy; pro100tur.ru&ensp; 2016 - {new Date().getFullYear()}</a>
            </div>
            <div className='cursor-pointer text-white' onClick={() => router.push('/payment')}>Как оплатить</div>
            <div className='cursor-pointer text-white' onClick={() => router.push('/reviews')}>Отзывы</div>
            <div className='cursor-pointer text-white' onClick={() => router.push('/about')}>О нас</div>
            <div className='cursor-pointer text-white' onClick={() => setFeedbackDialog(true)}>Заказать обратный звонок</div>
            <div className='flex align-items-center mt-2 mb-1'>
              <Link href='https://wa.me/79886698337' target='_blank'><img src='/whatsapp.svg' alt='whatsapp' className='mr-3' style={{width: 35}} /></Link>
              <Link href='https://t.me/sanatoriiRU' target='_blank'><img src='/telegram.svg' alt='telegram' className='mr-3' style={{width: 38}} /></Link>
              <Link href='https://vk.com/pro100turr' target='_blank'><img src='/vk.png' alt='vk' style={{width: 35}} /></Link>
            </div>
            <Link href='/policy'>
              <div className='no-underline text-white-alpha-80 font-light text-xs line-height-1'>Политика конфиденциальности<br />и пользовательское соглашение</div>
            </Link>
          </div>
        </div>
        <Dialog
          visible={feedbackDialog}
          dismissableMask={true}
          showHeader={false}
          onHide={() => {if (!feedbackDialog) return; setFeedbackDialog(false);}}
          style={{ width: '30vw' }} breakpoints={{ '960px': '75vw', '667px': '50vw', '481px': '90vw' }}
          pt={{ content: {className: 'border-round-xl'}}}
        >
          <Button icon="pi pi-times" rounded text size="large" aria-label="Cancel" className='hidden lg:flex absolute right-0 -mr-2 xl:-mr-5 -mt-4 xl:-mt-5 clrbtn' style={{color: 'whitesmoke'}} onClick={() => setFeedbackDialog(false)} />
          <form onSubmit={mailer}>
            <Card title={<div className={`${Roboto.className} text-2xl text-center text-700 font-medium`}>Оставить заявку</div>} subTitle={<div className='hidden md:block text-center -mt-1'>Мы обязательно свяжемся с Вами</div>} className='px-0 shadow-none'>
              <div className='flex flex-column gap-3 bg-white'>
                <div className='flex justify-content-center align-items-center'>
                  <i className='hidden md:block pi pi-user mr-2 form-icon' style={{ fontSize:'1.5rem', color:'#757D87' }} />
                  <FloatLabel>
                    <InputText id='name' type='text' className='lg:p-inputtext-lg' value={name} onChange={(e) => setName(e.target.value)} required />
                    <label htmlFor='name'>Имя</label>
                  </FloatLabel>
                </div>
                <div className='flex justify-content-center align-items-center'>
                  <i className='hidden md:block pi pi-phone mr-2 form-icon' style={{ fontSize:'1.5rem', color:'#757D87' }} />
                  <FloatLabel>
                    <InputMask id='phone' type='phone' value={phone} onChange={(e) => setPhone(e.target.value)} mask='9 (999) 999-99-99'  className='lg:p-inputtext-lg' required />
                    <label htmlFor='phone'>Телефон</label>
                  </FloatLabel>
                </div>
                <div className='flex justify-content-center align-items-center'>
                  <i className='hidden md:block pi pi-comment mr-2 form-icon' style={{ fontSize:'1.5rem', color:'#757D87' }} />
                  <FloatLabel>
                    <InputText id='comment' type='text' className='lg:p-inputtext-lg' value={comment} onChange={(e) => setComment(e.target.value)} />
                    <label htmlFor='comment'>Комментарий</label>
                  </FloatLabel>
                </div>
                <div className='flex align-items-center pl-5'>
                  <Checkbox
                    inputId='private'
                    name='private'
                    icon='pi pi-check'
                    onChange={e => setChecked(e.checked)} checked={checked} 
                    pt={{
                      box: {style: {background:'transparent', borderColor: '#FF931E'}},
                      icon: {style: {color:'#FF931E', fontWeight: 'bold'}} 
                    }}
                  />
                  <label htmlFor='private' className='ml-2 text-xs'>Согласен на обработку персональных данных</label>
                </div>
                <Button label='Отправить' icon={isLoading ? 'pi pi-spin pi-sync' : 'pi pi-check'} size='large' raised type='submit' disabled={!checked} className='w-full' style={{background:'#FF931E', borderColor: '#FF931E'}} />
              </div>
              <Toast ref={emailToast} position="top-center" />
            </Card>
          </form>
        </Dialog>
      </div>
    </div>
  )
}
 