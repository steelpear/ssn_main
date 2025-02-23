import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from "next/head" 
import { MainLayout } from '../../components/MainLayout'
import { ActionFormSection } from '../../components/ActionFormSection'

export default function Group() {
  const router = useRouter()
  const { slug } = router.query
  const [group, setGroup] = useState({})

  useEffect(() => {
    const getGroup = async () => {
      const res = await fetch('/api/setoftours/getbyslug', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({slug})
      })
      const response = await res.json()
      setGroup(response ? response[0] : [])
    }
    getGroup()
  },[slug])

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
          <div className='text-center text-2xl font-semibold text-800 mr-2 my-6'>{group.name}</div>
        </main>
      </MainLayout>
    </>
  )
}
