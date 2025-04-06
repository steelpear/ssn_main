import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { Image } from 'primereact/image'
import { Tag } from 'primereact/tag'
import { Chip } from 'primereact/chip'
import { Divider } from 'primereact/divider'

export const Blog = () => {
  const router = useRouter()
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

  const itemTemplate = item => (<div className='col-4 max-h-16rem'>
    <img src={item.img} className='w-full h-full border-round-xl cursor-pointer' style={{objectFit: 'cover'}} onClick={() => router.push(`/article/${item.slug}`)} />
    <div className='mx-1 text-sm text-600'>{new Date(item.date).toLocaleDateString()}</div>
    <div className='text-lg cursor-pointer line-height-2 hover:text-blue-700' onClick={() => router.push(`/article/${item.slug}`)}>{item.title}</div>
  </div>)

  if (articles && articles.length >= 3) {
    return (
      <main className='px-4 lg:px-8 pt-5 pb-7 w-full'>
        <div className='mb-4 flex align-items-center justify-content-between'>
          <div>
            <div className='text-xl lg:text-3xl font-medium text-800'>Блог</div>
            <div className='text-600'>Полезные статьи для туристов. Рекомендации тревел-экспертов.</div>
          </div>
          <div className='flex align-items-center text-blue-700'>
            <div className='text-lg cursor-pointer' onClick={() => router.push('/blog')}>Все статьи</div>
            <i className='pi pi-angle-right pt-1' style={{ fontSize: '1.3rem' }} />
          </div>
        </div>
        <div className='grid'>
          {articles && articles.map(item => (itemTemplate(item)))}
        </div>
      </main>
    )
  } else {return (<></>)}
}
 