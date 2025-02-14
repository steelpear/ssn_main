import Head from 'next/head'
import Link from 'next/link'
import { MainLayout } from '../components/MainLayout'
import { Top3 } from '../components/Top3'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Anapa() {
  const items = [{ label: 'Семейный отдых в Анапе' }]
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
          <div className='text-3xl text-700 font-medium text-center my-4'>Семейный отдых в Анапе</div>
          <img src='/anapa.jpg' alt='Семейный отдых в Анапе' width='100%' height={450} />
          <div className='text-lg my-3'>
            Анапа – идеальное место для семейного отдыха с детьми!  Детские пляжи с пологим входом в море, множество развлечений для детей всех возрастов,  уютные отели и гостевые дома, а также множество парков и аттракционов сделают ваш отпуск незабываемым.
          </div>
          <Top3 best='an' />
        </main>
      </MainLayout>
    </>
  ) 
}
