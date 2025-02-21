import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from "next/head" 
import { MainLayout } from '../../components/MainLayout'
import { YandexMaps } from '../../components/YandexMaps'
import { ActionFormSection } from '../../components/ActionFormSection'
import { Galleria } from 'primereact/galleria'
import { Chip } from 'primereact/chip'
import { ScrollPanel } from 'primereact/scrollpanel'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Tour() {
  const router = useRouter()
  const { id, p } = router.query
  const [tour, setTour] = useState({})
  const [images, setImages] = useState(null)
  const [crumbs, setCrumbs] = useState([])
  const responsiveOptions = [
    {breakpoint: '991px', numVisible: 4},
    {breakpoint: '767px', numVisible: 3},
    {breakpoint: '575px', numVisible: 1}]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  useEffect(() => {
    const getTour = async () => {
      const res = await fetch('/api/tours/gettour', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({id})
      })
      const response = await res.json()
      setImages(response ? response.img : [])
      setTour(response ? response : [])
      // setCrumbs(response ? [{template: () => <Link className='no-underline' href={page().url}>{page().label}</Link>} , { label: response.simple_name ? response.simple_name : response.name }] : [])
    }
    // const page = () => {
    //   if (p === 'so') {return {label: 'Отдых в Сочи', url: '/popular-sochi'}}
    //   else if (p === 'an') {return {label: 'Семейный отдых в Анапе', url: '/popular-anapa'}}
    //   else if (p === 'ge') {return {label: 'Курорт Геленджик', url: '/popular-gelendzhik'}}
    //   else if (p === 'cr') {return {label: 'Курорты Крыма', url: '/popular-crimea'}}
    //   else {return {label: 'Курорты Абхазии', url: '/popular-abkhazia'}}
    // }
    getTour()
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
        <title>Организация спортивных сборов в Краснодарском крае</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content={`Спортивные сборы в Краснодарском крае ${new Date().getFullYear()}. Компания «Про100-Тур» предлагает базы отдыха, детские лагеря и пансионаты для проведения спортивных и тренировочных сборов в Краснодарском крае.`} />
        <meta property="og:title" content="Организация спортивных сборов в Краснодарском крае" />
        <meta property="og:description" content={`Спортивные сборы в Краснодарском крае ${new Date().getFullYear()}. Компания «Про100-Тур» предлагает базы отдыха, детские лагеря и пансионаты для проведения спортивных и тренировочных сборов в Краснодарском крае.`} />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 px-7'>
          {/* <BreadCrumb model={crumbs} home={home} pt={{ root: {className: 'border-none'}}} /> */}
          <div className='text-center text-2xl font-semibold text-800 mr-2'>{tour.name}</div>
          <div className='grid gap-2'>
            <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} circular style={{ maxWidth: '640px' }} showItemNavigators showItemNavigatorsOnHover item={itemTemplate} thumbnail={thumbnailTemplate} />
          </div>
          <ActionFormSection px={0} />
        </main>
      </MainLayout>
    </>
  )
}
