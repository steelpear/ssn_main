import Head from 'next/head'
import Link from 'next/link'
import useScript from '../useScript'
import { MainLayout } from '../components/MainLayout'
import { ActionFormSection } from '../components/ActionFormSection'
import { BreadCrumb } from 'primereact/breadcrumb'

export default function Tours() {
  const items = [{ label: 'Туры по России' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  useScript('static/partner.fire.js')

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
        <div className='text-3xl text-700 font-medium text-center mt-4'>Поиск туров</div>
        <div className='pt-4 mb-3 s-partnership w-full flex justify-content-center' style={{display:'none'}}>P%2BUxRaBwF3WUU%2FeLE%2F3iB%2B5jYRBw6pHFmfbeLwHkFlo%3D</div>
        <ActionFormSection />
      </MainLayout>
    </>
  ) 
}
