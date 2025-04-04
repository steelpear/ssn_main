import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { MainLayout } from '../../components/MainLayout'
import { Share } from '../../components/Share'
import { Loader } from '../../components/Loader'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Manrope } from '../../styles/fonts'

export default function Article() {
  const router = useRouter()
  const { slug } = router.query
  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState({})
  const [crumbs, setCrumbs] = useState(null)

  const home = { template: () => <Link href='/'><i className='pi pi-home' /></Link> }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const title = typeof document !== 'undefined' ? document.title : 'Ознакомьтесь с этим интересным контентом!'

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const res = await fetch('/api/blog/getbyslug', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({slug})
      })
      const response = await res.json()
      setArticle(response[0])
      setCrumbs([
        { template: () => <Link href='/blog' className='no-underline'>Блог</Link>},
        { label: response[0] && response[0].title }
      ])
      setLoading(false)
    }
    getData()
  },[slug])

  if (loading) return <Loader />

  return (
    <>
      <Head>
        <title>Туристическая компания «ПРО100-ТУР»</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 mt-2 mb-4 px-4 lg:px-8'>
          <BreadCrumb model={crumbs} home={home} pt={{ root: {className: 'border-none'}}}/>
          <div className='flex justify-content-center mb-5'>
            {article ? <div className='article w-9'>
              <div className={`${Manrope.className} text-3xl text-800 font-medium mt-4 mb-6`}>{article.title}</div>
              <div className='flex align-items-center justify-content-between mb-1'>
                <div className='ml-1'>{new Date(article.date).toLocaleDateString()}</div>
                <div className='flex align-items-center'>
                  <div className='flex align-items-center mr-3'>
                    {article.tags && article.tags.map(tag => <div className='ml-1 text-blue-800 cursor-pointer'>#{tag}</div>)}
                  </div>
                  <Share />
                </div>
              </div>
              <img src={article.img} alt={article.title} className='w-full shadow-4 mb-3' style={{borderRadius:'1rem'}} />
              <div dangerouslySetInnerHTML={{ __html: article.text }} />
            </div> : <></>}
          </div>
          <Link href='/tickets' className='block text-center mb-3'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link>
        </main>
     </MainLayout>
    </>
  )
}
