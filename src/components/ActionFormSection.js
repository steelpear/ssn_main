import Image from 'next/image'
import { ActionForm } from '../components/ActionForm'
import { Button } from 'primereact/button'
import { Oswald, Pacifico, Prosto } from '../styles/fonts'
        
export const ActionFormSection = () => {
  return (
    <main className='px-4 md:px-5 lg:px-7 z-0'>
      <div className='relative w-full bg-left-bottom bg-cover bg-no-repeat px-3 md:px-5 py-4 md:py-6 my-4 border-round-2xl shadow-4 action-form-bg'>
        <div className='grid grid-nogutter w-full flex justify-content-center'>
          <div className="col-12 sm:col-12 md:col-5 lg:col-5 xl:col-5">
            <ActionForm />
          </div>
          <div className="col-12 sm:col-12 md:col-7 lg:col-7 xl:col-7 pl-0 sm:pl-3 md:pl-6 h-full">
            <div className='w-full'>
              <div className={`${Prosto.className} text-2xl font-medium text-white mt-3 md:mt-0 mb-4`} style={{textShadow: '0px 0px 3px grey'}}>Оставьте сообщение и мы вам перезвоним</div>
              <div className='flex align-items-end justify-content-center md:justify-content-end mr-0 md:mr-8'>
                <div>
                  <div className='flex flex-column md:flex-row align-items-center gap-3'>
                    <Button label="WhatsApp" icon="pi pi-whatsapp" raised className='w-full border-round-lg border-none' style={{background: '#25D366', borderColor: '#25D366'}} onClick={() =>  window.open('https://wa.me/79886698337', '_blank')} />
                    <Button label="Telegram" icon="pi pi-send" raised className='w-full border-round-lg' style={{background: '#24A1DE', borderColor: '#24A1DE'}} onClick={() =>  window.open('https://t.me/sanatoriiRU', '_blank')} />
                  </div>
                  <Image src="/arrow.svg" alt="arrow" width={55} height={150} className='hidden lg:block absolute -ml-7 -mt-5' />
                  <div className='relative flex align-items-center gap-3 mt-2'>
                    <p className={`${Pacifico.className} hidden md:block text-xl line-height-1 text-white`}>Или просто<br/>позвонить</p>
                    <div className='bg-white py-2 px-3 border-round-lg shadow-3 text-xl font-medium text-center w-full sm:w-auto mt-2 md:mt-0'><i className="pi pi-mobile mr-1" style={{ color: '#2D2E8B', fontSize: '1.2rem' }} /><a className='no-underline text-800' href='tel:+79886698337'><span className={Oswald.className}>+7 (988) 669-83-37</span></a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main> 
  )
}
   