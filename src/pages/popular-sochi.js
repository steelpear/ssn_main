import Head from "next/head" 
import Link from 'next/link'
import useScript from '../useScript'
import { MainLayout } from '../components/MainLayout'
import { Top3 } from '../components/Top3'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Sochi() {

  useScript('static/partner.fire.js')

  const items = [{ label: 'Отдых в Сочи' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

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
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center my-5'>Отдых в Сочи</div>
          <img src='/sochi.jpg' alt='Отдых в Сочи' width='100%' height={450} className='shadow-2 border-round-sm' />
          <div className='text-lg my-3'>
            <span className='font-medium'>Сочи</span> – жемчужина Черноморского побережья!  Ждут вас роскошные отели, песчаные пляжи, горные пейзажи, уникальные достопримечательности и незабываемые развлечения. Отдых в Сочи подходит как для семейного отдыха, так и для романтического путешествия или активного отдыха.  Выбирайте свой идеальный тур!
          </div>
          <Top3 best='so' />
          <div className='s-partnership mb-4' style={{display:'none'}}>Yxn4iWwUgh0rRKKsmDb%2BGVaEaMDJEIm6Imgnk22e5qA%3D</div>
        </main>
      </MainLayout>
    </>
  ) 
}
