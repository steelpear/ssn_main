import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import useScript from '../useScript'
import { Button } from 'primereact/button'
import { BreadCrumb } from 'primereact/breadcrumb'
import { MainLayout } from '../components/MainLayout'

export default function Sea() {
  const router = useRouter()
  const items = [{template: () => <Link className='no-underline' href='/cruises'>Круизы</Link>} , { label: 'Морские круизы' }]

  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  useScript('static/sea-infoflot.js')

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Морские круизы</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 mt-2 pb-4 px-4 lg:px-8'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center mt-4 mb-5'>Морские круизы</div>
          <div className='text-base'>
            <div className='text-xl text-800 font-semibold'>Морские круизы - Ваше незабываемое приключение.</div>
            <p className='my-1'>Откройте для себя мир на роскошном лайнере! Мечтаете о незабываемом путешествии, полном роскоши, приключений и новых открытий?  Морские круизы – это идеальный способ воплотить мечту в реальность!  Представьте себе: бескрайние просторы океана, ласковое солнце, комфортабельные каюты и захватывающие дух пейзажи.  Все это и многое другое ждет вас на борту наших роскошных лайнеров. Мы предлагаем широкий выбор круизов, которые удовлетворят любые вкусы и предпочтения:</p>
            <p className='my-1'><span className='font-semibold'>Круизы по Карибскому морю:</span> Райские острова, белоснежные пляжи, кристально чистая вода и яркая тропическая природа. Откройте для себя красоту Багамских островов, Кубы, Мексики и многих других захватывающих мест.</p>
            <p className='my-1'><span className='font-semibold'>Круизы по Средиземному морю:</span> Древние руины, живописные города, богатая история и культура.  Посетите Италию, Грецию, Францию, Испанию и другие страны, полные очарования и загадок.</p>
            <p className='my-1'><span className='font-semibold'>Трансатлантические круизы:</span> Незабываемое путешествие через Атлантический океан, которое подарит вам уникальные впечатления и возможность насладиться красотой океана.</p>
            <p className='my-1'><span className='font-semibold'>Круизы по Аляске:</span> Захватывающие фьорды, величественные горы, ледники и дикая природа.  Уникальная возможность увидеть красоту Аляски с моря.</p>
            <p className='my-1 font-semibold text-lg'>На борту наших лайнеров вас ждёт:</p>
            <p className='my-1'><span className='font-semibold'>Роскошные каюты:</span>  Комфортабельные и элегантные каюты с различными удобствами, чтобы сделать ваше путешествие максимально приятным.</p>
            <p className='my-1'><span className='font-semibold'>Разнообразные рестораны:</span>  Широкий выбор блюд, от изысканной кухни до повседневных закусок.</p>
            <p className='my-1'><span className='font-semibold'>Развлекательные программы:</span>  Шоу, концерты, дискотеки, казино и многое другое, чтобы сделать каждый день вашего круиза незабываемым.</p>
            <p className='my-1'><span className='font-semibold'>Спортивные и оздоровительные центры:</span>  Бассейны, тренажерные залы, спа-салоны – все для вашего отдыха и здоровья.</p>
            <p className='my-1'><span className='font-semibold'>Исключительное обслуживание:</span> Внимательный и профессиональный персонал позаботится о вашем комфорте на протяжении всего путешествия.</p>
            <p className='my-1'>Выберите свой идеальный морской круиз и отправьтесь в незабываемое приключение!  Свяжитесь с нами, чтобы получить подробную информацию о маршрутах, датах и ценах.  Мы поможем вам подобрать круиз, который идеально подходит именно вам.</p>
          </div>
          <div className="infoflotWidget" data-id="YTo0OntzOjI6IklEIjtpOjM4MzI7czo0OiJVU0VSIjtzOjI4OiJPRGs0T0RZeU1EQTVOekJBYldGcGJDNXlkUT09IjtzOjY6IlJBTkRPTSI7czo4OiJwdHFyaG5ndSI7czoxNToiSU5GT0ZMT1QtQVBJS0VZIjtzOjQwOiIyZDE0ZTNlMjM2YzNmYmVkNGRlNDRhZWFkZTNkN2UxNGM5ZTlkZWUwIjt9" data-index="1"></div>
          <div className='flex justify-content-center'>
            <Button label='Речные круизы' outlined raised size='large' className='text-700 mx-3 border-orange-400 border-3' onClick={() => router.push('/river-cruises')} />
          </div>
        </main>
      </MainLayout>
    </>
  ) 
}
