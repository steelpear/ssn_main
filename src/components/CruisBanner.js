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
        <div className='text-center text-3xl mt-2 font-semibold text-orange-500'>Откройте для себя мир с нами!</div>
        <div className={`${Montserrat.className} text-base md:text-xl text-center text-800 font-semibold my-2 px-6`}> Выберите свой идеальный круиз - морской или речной – и отправляйтесь в незабываемое путешествие.</div>
      </main>
    )
  }
 