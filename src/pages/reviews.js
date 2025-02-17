import Head from 'next/head'
import Link from 'next/link'
import { MainLayout } from '../components/MainLayout'
import { ActionFormSection } from '../components/ActionFormSection'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Reviews() {
  const items = [{ label: 'Отзывы' }]
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
        <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
        <div className='text-3xl text-700 font-medium mt-4'>Отзывы наших клиентов</div>
        <ActionFormSection />
      </MainLayout>
    </>
  ) 
}
