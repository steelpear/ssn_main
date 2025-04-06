import {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/navigation'
import { OverlayPanel } from 'primereact/overlaypanel'
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

export const Blog = () => {
  const op = useRef(null)
  const router = useRouter()
  const [shareUrl, setShareUrl] = useState(null)
  const [shareTitle, setShareTitle] = useState(null)
  const size = 30
  const [articles, setArticles] = useState(null)
  const [filter, setFilter] = useState({
    public: true,
    main_page: true
  })

  useEffect(() => {
    const getArticles = async () => {
      const res = await fetch('/api/blog/getblog', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(filter)
      })
      const response = await res.json()
      setArticles(response.slice(0,3))
    }
    getArticles()
  },[filter])

  const share = (e, article) => {
    setShareUrl(`https://pro100tur.ru/article/${article.slug}`)
    setShareTitle(article.title)
    op.current.toggle(e)
  }

  const itemTemplate = item => (<div className='col-12 md:col-6 lg:col-4 h-full lg:max-h-16rem'>
    <img src={item.img} alt='Image' className='w-full h-full border-round-xl cursor-pointer' style={{objectFit: 'cover'}} onClick={() => router.push(`/article/${item.slug}`)} />
    <div className='flex align-items-center justify-content-between m-1'>
      <div className='text-sm text-600'>{new Date(item.date).toLocaleDateString()}</div>
      <i className='pi pi-share-alt cursor-pointer' style={{ fontSize: '1rem', color: '#708090' }} onClick={(e) => share(e, item)} />
    </div>
    <div className='text-lg cursor-pointer line-height-2 mt-1 hover:text-blue-700' onClick={() => router.push(`/article/${item.slug}`)}>{item.title}</div>
  </div>)

  if (articles && articles.length >= 3) {
    return (
      <main className='px-4 lg:px-8 pt-5 pb-7 w-full'>
        <div className='mb-4 flex align-items-start lg:align-items-center justify-content-between'>
          <div>
            <div className='text-xl lg:text-3xl font-medium text-800'>Блог</div>
            <div className='text-600'>Полезные статьи для туристов. Рекомендации тревел-экспертов.</div>
          </div>
          <div className='flex align-items-center text-blue-700'>
            <div className='text-lg cursor-pointer' onClick={() => router.push('/blog')}>Все статьи</div>
            <i className='pi pi-angle-right pt-1 hidden lg:block' style={{ fontSize: '1.3rem' }} />
          </div>
        </div>
        <div className='grid h-full lg:h-20rem'>
          {articles && articles.map(item => (itemTemplate(item)))}
        </div>
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
    )
  } else {return (<></>)}
}
 