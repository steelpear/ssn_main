import { Carousel } from 'primereact/carousel'
import { Montserrat } from '../styles/fonts'

export const CruisBanner = () => {
  const items = [
    '/cru-slider/1.jpg',
    '/cru-slider/2.jpg',
    '/cru-slider/3.jpg',
    '/cru-slider/4.jpg'
  ]

  const itemTemplate = item => <img src={item} alt='Image' className='w-full' />

    return (
      <main className='mt-6 mb-4 w-full'>
        <Carousel value={items} itemTemplate={itemTemplate} showIndicators={false} showNavigators={true} circular />
        <div className={`${Montserrat.className} text-base md:text-lg text-700 font-semibold my-2 px-6`}>Откройте для себя мир с нами! Выберите свой идеальный круиз - морской или речной – и отправляйтесь в незабываемое путешествие.</div>
      </main>
    )
  }
 