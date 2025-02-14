import { useRouter } from 'next/navigation'
import { Card } from 'primereact/card'
import { Carousel } from 'primereact/carousel'
import { directions } from '../components/directions'

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

const itemTemplate = (item) => (<div className='relative mx-2 cursor-pointer pop-direction-item' onClick={() => router.push(item.path)}>
  <img src={item.img} alt={item.name} className='w-full' style={{borderRadius:'0.375rem'}} />
  <div className='absolute top-0 left-0 mt-2 ml-2 bg-orange-500 text-white text-xs px-2 py-1 border-round-xl'>{item.name}</div>
  </div>)

  return (
    <main>
      <Card title='Популярные направления' className='w-full'>
        <Carousel value={directions} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={itemTemplate} />
      </Card>
    </main>
  )
}
 