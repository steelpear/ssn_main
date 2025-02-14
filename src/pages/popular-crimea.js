import Head from 'next/head'
import Link from 'next/link'
import { MainLayout } from '../components/MainLayout'
import { Top3 } from '../components/Top3'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Crimea() {
  const items = [{ label: 'Курорты Крыма' }]
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
          <div className='text-3xl text-700 font-medium text-center my-4'>Курорты Крыма</div>
          <img src='/crimea.jpg' alt='Курорты Крыма' width='100%' height={450} />
          <div className='text-lg my-3'>
            Отдых и лечение в Крыму:  выбор санаториев и отелей на любой вкус!  Сочетайте комфортный отдых на берегу моря с оздоровительными процедурами в лучших санаториях Крыма.  Широкий выбор курортных отелей и санаториев с различным уровнем комфорта и ценами.
          </div>
          <Top3 best='cr' />
        </main>
      </MainLayout>
    </>
  ) 
}
