import { useRouter } from 'next/router'
import { Carousel } from 'primereact/carousel'
import { directions } from '../components/directions'
import { Montserrat } from '../styles/fonts'

export const PopularDirections = () => {
  const router = useRouter()
  const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 3,
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

const itemTemplate = item => (
  <div className='pt-2'>
    <div className='relative pop-direction-item'>
      <div className='mx-2 shadow-2 cursor-pointer border-round-2xl' onClick={() => router.push(item.path)}>
        <img src={item.img} alt={item.name} className='w-full' style={{borderRadius:'1rem 1rem 0 0'}} />
        <div className={`${Montserrat.className} text-sm font-medium border-top-1 border-pink-300 text-white p-3 -mt-1`} style={{borderRadius:'0 0 1rem 1rem', background: 'rgb(255, 132, 0)'}}>{item.description}</div>
      </div>
      <div className={`${Montserrat.className} absolute top-0 left-0 mt-3 mx-3 text-white text-base font-medium px-3 py-2 border-round-2xl`} style={{background: 'rgb(255, 132, 0)'}}>{item.name}</div>
    </div>
  </div>)

  return (
    <main className='my-6 px-2 lg:px-7'>
      <div className='text-3xl text-700 font-medium ml-5 my-4'>Популярные направления</div>
      <Carousel value={directions} responsiveOptions={responsiveOptions} itemTemplate={itemTemplate} showIndicators={false} page={0} circular pt={{ 
        previousButton: {style: {
          background: 'rgb(255, 132, 0)',
          color: 'white',
          marginRight: '-2rem',
          zIndex: 1,
          border: 'solid 5px white',
          width: '50px',
          height: '50px'
        }},
        nextButton: {style: {
          background: 'rgb(255, 132, 0)',
          color: 'white',
          marginLeft: '-2rem',
          zIndex: 1,
          border: 'solid 5px white',
          width: '50px',
          height: '50px'
        }}
      }} />
    </main>
  )
}
 