import Head from "next/head" 
import { MainLayout } from '../components/MainLayout'
import { YandexMaps } from '../components/YandexMaps'

export default function Contacts() {
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
        <main className='fadein animation-duration-800 py-4'>
          <div className='text-700 text-xl font-semibold mb-5'>
            <div>Туристическая компания «ПРО100-ТУР»</div>
            <p><i className='pi pi-phone mr-2' /><a className='no-underline' href='tel:+79886698337'>+7 (988) 669-83-37</a></p>
            <p><i className='pi pi-at mr-2' /><a className='no-underline' href='mailto:89886200970@mail.ru'>89886200970@mail.ru</a></p>
            <p><i className='pi pi-map-marker mr-2' />353920, РФ, Краснодарский край,<br />г. Новороссийск, просп. Дзержинского, 183 (этаж 2, офис 10)</p>
          </div>
          <YandexMaps center={'44.692609, 37.779309'} label='ПРО100-ТУР' zoom={15} height={350} />
        </main>
      </MainLayout>
    </>
  ) 
}
