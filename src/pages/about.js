import Head from 'next/head'
import Link from 'next/link'
import { BreadCrumb } from 'primereact/breadcrumb'
import { MainLayout } from '../components/MainLayout'
import { TransportLogos } from '../components/TransportLogos'

export default function About() {
  const items = [{ label: 'О компании' }]
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
        <main className='fadein animation-duration-800'>
          <div className='text-800 text-3xl font-semibold my-5'>О компании</div>
          <div className='text-lg text-800 mb-7'>
            <p>Наша компания «Про100-Тур» с 2016 года напрямую сотрудничает с отелями, туроператорами и комплексами России, что позволяет нам предлагать клиентам максимально удобные цены проведения мероприятий, в том числе спортивных сборов, а также выгодные и комфортные условия.</p>
            <p>Менеджеры «Про100-Тур» – ваши надежные партнеры в процессе организации и проведения спортивных сборов, которые понимают важность ваших запросов, могут дать профессиональную консультацию по выбору спортивной базы и необходимых спортивных объектов, информируют о дополнительных услугах (трансфер, авиа и ЖД перевозки, аренда спортплощадок).</p>
            <p>Работа «Про100-Тур» строится в диалоге с вами, исходя из пожеланий и стремлений клиентов. Мы ищем и находим новые решения по проведению спортивных сборов на Черноморском побережье по всем видам спорта. Нам важно, чтобы продукт, который мы вам предлагаем, соответствовал современным требованиям, цене и качеству.</p>
          </div>
          <div className='text-800 text-3xl font-semibold my-5'>Почему нам доверяют клиенты</div>
          <div className='text-lg text-800 mb-7'>
            <p>Мы очень тщательно выбираем себе партнеров и работаем только с лучшими, это компании проверенные временем, такие как:</p>
            <TransportLogos />
          </div>
        </main>
      </MainLayout>
    </>
  ) 
}
