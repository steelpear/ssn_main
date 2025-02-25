import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from "next/head" 
import { MainLayout } from '../../components/MainLayout'
import { YandexMaps } from '../../components/YandexMaps'
import { ActionFormSection } from '../../components/ActionFormSection'
import { Galleria } from 'primereact/galleria'
import { Rating } from 'primereact/rating'
import { Chip } from 'primereact/chip'
import { ScrollPanel } from 'primereact/scrollpanel'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Hotel() {
  const router = useRouter()
  const { id, p } = router.query
  const [hotel, setHotel] = useState({})
  const [images, setImages] = useState(null)
  const [crumbs, setCrumbs] = useState([])
  const responsiveOptions = [
    {breakpoint: '991px', numVisible: 4},
    {breakpoint: '767px', numVisible: 3},
    {breakpoint: '575px', numVisible: 1}]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  useEffect(() => {
    const getHotel = async () => {
      const res = await fetch('/api/hotels/gethotel', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({id})
      })
      const response = await res.json()
      setImages(response ? response.img : [])
      setHotel(response ? response : [])
      setCrumbs(response ? [{template: () => <Link className='no-underline' href={page().url}>{page().label}</Link>} , { label: response.simple_name ? response.simple_name : response.name }] : [])
    }
    const page = () => {
      if (p === 'so') {return {label: 'Отдых в Сочи', url: '/popular-sochi'}}
      else if (p === 'an') {return {label: 'Семейный отдых в Анапе', url: '/popular-anapa'}}
      else if (p === 'ge') {return {label: 'Курорт Геленджик', url: '/popular-gelendzhik'}}
      else if (p === 'cr') {return {label: 'Курорты Крыма', url: '/popular-crimea'}}
      else {return {label: 'Курорты Абхазии', url: '/popular-abkhazia'}}
    }
    getHotel()
  },[id])

  const itemTemplate = (item) => {
    return <img src={item} alt='Image' style={{ width: '100%', display: 'block' }} />;
}

  const thumbnailTemplate = (item) => {
    return <img src={item} alt='Image' style={{ display: 'block', width: '100px' }} />;
  }

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР»</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 px-4 lg:px-7'>
          <BreadCrumb model={crumbs} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='flex align-items-center justify-content-center mt-3'>
            <div className='text-center text-2xl font-semibold text-800 mr-2'>{hotel.name}</div>
            <Rating value={hotel.stars} stars={hotel.stars} readOnly cancel={false} pt={{ onIcon: {style: {color: 'gold', width: '1rem' }}}} />
          </div>
          <div className='mb-6 mt-1 text-center text-sm'>{hotel.address}</div>
          <div className='grid gap-2'>
            <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} circular style={{ maxWidth: '640px' }} showItemNavigators showItemNavigatorsOnHover item={itemTemplate} thumbnail={thumbnailTemplate} />
            <div className='col pt-0'>
              <div className='surface-100 border-1 border-200 border-round-md py-1 px-2 inline-flex align-items-center'><i className='pi pi-tag' style={{ fontSize: '1.3rem' }} />&nbsp;{hotel.dprice}&ensp;<span className='text-xl font-medium'>{hotel.price}</span><span>&nbsp;₽</span></div>
              <div className='mt-2'>{hotel.utp && hotel.utp.map((e, i) => (<Chip key={i} label={e} pt={{ label: {className: 'text-xs p-0 m-1'}, root: {style: {background: '#DDD6FE', margin: '5px 5px 5px 0', padding: '0 6px'} }}} />))}</div>
              <ScrollPanel style={{ width: '100%', height: '400px' }}>
                <div className='desc pt-0 text-sm' dangerouslySetInnerHTML={{ __html: hotel.description }} />
              </ScrollPanel>
            </div>
          </div>
          {(hotel && hotel.actions) && <div className='my-4' dangerouslySetInnerHTML={{ __html: hotel.actions }} />}
          <div className='my-3'>
            <YandexMaps center={hotel.coord} label={hotel.name} zoom={15} height={250} />
          </div>
          <ActionFormSection px={0} />
        </main>
      </MainLayout>
    </>
  )
}
