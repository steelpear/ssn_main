import {useState} from 'react'
import {useRouter} from 'next/router'
import { NoSSR } from '@kwooshung/react-no-ssr'
import Link from 'next/link'
import { Dialog } from 'primereact/dialog'
import { Link as Scroll, Element } from 'react-scroll'
import { FeedbackForm } from '../components/FeedbackForm'

export const Footer = () => {
  const router = useRouter()
  const [feedbackDialog, setFeedbackDialog] = useState(false)

  return (
    <Element name='footer' className='h-auto px-6 pt-8 pb-6 text-white footer-wrap footer-across'>
      <div className='grid grid-nogutter w-full'>
        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4'>
          <div className='text-lg'>
            <div className='flex align-items-center'>
              <Link href='https://wa.me/79886698337' target='_blank'><img src='/whatsapp.svg' alt='whatsapp' className='w-3rem mr-2' /></Link>
              <Link href='https://t.me/+iADdW6tHtm4wNTNi' target='_blank'><img src='/telegram.svg' alt='whatsapp' className='w-3rem' /></Link>
            </div>
            <p><i className='pi pi-phone mr-2' /><a className='no-underline text-white' href='tel:+79886698337'>+7 (988) 669-83-37</a></p>
            <p><i className='pi pi-at mr-2' /><a className='no-underline text-white' href='mailto:89886200970@mail.ru'>89886200970@mail.ru</a></p>
            <p><i className='pi pi-map-marker mr-2' />353920, РФ, Краснодарский край,<br />г. Новороссийск, просп. Дзержинского, 183 (этаж 2, офис 10)</p>
          </div>
        </div>
        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 lg:text-center'>
          <Link href='/'><img src='/bird-white.png' alt='logo' className='w-12rem py-2' /></Link>
        </div>
        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 pl-0 md:pl-8'>
          <div className='text-lg'>
            <div className='mb-3'>
              <a className='no-underline text-white' href='https://sport-sbor-tour.ru'>&copy; sport-sbor-tour.ru&ensp; 2016 - {new Date().getFullYear()}</a>
            </div>
            <Link href='/policy' className='no-underline text-white'>Политика конфиденциальности<br />и пользовательское соглашение</Link>
            <p className='my-2'><Link className='no-underline text-white' href='/'>Спортивные базы</Link></p>
            <p className='my-2'><Link className='no-underline text-white' href='/'>Индивидуальные туры</Link></p>
            {router.route === '/' ? <Scroll to='feedback' smooth={true} duration={500} className='cursor-pointer no-underline text-white'>Заказать обратный звонок</Scroll> : <div className='cursor-pointer no-underline text-white' onClick={() => setFeedbackDialog(true)}>Заказать обратный звонок</div>}
          </div>
        </div>
        <Dialog
          visible={feedbackDialog}
          dismissableMask={true}
          onHide={() => {if (!feedbackDialog) return; setFeedbackDialog(false);}}
          content={() => <FeedbackForm />}
        />
      </div>
      <NoSSR>
        {/* <Telegram /> */}
        {/* <Script src="https://script.click-chat.ru/chat.js?wid=affd5ad6-be0f-4d91-810b-a3f580a82fa1" /> */}
        {/* <Chatra /> */}
      </NoSSR>
    </Element>
  )
}
 