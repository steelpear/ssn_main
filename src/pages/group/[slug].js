import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from "next/head" 
import { MainLayout } from '../../components/MainLayout'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Group() {
  const router = useRouter()
  const { slug } = router.query
  const [group, setGroup] = useState({})
  const [tours, setTours] = useState(null)
  const [crumbs, setCrumbs] = useState(null)

  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/setoftours/getbyslug', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({slug})
      })
      const response = await res.json()
      const ids = response[0] && response[0].tours.map(id => id._id)
      setGroup(response ? response[0] : [])
      const resp = await fetch('/api/setoftours/getbyids', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ids})
      })
      const respons = await resp.json()
      setTours(respons)
      setCrumbs([{ label: response[0] ? response[0].name : [] }])
    }
    getData()
  },[slug])

  const itemTemplate = (item) => (
    <div key={item._id} className='col-11 lg:col-5 p-2' style={{alignSelf: 'center'}}>
      <img src={item.img[0]} alt={item.name} className='w-full shadow-4 cursor-pointer' style={{borderRadius:'1rem'}} onClick={() => router.push(`/tour/${item.slug}`)}/>
      <div className='text-center text-xl font-medium cursor-pointer my-3 text-blue-800' onClick={() => router.push(`/tour/${item.slug}`)}>{item.name}</div>
    </div>)

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
        <main className='fadein animation-duration-800 px-4 lg:px-7 pb-5 mt-2'>
          <BreadCrumb model={crumbs} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-center text-3xl font-semibold text-800 mr-2 my-6'>{group && group.name}</div>
          <div className='flex flex-column lg:flex-row gap-2 lg:gap-4 justify-content-center'>
            {tours && tours.map(item => itemTemplate(item))}
          </div>
        </main>
      </MainLayout>
    </>
  )
}
