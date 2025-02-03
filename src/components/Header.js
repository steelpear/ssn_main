import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menubar } from 'primereact/menubar'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { EventBus } from '../components/EventBus'
import { FeedbackForm } from '../components/FeedbackForm'
import { Oswald, Roboto, Art } from '../styles/fonts'

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
    { label: 'Как оплатить' },
    { label: 'Отзывы' },
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
      <div className='flex flex-column md:flex-row justify-content-between align-items-center px-4 py-2'>
        <Link href='/'><img src='/main-site-logo.png' alt='logo' className='w-11rem' /></Link>
        <div className={`${Art.className} text-700 text-4xl text-center uppercase font-semibold`}>Спортивные сборы и турниры</div>
        <div className='pr-2 text-center'>
          <div><i className='pi pi-phone mr-2' style={{fontSize:'1.3rem'}} /><a className='no-underline text-700 text-xl font-medium' href='tel:+79886698337'><span className={Oswald.className}>+7 (988) 669-83-37</span></a></div>
          <div className='flex gap-2 align-items-center justify-content-start mt-2'>
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
  