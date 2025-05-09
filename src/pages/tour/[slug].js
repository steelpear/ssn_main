import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from "next/head" 
import { MainLayout } from '../../components/MainLayout'
import { ActionFormSection } from '../../components/ActionFormSection'
import { Galleria } from 'primereact/galleria'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { ScrollPanel } from 'primereact/scrollpanel'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Tour() {
  const router = useRouter()
  const { slug } = router.query
  const [tour, setTour] = useState({})
  const [images, setImages] = useState(null)
  const [crumbs, setCrumbs] = useState(null)

  const responsiveOptions = [
    {
        breakpoint: '1500px',
        numVisible: 5
    },
    {
        breakpoint: '1024px',
        numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ]
  const home = { template: () => <Link href='/'><i className='pi pi-home' /></Link> }


  useEffect(() => {
    const getTour = async () => {
      const res = await fetch('/api/tours/getbyslug', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({slug})
      })
      const response = await res.json()
      setImages(response[0] ? response[0].img : [])
      setTour(response[0] ? response[0] : [])
      setCrumbs([
        { template: () => <Link href='/popular-tours' className='no-underline'>Популярные туры</Link>},
        { label: response[0] && response[0].name }
      ])
    }
    getTour()
  },[slug])

  const itemTemplate = item => <img src={item} alt='Image' style={{ width: '100%', display: 'block' }} />

  const thumbnailTemplate = item => <img src={item} alt='Image' style={{ width: '99%', display: 'block' }} />

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
        <main className='fadein animation-duration-800 w-full mt-2'>
          <BreadCrumb model={crumbs} home={home} pt={{ root: {className: 'border-none px-3 lg:px-8'}}} />
          <div className='text-center text-2xl font-semibold text-800 mr-2 my-6 px-3 lg:px-8'>{tour.name}</div>
          <div className='flex flex-column lg:flex-row gap-2 px-3 lg:px-8'>
            <div className='col'>
              <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={3} circular showItemNavigators item={itemTemplate} thumbnail={thumbnailTemplate} className='shadow-4' />
            </div>
            <div className='col'>
              <ScrollPanel style={{ width: '100%', height: '440px' }}>
                <div className='article pt-0 text-sm' dangerouslySetInnerHTML={{ __html: tour.description }} />
              </ScrollPanel>
            </div>
          </div>
          <Accordion multiple className='mt-4 px-3 lg:px-8'>
            {tour.program && <AccordionTab header='Программа тура'>
                <div className='article pt-0 text-sm' dangerouslySetInnerHTML={{ __html: tour.program }} />
              </AccordionTab>}
            {tour.placement && <AccordionTab header='Размещение'>
                <div className='article pt-0 text-sm' dangerouslySetInnerHTML={{ __html: tour.placement }} />
              </AccordionTab>}
            {tour.important && <AccordionTab header='Важно знать'>
                <div className='article pt-0 text-sm' dangerouslySetInnerHTML={{ __html: tour.important }} />
              </AccordionTab>}
            {tour.booking && <AccordionTab header='Условия бронирования'>
                <div className='article pt-0 text-sm' dangerouslySetInnerHTML={{ __html: tour.booking }} />
              </AccordionTab>}
            </Accordion>
          <ActionFormSection />
          <Link href='/tickets' className='block text-center py-3'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link>
        </main>
      </MainLayout>
    </>
  )
}
