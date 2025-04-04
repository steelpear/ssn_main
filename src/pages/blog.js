import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { MainLayout } from '../components/MainLayout'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Loader } from '../components/Loader'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Blog() {
  const router = useRouter()
  const items = [{ label: 'Блог' }]
  const home = { template: () => <Link href='/'><i className='pi pi-home' /></Link> }
  const { data: articles } = useSWR('/api/blog/getarticles', fetcher, { revalidateOnFocus: false })

  const articleTemplate = (article) => (
    <div key={article._id} className='flex align-items-center my-3'>
      <img src={article.img} alt={article.title} className='w-2 mr-4 border-round-lg shadow-2 cursor-pointer' onClick={() => router.push(`/article/${article.slug}`)} />
      <div>
        <div className='text-xl text-blue-700 font-semibold cursor-pointer line-height-1' onClick={() => router.push(`/article/${article.slug}`)}>{article.title}</div>
        <div className='hidden lg:block surface-overlay white-space-nowrap overflow-hidden text-overflow-ellipsis' style={{width:500}}>{article.announce}</div>
      </div>
    </div>)

  if (!articles) return <Loader />

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР» / Блог</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 pb-4 mt-2 mb-4 px-4 lg:px-8'>
          <BreadCrumb model={items} home={home} pt={{ root: {className: 'border-none'}}} />
          <div className='text-3xl text-700 font-medium text-center mt-4 mb-6'>Блог</div>
          <div className='flex flex-column flex-wrap gap-4 justify-content-start my-6'>
            {articles && articles.map(article => articleTemplate(article))}
          </div>
          <Link href='/tickets' className='block text-center py-3'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link>
        </main>
      </MainLayout>
    </>
  ) 
}
