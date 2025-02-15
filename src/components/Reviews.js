import { reviews } from '../components/reviewsList'
import { Carousel } from 'primereact/carousel'
import { ScrollPanel } from 'primereact/scrollpanel'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'

export const Reviews = () => {
  const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    },
    {
      breakpoint: '320px',
      numVisible: 1,
      numScroll: 1
    }
  ]

  const reviewTemplate = (review) => {
    return (
      <div className='m-2 px-2 md:px-4 py-3 border-round-2xl shadow-2 bg-white'>
        <div className="mb-3 text-lg font-medium">{review.name}</div>
        <Divider className='mb-2 -mt-2' />
        <ScrollPanel style={{ width: '100%', height: '200px' }}>
          <div className='font-normal text-base text-justify'>{review.body}</div>
        </ScrollPanel>
      </div>
    )
  }

  return (
    <Card title='Отзывы наших клиентов' className='w-full my-5 shadow-2'>
      <Carousel value={reviews} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={reviewTemplate} showIndicators={false} className='z-5' />
      <div className='flex align-items-center px-2 mt-3'>
        <i className='pi pi-info-circle mr-3' style={{ fontSize: '2rem' }}></i>
        <div>
          <div className='text-sm'>Оставьте отзыв о компании <span className='text-800 font-semibold'>«ПРО100-ТУР»</span> на одном из сайтов: <a className='text-blue-700 font-semibold' href='https://yandex.ru/profile/173269021933?utm_source=telegram&utm_medium=social&utm_campaign=share' target='_blank'>Яндекс</a>, <a className='text-blue-700 font-semibold' href='https://go.2gis.com/mr1rg' target='_blank'>2ГИС</a></div>
          <div className='text-sm'>Пришлите ссылку на отзыв нам на электронную почту <a className='text-blue-700 font-semibold' href='mailto:89886200970@mail.ru'>89886200970@mail.ru</a> и мы подарим Вам промокод со скидкой до <span className='text-800 font-semibold'>15%</span> на заказ новой услуги по Вашему выбору.</div>
        </div>
      </div>
    </Card>
  )
}
   