import { useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Menubar } from 'primereact/menubar'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { FeedbackForm } from '../components/FeedbackForm'
import { Roboto, Montserrat } from '../styles/fonts'

export const Header = () => {
  const router = useRouter()
  const [feedbackDialog, setFeedbackDialog] = useState(false)
  const menuItems = [
    {
      label: 'Туры по России',
      command: () => { router.push('/tours') }
    },
    { 
      label: 'Сборы и корпоративные туры',
      command: () => { window.open('https://sport-sbor-tour.ru/', '_blank') } 
    },
    // { label: 'Круизы' },
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

  return (
    <main className='w-full'>
      <div className='flex flex-column md:flex-row justify-content-center md:justify-content-between align-items-center px-6 pt-3'>
        <div className='col flex align-items-center justify-content-center md:justify-content-start mb-2 md:mb-0'>
          <Link href='/' style={{display: 'contents'}}><img src='/bird.svg' alt='logo' className='w-2' />
          <div className={`${Montserrat.className} font-semibold text-2xl text-700 ml-2`}>ПРО100-ТУР</div></Link>
        </div>
        <div className='col text-center mb-2 md:mb-0'>
          <i className='pi pi-phone mr-2' style={{fontSize:'1.1rem'}} />
          <a className='no-underline text-700 text-lg font-semibold' href='tel:+79886698337'><span className={Montserrat.className}>+7 (988) 669-83-37</span></a>
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
            <Link href='https://t.me/+iADdW6tHtm4wNTNi' target='_blank'><img src='/telegram.svg' alt='telegram' style={{width:46}} /></Link>
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
        onHide={() => {if (!feedbackDialog) return; setFeedbackDialog(false);}}
        content={() => (<>
          <Button icon="pi pi-times" rounded text size="large" aria-label="Cancel" className='hidden lg:block absolute right-0 -mr-2 xl:-mr-5 -mt-4 xl:-mt-5 clrbtn' style={{color: 'whitesmoke'}} onClick={() => setFeedbackDialog(false)} />
          <FeedbackForm />
        </>)}
      />
    </main>
  )
}
  