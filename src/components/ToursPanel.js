import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { Carousel } from 'primereact/carousel'
import { Montserrat } from '../styles/fonts'

export const ToursPanel = () => {
  const router = useRouter()
  const [sets, setSets] = useState([])

  useEffect(() => {
    const getSets = async () => {
      const res = await fetch('/api/setoftours/getsets')
      const response = await res.json()
      setSets(response)
    }
    getSets()
  },[])

  const itemTemplate = item => (
      <div className='pt-2'>
        <div className='relative pop-direction-item'>
          <div className='mx-2 cursor-pointer border-transparent' onClick={() => router.push(`${item.tours.length}` > 1 ? `/group/${item.slug}` : `/tour/${item.tours[0].slug}`)}>
            <img src={item.img} alt={item.name} className='w-full border-round-2xl shadow-2' />
            <div className={`${Montserrat.className} absolute bottom-0 left-0 mx-2 text-sm font-medium border-top-1 border-orange-300 text-white p-3 mb-1 descr hidden lg:block`} style={{borderRadius:'0 0 1rem 1rem', background: 'rgb(255, 132, 0, .9)'}}>{item.description}</div>
          </div>
          <div className={`${Montserrat.className} absolute top-0 left-0 mt-3 mx-3 text-white text-base font-medium px-3 py-2 border-round-2xl`} style={{background: 'rgb(255, 132, 0)'}}>{item.name}</div>
        </div>
      </div>)

    return (sets && sets.length > 0 ? 
      <main>
        <div className='text-2xl text-700 font-medium ml-5 my-1 cursor-pointer text-blue-600 hover:underline inline-block' onClick={() => router.push('/popular-tours')}>Популярные туры</div>
        <Carousel value={sets} numVisible={1} numScroll={1} itemTemplate={itemTemplate} showIndicators={false} showNavigators={true} pt={{ 
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
          }},
        }} />
      </main> : <></>)
  }
 