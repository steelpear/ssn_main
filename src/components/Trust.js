import Link from 'next/link'
import { Divider } from 'primereact/divider'
import { Partners } from '../components/Partners'
import { TransportLogos } from '../components/TransportLogos'

export const Trust = () => {

  return (
    <main className='mt-6 px-4 lg:px-8 py-5 w-full'>
      <Divider align="left" className="inline-flex align-items-center mb-4">
        <div className='text-xl lg:text-3xl font-medium text-800'>Почему нам доверяют</div>
      </Divider>
      <div className='grid no-gutter'>
        <div className='col-12 md:col-4'>
          <div className='p-2 text-xl font-semibold text-900'><i className='pi pi-calendar-clock mr-2' style={{ fontSize: '1.2rem' }} />Многолетний опыт</div>
          <div className='p-2 text-lg text-700 line-height-2'>Работаем на туристическом рынке более 10 лет, знаем все нюансы и подводные камни.</div>
        </div>
        <div className='col-12 md:col-4'>
          <div className='p-2 text-xl font-semibold text-900'><i className='pi pi-file-check mr-2' style={{ fontSize: '1.2rem' }} />Лицензированное агентство</div>
          <div className='p-2 text-lg text-700 line-height-2'>Полное соответствие законодательству, гарантия безопасности ваших путешествий. <a href='https://tourism.gov.ru/agents/subject/d3f3352b-2b29-4e6c-bab1-3c0ed9ac71bc/' target='_blank' style={{display: 'contents'}} className='text-blue-700'>РТА 0038394</a></div>
        </div>
        <div className='col-12 md:col-4'>
          <div className='p-2 text-xl font-semibold text-900'><i className='pi pi-face-smile mr-2' style={{ fontSize: '1.2rem' }} />Индивидуальный подход</div>
          <div className='p-2 text-lg text-700 line-height-2'>Подберем тур, идеально подходящий именно Вам, учитывая Ваши пожелания и бюджет.</div>
        </div>
        <div className='col-12 md:col-4'>
          <div className='p-2 text-xl font-semibold text-900'><i className='pi pi-globe mr-2' style={{ fontSize: '1.2rem' }} />Широкий выбор туров</div>
          <div className='p-2 text-lg text-700 line-height-2'>Предлагаем туры , круизы, корпоративные поездки в любую точку мира - на любой вкус и кошелек.</div>
        </div>
        <div className='col-12 md:col-4'>
          <div className='p-2 text-xl font-semibold text-900'><i className='pi pi-graduation-cap mr-2' style={{ fontSize: '1.2rem' }} />Бесплатные консультации</div>
          <div className='p-2 text-lg text-700 line-height-2'>Получите профессиональную консультацию по выбору тура совершенно бесплатно.</div>
        </div>
        <div className='col-12 md:col-4'>
          <div className='p-2 text-xl font-semibold text-900'><i className='pi pi-id-card mr-2' style={{ fontSize: '1.2rem' }} />Надежные партнеры</div>
          <div className='p-2 text-lg text-700 line-height-2'>Сотрудничаем только с проверенными отелями, авиакомпаниями и страховыми компаниями.</div>
        </div>
        <div className='col-12 md:col-4'>
          <div className='p-2 text-xl font-semibold text-900'><i className='pi pi-money-bill mr-2' style={{ fontSize: '1.2rem' }} />Лучшие цены</div>
          <div className='p-2 text-lg text-700 line-height-2'>Прямое сотрудничество с отелями и авиакомпаниями позволяет нам предлагать выгодные цены. Гарантия лучшей цены</div>
        </div>
        <div className='col-12 md:col-4'>
          <div className='p-2 text-xl font-semibold text-900'><i className='pi pi-users mr-2' style={{ fontSize: '1.2rem' }} />Профессиональная команда</div>
          <div className='p-2 text-lg text-700 line-height-2'>Опытные менеджеры, которые всегда готовы помочь и ответить на ваши вопросы.</div>
        </div>
        <div className='col-12 md:col-4'>
          <div className='p-2 text-xl font-semibold text-900'><i className='pi pi-phone mr-2' style={{ fontSize: '1.2rem' }} />Онлайн-поддержка 24/7</div>
          <div className='p-2 text-lg text-700 line-height-2'>Свяжитесь с нами в любое время, если возникнут вопросы. Любые способы связи.</div>
          <div className='inline-block -mt-1 ml-1 flex align-items-center'>
            <Link href='https://wa.me/79886698337' target='_blank'><img src='/whatsapp.svg' alt='whatsapp' className='mr-1' style={{width: 32}} /></Link>
            <Link href='https://t.me/sanatoriiRU' target='_blank'><img src='/telegram.svg' alt='telegram' className='mr-2' style={{width: 32}} /></Link>
            <Link className='no-underline text-700 text-lg font-semibold' href='tel:+79886698337'><i className='pi pi-phone' style={{fontSize:'1.4rem', color: 'blue'}} /></Link>
          </div>
        </div>
      </div>
      <div className='text-xl mt-3'><span className='font-semibold'>Гарантия качества:</span> Мы заботимся о комфорте и безопасности наших клиентов на всех этапах путешествия (<Link className='no-underline' href='/reviews'>отзывы наших клиентов</Link>).</div>
      <TransportLogos />
      <Partners />
    </main>
  )
}
 