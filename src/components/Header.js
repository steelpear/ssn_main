import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Dialog } from 'primereact/dialog'
import { Card } from 'primereact/card'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import { Checkbox } from 'primereact/checkbox'
import { Menubar } from 'primereact/menubar'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { Roboto, Montserrat } from '../styles/fonts'

export const Header = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [checked, setChecked] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [feedbackDialog, setFeedbackDialog] = useState(false)
  const emailToast = useRef(null)
  const menuItems = [
    {
      label: 'Туры по России',
      command: () => { router.push('/tours') }
    },
    { 
      label: 'Сборы и корпоративные туры',
      command: () => { window.open('https://sport-sbor-tour.ru/', '_self') } 
    },
    {
      label: 'Круизы',
      command: () => { router.push('/cruises') } 
    },
    { 
      label: 'Как оплатить',
      command: () => { router.push('/payment') } 
    },
    { 
      label: 'Отзывы',
      command: () => { router.push('/reviews') } 
    },
    { 
      label: 'О нас',
      command: () => { router.push('/about') } },
    {
      label: 'Контакты',
      command: () => { router.push('/contacts') }
    }
  ]

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
    <main className='w-full'>
      <div className='flex flex-column md:flex-row justify-content-center md:justify-content-between align-items-center px-6 pt-3'>
        <div className='col'>
          <div className='flex align-items-center justify-content-center md:justify-content-start mb-2 md:mb-0'>
            <Link href='/' style={{display: 'contents'}}><img src='/bird.svg' alt='logo' width={70} />          </Link>
            <div className='line-height-1'>
              <Link href='/' style={{display: 'contents'}}><div className={`${Montserrat.className} font-semibold text-2xl text-700 ml-2`}>ПРО100-ТУР</div></Link>
              <div className={`${Montserrat.className} text-800 font-medium text-xs md:text-sm ml-2 line-height-1`}>Сайт туристической компании<br/>ПРО100-ТУР (<a href='https://tourism.gov.ru/agents/subject/d3f3352b-2b29-4e6c-bab1-3c0ed9ac71bc/' target='_blank' style={{display: 'contents'}} className='text-blue-700'>РТА 0038394</a>)</div>
            </div>
          </div>
        </div>
        <div className='col text-center mb-2 md:mb-0'>
          <div className='flex flex-column md:flex-row gap-2 md:no-gutter align-items-center justify-content-center'>
            <div>
              <i className='pi pi-phone mr-2' style={{fontSize:'1.1rem'}} />
              <a className='no-underline text-700 text-lg font-semibold' href='tel:+79886698337'><span className={Montserrat.className}>+7 (988) 669-83-37</span></a>
            </div>
            <div className='ml-0 md:ml-3'>
              <i className='pi pi-phone mr-2' style={{fontSize:'1.1rem'}} />
              <a className='no-underline text-700 text-lg font-semibold' href='tel:+74951270565'><span className={Montserrat.className}>+7 (495) 127-05-65</span></a>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='flex gap-2 align-items-center justify-content-end'>
            <div className={`${Montserrat.className} font-medium text-md hidden lg:block`}>Заказать звонок</div>
            <Button
              rounded
              text
              size="small"
              className='fdbtn'
              pt={{
                root: { className: 'p-1'}
              }}
              onClick={() => setFeedbackDialog(true)}
            >
              <img src='/feedback-icon.svg' alt='call' style={{width:36}} />
            </Button>
            <Link href='https://wa.me/79886698337' target='_blank'><img src='/whatsapp.svg' alt='whatsapp' style={{width:46}} /></Link>
            <Link href='https://t.me/sanatoriiRU' target='_blank'><img src='/telegram.svg' alt='telegram' style={{width:46}} /></Link>
            <Link href='https://vk.com/pro100turr' target='_blank'><img src='/vk.png' alt='vk' style={{width:43}} /></Link>
          </div>
        </div>
      </div>
      <Menubar
        model={menuItems}
        pt={{ 
          root: { className: 'flex justify-content-center py-1 m-0 border-noround border-transparent'},
          label: {className: `${Roboto.className} text-lg font-medium`},
          content: { className: 'border-noround' }
        }}
      />
      {router.route === '/' && <div className='relative hidden md:block'>
        <img src='/main-image.jpg' alt='Image' className='w-full h-30rem shadow-3' />
        <div className={`${Montserrat.className} absolute left-0 top-0 mt-8 ml-8 text-7xl text-white font-semibold`}>
          <div className='ml-2 mt-6'>Ваш идеальный отдых</div>
          <div className='ml-8 mt-2'>От мечты до реальности!</div>
        </div>
      </div>}
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
    </main>
  )
}
  