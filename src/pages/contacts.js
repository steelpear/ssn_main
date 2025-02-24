import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { BreadCrumb } from 'primereact/breadcrumb'
import { MainLayout } from '../components/MainLayout'
import { YandexMaps } from '../components/YandexMaps'

export default function Contacts() {
  const items = [{ label: 'Контакты' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Контакты</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 pb-4 mb-4 px-7'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-700 text-xl font-semibold mb-6'>
            <div className='text-800 text-3xl font-semibold my-5'>Контакты</div>
            <div>Туристическая компания «ПРО100-ТУР»</div>
            <p><i className='pi pi-phone mr-2' /><a className='no-underline' href='tel:+79886698337'>+7 (988) 669-83-37</a></p>
            <p><i className='pi pi-at mr-2' /><a className='no-underline' href='mailto:89886200970@mail.ru'>89886200970@mail.ru</a></p>
            <div className='flex align-items-center gap-3 my-2'>
              <Button label="WhatsApp" icon="pi pi-whatsapp" raised className='border-round-lg px-4' style={{background: '#25D366', borderColor: '#25D366'}} onClick={() =>  window.open('https://wa.me/79886698337', '_blank')} />
              <Button label="Telegram" icon="pi pi-send" raised className='border-round-lg px-4' style={{background: '#24A1DE', borderColor: '#24A1DE'}} onClick={() =>  window.open('https://t.me/+iADdW6tHtm4wNTNi', '_blank')} />
            </div>
            <p><i className='pi pi-map-marker mr-2' />353920, РФ, Краснодарский край,<br />г. Новороссийск, просп. Дзержинского, 183 (этаж 2, офис 10)</p>
          </div>
          <YandexMaps center={'44.692609, 37.779309'} label='ПРО100-ТУР' zoom={15} height={350} />
        </main>
      </MainLayout>
    </>
  ) 
}
