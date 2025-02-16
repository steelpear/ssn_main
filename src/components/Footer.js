import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { EventBus } from '../components/EventBus'
import { Dialog } from 'primereact/dialog'
import { FeedbackForm } from '../components/FeedbackForm'
import { Roboto } from '../styles/fonts'

export const Footer = () => {
  const router = useRouter()
  const [feedbackDialog, setFeedbackDialog] = useState(false)

  useEffect(() => {
    EventBus.$on('closeaction', () => setFeedbackDialog(false))
    return () => {EventBus.$off('closeaction')}
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${Roboto.className} h-auto p-6 text-white footer-wrap`}>
      <div className='grid grid-nogutter w-full'>
        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4'>
          <div className='text-lg'>
            <p><i className='pi pi-phone mr-2' /><a className='no-underline text-white' href='tel:+79886698337'>+7 (988) 669-83-37</a></p>
            <p><i className='pi pi-at mr-2' /><a className='no-underline text-white' href='mailto:89886200970@mail.ru'>89886200970@mail.ru</a></p>
            <p><i className='pi pi-map-marker mr-2' />353920, РФ, Краснодарский край,<br />г. Новороссийск, просп. Дзержинского, 183 (этаж 2, офис 10)</p>
          </div>
        </div>
        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 lg:text-center'>
          <Link href='/'><img src='/bird-white.png' alt='logo' className='w-5 py-2' /></Link>
        </div>
        <div className='col-12 sm:col-12 md:col-4 lg:col-4 xl:col-4 pl-0 md:pl-8'>
          <div className='text-lg'>
            <div className='mb-3'>
              <a className='no-underline text-white' href='https://sport-sbor-tour.ru'>&copy; pro100tur.ru&ensp; 2016 - {new Date().getFullYear()}</a>
            </div>
            <div className='cursor-pointer text-white my-2' onClick={() => setFeedbackDialog(true)}><i className='pi pi-bell mr-2' />Заказать обратный звонок</div>
            <div className='flex align-items-center mt-3 mb-2'>
              <Link href='https://wa.me/79886698337' target='_blank'><img src='/whatsapp.svg' alt='whatsapp' className='w-3rem mr-3' /></Link>
              <Link href='https://t.me/+iADdW6tHtm4wNTNi' target='_blank'><img src='/telegram.svg' alt='whatsapp' className='w-3rem' /></Link>
            </div>
            <Link href='/policy'>
              <p className='no-underline text-white-alpha-80 font-light text-xs line-height-1'>Политика конфиденциальности<br />и пользовательское соглашение</p>
            </Link>
          </div>
        </div>
        <Dialog
          visible={feedbackDialog}
          dismissableMask={true}
          onHide={() => {if (!feedbackDialog) return; setFeedbackDialog(false);}}
          content={() => <FeedbackForm />}
        />
      </div>
    </div>
  )
}
 