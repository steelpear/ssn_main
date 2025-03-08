import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import useScript from '../useScript'
import { Button } from 'primereact/button'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Divider } from 'primereact/divider'
import { MainLayout } from '../components/MainLayout'

export default function River() {
  const router = useRouter()
  const items = [{template: () => <Link className='no-underline' href='/cruises'>Круизы</Link>} , { label: 'Речные круизы' }]

  const home = { template: () => <Link href="/"><i className='pi pi-home' /></Link> }

  useScript('static/river-infoflot.js')

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Речные круизы</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 mt-2 pb-4 px-4 lg:px-7'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center mt-4 mb-5'>Речные круизы</div>
          <div className='text-base'>
            <div className='text-xl text-800 font-semibold'>Преимущества речных круизов: Откройте для себя мир с комфортом и удовольствием.</div>
            <p className='my-1'>Речные круизы – это уникальный способ путешествия, сочетающий в себе комфорт, удобство и невероятные возможности для знакомства с культурой и природой. В отличие от морских круизов, речные путешествия предлагают более спокойный и размеренный темп, позволяя глубже погрузиться в атмосферу посещаемых мест. Вот лишь некоторые преимущества речных круизов:</p>
            <Divider className='my-2' />
            <p className='my-1 font-semibold text-lg'>Уникальные возможности для знакомства с природой и культурой:</p>
            <p className='my-1'><span className='font-semibold'>Близость к достопримечательностям:</span> Речные суда подходят близко к берегам, позволяя наслаждаться живописными пейзажами и легко достигать исторических мест и небольших городов, недоступных для больших морских лайнеров.</p>
            <p className='my-1'><span className='font-semibold'>Более глубокое погружение:</span>  Вы видите мир с другой перспективы, открывая для себя скрытые уголки природы и очарование маленьких поселений, которые обычно остаются незамеченными.</p>
            <p className='my-1'><span className='font-semibold'>Неторопливый темп путешествия:</span> Отсутствие спешки позволяет насладиться каждым моментом, спокойно осмотреть достопримечательности и проникнуться атмосферой региона.</p>
            <Divider className='my-2' />
            <p className='my-1 font-semibold text-lg'>Комфорт и удобство:</p>
            <p className='my-1'><span className='font-semibold'>Удобство и комфорт:</span> На борту речных круизных судов царит уютная атмосфера. Каюты, как правило, просторные и комфортабельные, а обслуживание на высоком уровне.</p>
            <p className='my-1'><span className='font-semibold'>Все включено:</span> Многие речные круизы предлагают пакет "все включено", что позволяет избежать дополнительных расходов на питание и напитки.</p>
            <p className='my-1'><span className='font-semibold'>Разнообразная программа:</span> На борту организуются различные мероприятия, экскурсии и развлечения, удовлетворяющие вкусы самых разных путешественников.</p>
            <p className='my-1'><span className='font-semibold'>Меньше укачивания:</span> Речные круизы значительно меньше подвержены качке, чем морские, что делает их идеальным вариантом для тех, кто страдает от морской болезни.</p>
            <Divider className='my-2' />
            <p className='my-1 font-semibold text-lg'>Доступность и экономичность:</p>
            <p className='my-1'><span className='font-semibold'>Доступные цены:</span> В сравнении с другими видами путешествий, речные круизы могут оказаться более доступными по цене, особенно если учитывать включенные в стоимость услуги.</p>
            <p className='my-1'><span className='font-semibold'>Экономия времени:</span> Все необходимое – проживание, питание, развлечения – собраны в одном месте, что экономит время на планировании и организации поездки.</p>
            <p className='my-1'>Речные круизы – это идеальный выбор для тех, кто ценит комфорт, спокойствие и уникальные впечатления от путешествий.  Выберите свой речной маршрут и откройте для себя мир заново!</p>
          </div>
          <div className="infoflotWidget" data-id="YTo0OntzOjI6IklEIjtpOjM4MzM7czo0OiJVU0VSIjtzOjI4OiJPRGs0T0RZeU1EQTVOekJBYldGcGJDNXlkUT09IjtzOjY6IlJBTkRPTSI7czo4OiIwYjh2NHNqMyI7czoxNToiSU5GT0ZMT1QtQVBJS0VZIjtzOjQwOiIyZDE0ZTNlMjM2YzNmYmVkNGRlNDRhZWFkZTNkN2UxNGM5ZTlkZWUwIjt9" data-index="1"></div>
          <div className='flex justify-content-center'>
            <Button label='Морские круизы' outlined raised size='large' className='text-700 mx-3 border-orange-400 border-3' onClick={() => router.push('/sea-cruises')} />
          </div>
        </main>
      </MainLayout>
    </>
  ) 
}
