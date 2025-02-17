import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menubar } from 'primereact/menubar'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { EventBus } from '../components/EventBus'
import { FeedbackForm } from '../components/FeedbackForm'
import { Roboto, Montserrat } from '../styles/fonts'

export const Header = () => {
  const router = useRouter()
  const [feedbackDialog, setFeedbackDialog] = useState(false)
  const menuItems = [
    {
      label: 'Главная',
      command: () => { router.push('/') }
    },
    {
      label: 'Туры по России',
      command: () => { router.push('/tours') }
    },
    { label: 'Сборы и корпоративные туры' },
    { label: 'Круизы' },
    { 
      label: 'Как оплатить',
      command: () => { router.push('/payment') } 
    },
    { 
      label: 'Отзывы',
      command: () => { router.push('/reviews') } 
    },
    { 
      label: 'О компании',
      command: () => { router.push('/about') } },
    {
      label: 'Контакты',
      command: () => { router.push('/contacts') }
    }
  ]

  useEffect(() => {
    EventBus.$on('closeaction', () => setFeedbackDialog(false))
    return () => {EventBus.$off('closeaction')}
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className='grid flex flex-column md:flex-row justify-content-between align-items-center px-6 pt-3'>
        <div className='col-4 flex align-items-center'>
          <Link href='/' style={{display: 'contents'}}><img src='/bird.svg' alt='logo' className='w-2' /></Link>
          <div className={`${Montserrat.className} font-semibold text-2xl text-700 ml-2`}>ПРО100-ТУР</div>
        </div>
        <div className='col-4 text-center'>
          <i className='pi pi-phone mr-2' style={{fontSize:'1.1rem'}} />
          <a className='no-underline text-700 text-lg font-semibold' href='tel:+79886698337'><span className={Montserrat.className}>+7 (988) 669-83-37</span></a>
        </div>
        <div className='col-4'>
          <div className='flex gap-2 align-items-center justify-content-end'>
            <div className={`${Montserrat.className} font-medium text-md`}>Заказать звонок</div>
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
            <Link href='https://t.me/+iADdW6tHtm4wNTNi' target='_blank'><img src='/telegram.svg' alt='telegram' style={{width:46}} /></Link>
          </div>
        </div>
      </div>
      <Menubar
        model={menuItems}
        pt={{ 
          root: { className: 'flex justify-content-center p-0 border-noround border-transparent my-2'},
          label: {className: `${Roboto.className} text-lg font-medium`},
          content: { className: 'border-noround' }
        }}
      />
      <Dialog
        visible={feedbackDialog}
        style={{ width: '30vw' }}
        dismissableMask={true}
        onHide={() => {if (!feedbackDialog) return; setFeedbackDialog(false);}}
        content={() => <FeedbackForm />}
      />
    </>
  )
}
  