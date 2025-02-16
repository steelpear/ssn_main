import Head from 'next/head'
import Link from 'next/link'
import useScript from '../useScript'
import { MainLayout } from '../components/MainLayout'
import { Top3 } from '../components/Top3'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Gelendzhik() {

  useScript('static/partner.fire.js')

  const items = [{ label: 'Курорт Геленджик' }]
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
        <main className='fadein animation-duration-800'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center my-5'>Курорт Геленджик</div>
          <img src='/gelendzhik.jpg' alt='Курорт Геленджик' width='100%' height={450} className='shadow-2 border-round-sm' />
          <div className='text-lg my-3'>
            <span className='font-medium'>Геленджик</span>:  жемчужина Черноморского побережья!  Уникальное сочетание горных пейзажей и морского побережья, чистые пляжи, развитая инфраструктура и множество развлечений.  Идеальное место для отдыха всей семьей или романтического путешествия.
          </div>
          <Top3 best='ge' />
          <div className='s-partnership mb-4' style={{display:'none'}}>zZpLcIi4fsDChvptL2VtMKBeTZf9aGKdzWaPmlykFNw%3D</div>
        </main>
      </MainLayout>
    </>
  ) 
}
