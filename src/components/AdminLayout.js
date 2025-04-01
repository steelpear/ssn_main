import {useState} from 'react'
import {useRouter} from 'next/router'
import 'primeicons/primeicons.css'
import Cookies from 'js-cookie'
import { Sidebar } from 'primereact/sidebar'
import { Toolbar } from 'primereact/toolbar'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'

export function AdminLayout({ children }) {
  const router = useRouter()
  const [visible, setVisibleSide] = useState(false)

  const ToolBarStartContent = (
    <div className='card flex justify-content-center align-items-center'>
      <Sidebar visible={visible} onHide={() => setVisibleSide(false)} className='w-full md:w-10rem lg:w-18rem'>
        <p className='hover:text-blue-700 w-full cursor-pointer' onClick={() => router.push('/admin')} style={{color: router.route === '/admin' && 'blue'}}><i className='pi pi-home mr-3' />Главная</p>
        <p className='hover:text-blue-700 w-full cursor-pointer' onClick={() => router.push('/admin-hotels')} style={{color: router.route === '/admin-hotels' && 'blue'}}><i className='pi pi-list-check mr-3' />Отели</p>
        <p className='hover:text-blue-700 w-full cursor-pointer' onClick={() => router.push('/admin-reviews')} style={{color: router.route === '/admin-reviews' && 'blue'}}><i className='pi pi-comment mr-3' />Отзывы</p>
        <p className='hover:text-blue-700 w-full cursor-pointer' onClick={() => router.push('/admin-tours')} style={{color: router.route === '/admin-tours' && 'blue'}}><i className='pi pi-globe mr-3' />Туры</p>
        <p className='hover:text-blue-700 w-full cursor-pointer' onClick={() => router.push('/admin-setoftours')} style={{color: router.route === '/admin-setoftours' && 'blue'}}><i className='pi pi-check-square mr-3' />Группы туров</p>
        <p className='hover:text-blue-700 w-full cursor-pointer' onClick={() => router.push('/admin-blog')} style={{color: router.route === '/admin-blog' && 'blue'}}><i className='pi pi-pen-to-square mr-3' />Блог</p>
        <Divider />
      </Sidebar>
      <Button icon='pi pi-bars' severity='secondary' rounded text onClick={() => setVisibleSide(true)} />
      <Button icon='pi pi-home' severity='secondary' rounded text size="large" className='ml-4' onClick={() => router.push('/')} />
    </div>
  )

  const ToolBarCenterContent = (
    <div className='flex align-items-center'>
      <i className='pi pi-cog' style={{ fontSize: '1.5rem' }} />
      <div className='ml-3 text-xl'>Панель управления {router.route === '/admin' && <span> / Главная</span>}{router.route === '/admin-hotels' && <span> / Отели</span>}{router.route === '/admin-reviews' && <span> / Отзывы</span>}{router.route === '/admin-tours' && <span> / Туры</span>}{router.route === '/admin-setoftours' && <span> / Группы туров</span>}{router.route === '/admin-tours' && <span> / Туры</span>}{router.route === '/admin-blog' && <span> / Блог</span>}</div>
    </div>
  )

  const ToolBarEndContent = (
    <div className='flex align-items-center'>
      <Button icon='pi pi-arrow-right' severity='secondary' rounded text onClick={() => exit()} />
    </div>
  )

  const exit = () => {
    Cookies.remove('_jkNhfyGtr5-kQh5y7Ujhs')
    window.location.reload()
  }

  return (
    <main className='w-full'>
      <Toolbar start={ToolBarStartContent} center={ToolBarCenterContent} end={ToolBarEndContent} />
      {children}
    </main>
  )
}
