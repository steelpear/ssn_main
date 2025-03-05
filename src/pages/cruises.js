import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import useScript from '../useScript'
import { Button } from 'primereact/button'
import { BreadCrumb } from 'primereact/breadcrumb'
import { CruisBanner } from '../components/CruisBanner'
import { CruisesButtonsGroup } from '../components/CruisesButtonsGroup'
import { CruisesFAQ } from '../components/CruisesFAQ'
import { MainLayout } from '../components/MainLayout'

export default function Cruises() {
  const router = useRouter()
  const items = [{ label: 'Круизы' }]
  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  useScript('static/infoflot.js')

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Круизы</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 mt-2 pb-4 px-4 lg:px-7'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center mt-4 mb-3'>Круизы: морские и речные приключения</div>
          <CruisBanner />
          <div className='flex justify-content-center'>
            <Button label='Специальные предложения' outlined raised size='large' className='text-700 mx-3' onClick={() => router.push('/special')} />
          </div>
          <div className='text-800 text-lg my-5'>
            <div className="infoflotWidget" data-id='YTo0OntzOjI6IklEIjtzOjQ6IjM4MTgiO3M6NDoiVVNFUiI7czoyODoiT0RrNE9EWXlNREE1TnpCQWJXRnBiQzV5ZFE9PSI7czo2OiJSQU5ET00iO3M6ODoibGV0Z25yNmUiO3M6MTU6IklORk9GTE9ULUFQSUtFWSI7czo0MDoiMmQxNGUzZTIzNmMzZmJlZDRkZTQ0YWVhZGUzZDdlMTRjOWU5ZGVlMCI7fQ==" data-index="1'></div>
          </div>
          <CruisesButtonsGroup />
          <CruisesFAQ />
        </main>
      </MainLayout>
    </>
  ) 
}
