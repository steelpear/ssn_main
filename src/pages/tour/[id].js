import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from "next/head" 
import { MainLayout } from '../../components/MainLayout'
import { ActionFormSection } from '../../components/ActionFormSection'
import { Galleria } from 'primereact/galleria'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { ScrollPanel } from 'primereact/scrollpanel'

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
    }
    getTour()
  },[id])

  const itemTemplate = (item) => {return <img src={item} alt='Image' style={{ width: '100%', display: 'block' }} />}

  const thumbnailTemplate = (item) => {return <img src={item} alt='Image' style={{ width: '100%', display: 'block' }} />}

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
          <div className='text-center text-2xl font-semibold text-800 mr-2 my-6'>{tour.name}</div>
          <div className='grid gap-2'>
            <div className='col-5'>
              <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} circular showItemNavigators showItemNavigatorsOnHover item={itemTemplate} thumbnail={thumbnailTemplate} className='w-full shadow-4' />
            </div>
            <div className='col-6'>
              <ScrollPanel style={{ width: '100%', height: '440px' }}>
                <div className='desc pt-0 text-sm' dangerouslySetInnerHTML={{ __html: tour.description }} />
              </ScrollPanel>
            </div>
          </div>
          <Accordion multiple className='mt-4'>
            {tour.program && <AccordionTab header='Программа тура'>
                <div className='desc pt-0 text-sm' dangerouslySetInnerHTML={{ __html: tour.program }} />
              </AccordionTab>}
            {tour.placement && <AccordionTab header='Размещение'>
                <div className='desc pt-0 text-sm' dangerouslySetInnerHTML={{ __html: tour.placement }} />
              </AccordionTab>}
            {tour.important && <AccordionTab header='Важно знать'>
                <div className='desc pt-0 text-sm' dangerouslySetInnerHTML={{ __html: tour.important }} />
              </AccordionTab>}
            {tour.booking && <AccordionTab header='Условия бронирования'>
                <div className='desc pt-0 text-sm' dangerouslySetInnerHTML={{ __html: tour.booking }} />
              </AccordionTab>}
            </Accordion>
          <ActionFormSection px={0} />
        </main>
      </MainLayout>
    </>
  )
}
