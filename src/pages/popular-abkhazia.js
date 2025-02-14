import Head from 'next/head'
import Link from 'next/link'
import { MainLayout } from '../components/MainLayout'
import { Top3 } from '../components/Top3'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Abkhazia() {
  const items = [{ label: 'Курорты Абхазии' }]
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
          <div className='text-3xl text-700 font-medium text-center my-4'>Курорты Абхазии</div>
          <img src='/abkhazia.jpg' alt='Курорты Абхазии' width='100%' height={450} />
          <div className='text-lg my-3'>
            Откройте для себя волшебную Абхазию!  Уникальная природа, гостеприимные жители,  древние достопримечательности и чистейшее Черное море ждут вас.  Выбирайте свой идеальный курорт в Абхазии – от шумных городов до уютных поселков.
          </div>
          <Top3 best='ab' />
        </main>
      </MainLayout>
    </>
  ) 
}
