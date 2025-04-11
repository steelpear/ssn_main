import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Link from 'next/link'
import { MainLayout } from '../components/MainLayout'
import { BreadCrumb } from 'primereact/breadcrumb'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Tag } from 'primereact/tag'
import { Loader } from '../components/Loader'
import { 
  MailruShareButton,
  OKShareButton,
  TelegramShareButton,
  VKShareButton,
  MailruIcon,
  OKIcon,
  TelegramIcon,
  VKIcon
} from 'react-share'

export default function Blog() {
  const op = useRef(null)
  const router = useRouter()
  const [shareUrl, setShareUrl] = useState(null)
  const [shareTitle, setShareTitle] = useState(null)
  const size = 30
  const items = [{ label: 'Блог' }]
  const home = { template: () => <Link href='/'><i className='pi pi-home' /></Link> }
  const [articles, setArticles] = useState(null)
  const [tags, setTags] = useState([])
  const [currentTag, setCurrentTag] = useState('все')
  const [filter, setFilter] = useState({
    public: true
  })

  useEffect(() => {
    const getTags = async () => {
      const array = []
      const res = await fetch('/api/blog/gettags')
      const response = await res.json()
      response.map(tag => array.push(tag.tags))
      const tags = array.flat(1)
      setTags([... new Set(tags)])
    }
    getTags()
  },[])

  useEffect(() => {
    const getArticles = async () => {
      const res = await fetch('/api/blog/getblog', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(filter)
      })
      const response = await res.json()
      setArticles(response)
    }
    getArticles()
  },[filter])

  const share = (e, article) => {
    setShareUrl(`https://pro100tur.ru/article/${article.slug}`)
    setShareTitle(article.title)
    op.current.toggle(e)
  }

  const filterByTag = (tag) => {
    setCurrentTag(tag)
    setFilter(tag !== 'все' ? {public:true, tags:{$in: tag}} : {public:true})
  }

  const articleTemplate = item => (<div key={item._id} className='col-12 md:col-6 lg:col-4 h-full lg:max-h-16rem'>
    <img src={item.img} alt='Image' className='w-full h-full border-round-xl cursor-pointer' style={{objectFit: 'cover'}} onClick={() => router.push(`/article/${item.slug}`)} />
    <div className='flex align-items-center justify-content-between m-1'>
      <div className='text-sm text-600'>{new Date(item.date).toLocaleDateString()}</div>
      <i className='pi pi-share-alt cursor-pointer' style={{ fontSize: '1rem', color: '#708090' }} onClick={(e) => share(e, item)} />
    </div>
    <div className='text-lg cursor-pointer line-height-2 mt-1 hover:text-blue-700' onClick={() => router.push(`/article/${item.slug}`)}>{item.title}</div>
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
          <div className='mb-2'>
            <div className='text-xl text-center lg:text-3xl font-medium text-800 mb-5'>Наш блог</div>
            <div className='text-lg text-600 font-medium text-center lg:text-left'>Полезные статьи для туристов. Рекомендации тревел-экспертов.</div>
          </div>
          <div className='grid gap-2 my-4 px-2 text-base'>
            <Tag value='#все' onClick={() => filterByTag('все')} className='cursor-pointer text-xs font-medium' style={{backgroundColor: currentTag === 'все' ? '#FE7E25' : '#326FD1'}} />
            {tags.map((tag, index) => <Tag key={index} value={`#${tag}`} onClick={() => filterByTag(tag)} className='cursor-pointer text-xs font-medium' style={{backgroundColor: currentTag === tag ? '#FE7E25' : '#326FD1'}} />)}
          </div>
          <div className='grid h-full lg:h-20rem'>
            {articles && articles.map(article => articleTemplate(article))}
          </div>
          <div className='text-center pt-7'><Link href='/tickets' className='inline-block'><img src='/tutu.jpg' alt='Билеты' className='w-11 md:w-auto shadow-2'/></Link></div>
          <OverlayPanel
            ref={op}
            pt={{
              content: {className: 'pt-4 pb-2'}
            }}>
            <div className='grid gap-1'>
              <MailruShareButton url={shareUrl} title={shareTitle}>
                <MailruIcon round size={size} />
              </MailruShareButton>
              <OKShareButton url={shareUrl} title={shareTitle}>
                <OKIcon round size={size} />
              </OKShareButton>
              <VKShareButton url={shareUrl} title={shareTitle}>
                <VKIcon round size={size} />
              </VKShareButton>
              <TelegramShareButton url={shareUrl} title={shareTitle}>
                <TelegramIcon round size={size} />
              </TelegramShareButton>
            </div>
          </OverlayPanel>
        </main>
      </MainLayout>
    </>
  ) 
}
