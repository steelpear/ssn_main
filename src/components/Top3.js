import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { Image } from 'primereact/image'
import { Tag } from 'primereact/tag'
import { Chip } from 'primereact/chip'
import { Rating } from 'primereact/rating'
import { Divider } from 'primereact/divider'
import { Card } from 'primereact/card'

export const Top3 = ({...params}) => {
  const router = useRouter()
  const [hotels, setHotels] = useState(null)

  useEffect(() => {
    const getHotels = async () => {
      const res = await fetch('/api/hotels/gethotels', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({public: true, best: params.best})
      })
      const response = await res.json()
      // setHotels(response.slice(0,3))
      setHotels(response)
    }
    getHotels()
  },[params])

  if (hotels && hotels.length >= 3) {
    return (
      <main>
        <Card title='ТОП лучших' className='w-full my-5 shadow-none'>
          <div className='grid gap-2'>
            {hotels && hotels.map(item => (
              <div className='col border-1 border-200 border-round-md px-0 pt-0 shadow-1' key={item._id}>
                <div className='relative'>
                  <Image src={item.img[0]} alt='Image' width='100%' height='100%' pt={{ image: {className: 'border-round-top-md'}}} />
                  <div className='absolute top-0 left-0 mt-2 ml-2 bg-red-500 text-white text-xs px-2 py-1 border-round-xl'>{item.label}</div>
                </div>
                <div className='px-2'>
                  <div className='flex'>
                    <div className='text-xs'>{item.type}, </div>
                    <div className='text-xs'>&nbsp;{item.city}</div>
                  </div>
                  <div className='text-sm font-medium mb-2'>{item.name}</div>
                  <div className='flex align-items-center'>
                    <Tag severity="success" value={`${item.rating} из 5`} className='mr-3' />
                    <Rating value={item.stars} stars={item.stars} readOnly cancel={false} pt={{ onIcon: {style: {color: 'gold', width: '1rem' }}}} />
                  </div>
                  <div>{item.utp.map((e, i) => (<Chip key={i} label={e} pt={{ label: {className: 'text-xs p-0 m-1'}, root: {style: {background: '#DDD6FE', margin: '5px 1px 1px 1px', padding: '0 6px'} }}} />))}</div>
                  <Divider className='my-2' />
                  <div className='flex align-items-center justify-content-between'>
                    <div className='surface-200 border-round-md px-2 py-1'>
                      <div className='text-sm font-medium'>от {item.price} ₽</div>
                      <div className='text-xs'>{item.dprice}</div>
                    </div>
                    <p className='text-sm text-blue-600 font-medium cursor-pointer underline' onClick={() => router.push(`/hotel/${item.slug}?p=${params.best}`)}>Подробнее</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    )
  } else {return (<></>)}
}
 