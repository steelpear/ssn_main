import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { MainLayout } from '../../components/MainLayout'
import { Share } from '../../components/Share'
import { Loader } from '../../components/Loader'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Carousel } from 'primereact/carousel'
import { Image } from 'primereact/image'
import { Manrope } from '../../styles/fonts'

export default function Article() {
  const router = useRouter()
  const { slug } = router.query
  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState(null)
  const [gallery, setGallery] = useState(null)
  const [crumbs, setCrumbs] = useState(null)
  const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    },
    {
      breakpoint: '320px',
      numVisible: 1,
      numScroll: 1
    }
  ]

  const home = { template: () => <Link href='/'><i className='pi pi-home' /></Link> }

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
      {response[0] && setGallery(response[0].gallery)}
      setCrumbs([
        { template: () => <Link href='/blog' className='no-underline'>Блог</Link>},
        { label: response[0] && response[0].title }
      ])
      setLoading(false)
    }
    getData()
  },[slug])

  const readingTime = () => {
    if (article.text) {
      const text = article.text
      const wpm = 225
      const words = text.trim().split(/\s+/).length
      const time = Math.ceil(words / wpm)
      return time
    } else return ''
  }

  const itemTemplate = item => (<div><Image src={item} alt='Image' width='98%' preview className='hidden xl:block' imageStyle={{objectFit: 'cover'}} /><img src={item} alt='Image' className='block xl:hidden w-full px-1' imageStyle={{objectFit: 'cover'}} /></div>)

  if (loading) return <Loader />

  return (
    <>
      <Head>
        <title>ПРО100-ТУР / {(article && article.title) && article.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" content={article ? article.meta_description : "Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы."} />
        <meta property="og:title" content="Туристическая компания «ПРО100-ТУР»" />
        <meta property="og:description" content="Предлагаем услуги по бронированию путевок на лечение и отдых в санатории, курортные отели, пансионаты, базы отдыха, морские и речные круизы, а также детские лагеря, спортивные и творческие групповые сборы." />
        <meta property="og:type" content="website" />
      </Head>
      <MainLayout>
        <main className='fadein animation-duration-800 mt-2 mb-4 px-4 lg:px-8'>
          <BreadCrumb model={crumbs} home={home} pt={{ root: {className: 'border-none'}}}/>
          <div className='flex justify-content-center mb-5'>
            {article ? <div className='article w-full xl:w-9'>
              <div className={`${Manrope.className} text-3xl text-center xl:text-left text-800 font-medium mt-4 mb-6`}>{article.title}</div>
              <div className='flex flex-column xl:flex-row align-items-center justify-content-between mb-1'>
                <div className='flex flex-column md:flex-row align-items-center'>
                  <div className='mx-0 md:mx-1'>{new Date(article.date).toLocaleDateString()}</div>
                  <div>| Время на прочтение - {readingTime()} мин.</div>
                </div>
                <div className='flex flex-column xl:flex-row align-items-center'>
                  <div className='flex align-items-center mr-3 mb-3 xl:mb-0'>
                    {article.tags && article.tags.map((tag, index) => <div key={index} className='ml-1 text-blue-800 cursor-pointer'>#{tag}</div>)}
                  </div>
                  <Share title={article.title} />
                </div>
              </div>
              <img src={article.img} alt={article.title} className='w-full shadow-4 mb-3' style={{borderRadius:'1rem'}} />
              <div dangerouslySetInnerHTML={{ __html: article.text }} />
              {(gallery && gallery.length > 0) && <Carousel
                value={gallery}
                numVisible={3}
                numScroll={1}
                circular
                showIndicators={false}
                responsiveOptions={responsiveOptions}
                itemTemplate={itemTemplate}
                className='mt-5'
                pt={{ 
                  previousButton: {style: {
                    background: 'rgb(255, 132, 0)',
                    color: 'white',
                    marginRight: '-1.37rem',
                    zIndex: 1,
                    border: 'solid 5px white',
                    width: '45px',
                    height: '45px'
                  }},
                  nextButton: {style: {
                    background: 'rgb(255, 132, 0)',
                    color: 'white',
                    marginLeft: '-1.6rem',
                    zIndex: 1,
                    border: 'solid 5px white',
                    width: '45px',
                    height: '45px'
                  }}
                }}
              />}
            </div> : <></>}
          </div>
          <Link href='/tickets' className='block text-center mb-3'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link>
        </main>
     </MainLayout>
    </>
  )
}
