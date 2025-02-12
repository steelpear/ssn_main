import { useState, useRef } from 'react'
import Head from 'next/head'
import useSWR, { useSWRConfig } from 'swr'
import slug from 'slug'
import { AdminLayout } from '../components/AdminLayout'
import { Loader } from '../components/Loader'
import { types } from '../components/types'
import { best } from '../components/best'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Chips } from 'primereact/chips'
import { Image } from 'primereact/image'
import { Rating } from 'primereact/rating'
import { Checkbox } from 'primereact/checkbox'
import { Editor } from 'primereact/editor'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Hotels() {
  const toast = useRef(null)
  const inputFile = useRef(null)
  const [loading, setLoading] = useState(false)
  const [addDialog, setAddDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [images, setImages] = useState([])
  const [hotel, setHotel] = useState({
    img: [],
    name: '',
    slug: '',
    url: '',
    address: '',
    coord: '',
    description: '',
    price: '',
    dprice: '',
    label: '',
    type: '',
    city: '',
    rating: '',
    best: '',
    stars: '',
    utp: [],
    public: true
  })

  const { data: hotels } = useSWR('/api/hotels/getallhotels', fetcher, { revalidateOnFocus: false })

  const { mutate } = useSWRConfig()

  const handleChange = e => {
    const { name, value } = e.target
    setHotel(prevState => ({
        ...prevState,
        [name]: value
    }))}

  const handleEditorChange = value => {
    setHotel(prevState => ({
        ...prevState,
        'description': value
    }))}

  const handlePublicChange = value => {
    setHotel(prevState => ({
        ...prevState,
        'public': value
    }))}

  const handleNameChange = e => {
    const { value } = e.target
    setHotel(prevState => ({
        ...prevState,
        'name': value,
        'slug': slug(value)
    }))}

  const footerContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => setAddDialog(false)} className='p-button-text' />
      <Button label='Добавить' icon='pi pi-plus' loading={loading} onClick={() => addHotel()} autoFocus disabled={!hotel.name} />
    </div>
  )

  const footerEditContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => closeEditDialog()} className='p-button-text' />
      <Button label='Сохранить' icon='pi pi-save' loading={loading} onClick={() => editHotel()} />
    </div>
  )

  const renderEditorHeader = () => {
    return (
      <span className='ql-formats'>
          <button className='ql-bold' aria-label='Bold'></button>
          <button className='ql-italic' aria-label='Italic'></button>
          <button className='ql-underline' aria-label='Underline'></button>
      </span>
    )
  }

  const editorHeader = renderEditorHeader()

  const addHotel = async () => {
    setLoading(true)
    const res = await fetch('/api/hotels/addhotel', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(hotel)
    })
    const response = await res.json()
    if (response) {toast.current.show({severity:'success', detail:'Отель добавлен', life: 2000})}
    else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
    setLoading(false)
    setAddDialog(false)
    await mutate('/api/hotels/getallhotels', fetcher('/api/hotels/getallhotels', {revalidate: false}))
  }

  const deleteHotel = async (id) => {
    const res = await fetch('/api/hotels/deletehotel', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ id })
    })
    const response = await res.json()
    if (response.state) {toast.current.show({severity:'success', detail:'Отель удалён', life: 2000})}
    else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
    await mutate('/api/hotels/getallhotels', fetcher('/api/hotels/getallhotels', {revalidate: false}))
  }

  const openEditDialog = (hotel) => {
    setHotel(hotel)
    setImages(hotel.img)
    setEditDialog(true)
  }

  const closeEditDialog = () => {
    setEditDialog(false)
    setHotel({})
    setImages([])
  }

  const editHotel = async () => {
    const res = await fetch('/api/hotels/updatehotel', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          id: hotel._id,
          data: hotel
        })
      })
  const response = await res.json()
    if (response.state) {
      toast.current.show({severity:'success', detail:'Изменения сохранены', life: 2000})
      await mutate('/api/hotels/getallhotels', fetcher('/api/hotels/getallhotels'))
      setHotel({})
      setImages([])
      setEditDialog(false)
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const uploadImage = async () => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', inputFile.current.files[0])
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const response = await res.json()
    if (response.state) {
      images.push(`/img/${response.name}`)
      setHotel({...hotel, img: images})
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const deleteImage = async path => {
    console.log(path)
    const res = await fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify(path)
    })
    const response = await res.json()
    if (response.state) {
      setHotel({...hotel, img: images.filter(item => item !== path)})
      setImages(hotel.img)
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const renderImagesList = () => (<div className='grid gap-2'>
    {[...images].map((item, i) => (<div className='relative' key={i}>
      <Image src={item} alt="Image" width="150" preview />
      <i className='pi pi-times cursor-pointer absolute right-0 top-0 mr-1 mt-1' style={{fontSize:'.8rem', color:'white'}} onClick={() => deleteImage(item)} />
    </div>
  ))}</div>)

  const clearImagesList = () => {
    event.preventDefault()
    setImages([])
    setHotel({...hotel, img: []})
  }

  if (!hotels) return <Loader />

  return (
    <>
      <Head>
        <title>Панель управления / Список отелей</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' key='viewport' />
      </Head>
      <AdminLayout>
        <main className='p-6'>
          <Button label='Добавить отель' icon='pi pi-plus' severity='secondary' outlined onClick={() => setAddDialog(true)} />
          <div className='mt-5'>
            {hotels && hotels.map((item, index) => {
              return (
                <div className='flex align-items-center justify-content-between border-bottom-1 border-300' key={item._id}>
                  <div className={`flex align-items-center gap-3 ${!item.public && 'line-through'}`}>
                    <div>{index + 1}</div>
                    <div>{item.name}</div>
                    <div>{item.city}</div>
                    <div><a href={item.url} target='_blank' className='text-blue-600'>{item.url}</a></div>
                  </div>
                  <div className='flex align-items-center justify-content-between'>
                    <Button icon='pi pi-pencil' rounded text severity='secondary' aria-label='Edit' onClick={() => openEditDialog(item)}/>
                    <Button icon='pi pi-trash' rounded text severity='danger' aria-label='Delete' onClick={() => deleteHotel(item._id)} />
                  </div>
                </div>
              )})}
          </div>
          {/* Добавить отель */}
          <Dialog header={<div><i className='pi pi-building-columns mr-3' style={{ fontSize: '1.5rem' }} />Добавить отель</div>} visible={addDialog} maximized draggable={false} onHide={() => {if (!addDialog) return; setAddDialog(false); }} footer={footerContent}>
            <div className='grid w-full px-4 py-1'>
              <div className='col flex flex-column gap-2'>
                <InputText name='name' type='text' className='w-full p-inputtext-sm' placeholder='Название отеля' value={hotel.name} onChange={(e) => handleNameChange(e)} />
                <div className='text-xs -mt-2'>{hotel.slug}</div>
                <InputText name='url' type='text' className='w-full p-inputtext-sm' placeholder='URL' value={hotel.url} onChange={(e) => handleChange(e)} />
                <InputText name='address' type='text' className='w-full p-inputtext-sm' placeholder='Адрес' value={hotel.address} onChange={(e) => handleChange(e)} />
                <InputText name='label' type='text' className='w-full p-inputtext-sm' placeholder='Ярлык на главной фотографии' value={hotel.label} onChange={(e) => handleChange(e)} />
                <Chips name='utp' value={hotel.utp} onChange={(e) => handleChange(e)} max={3} placeholder='UTP' className='w-full block p-inputtext-sm' />
                <div className='grid w-full flex align-items-center'>
                  <div className='col'>
                    <InputText name='city' type='text' className='w-full p-inputtext-sm' placeholder='Город' value={hotel.city} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col'>
                    <Dropdown name='type' value={hotel.type} onChange={(e) => handleChange(e)} options={types} placeholder='Тип' className='w-full p-inputtext-sm' checkmark={true}  highlightOnSelect={false} showClear />
                  </div>
                  <div className='col'>
                    <Dropdown name='best' value={hotel.best} onChange={(e) => handleChange(e)} options={best} optionLabel='name' placeholder='ТОП-3' className='w-full p-inputtext-sm' checkmark={true}  highlightOnSelect={false} />
                  </div>
                  <div className='col'>
                    <Rating name='stars' value={hotel.stars} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <div className='grid w-full'>
                  <div className='col'>
                    <InputText name='price' keyfilter='money' className='w-full p-inputtext-sm' placeholder='Цена' value={hotel.price} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col'>
                    <InputText name='dprice' type='text' className='w-full p-inputtext-sm' placeholder='Пояснение' value={hotel.dprice} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col'>
                    <InputText name='rating' keyfilter='num' type='text' className='w-full p-inputtext-sm' placeholder='Рейтинг' value={hotel.rating} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <form>
                  <div className='flex align-items-center grid w-full mt-1 px-2'>
                    <InputText name='coord' type='text' className='p-inputtext-sm mr-3' placeholder='Координаты' value={hotel.coord} onChange={(e) => handleChange(e)} />
                    <div>
                      <label className='block -mt-2 text-xs'>Загрузить изображение</label>
                      <input type='file' name='file' ref={inputFile} onChange={() => uploadImage()} className='p-button p-button-outlined p-button-sm mb-2' disabled={!hotel.name} />
                    </div>
                    <Button icon='pi pi-trash' severity='secondary' rounded disabled={!images.length} text size="large" className='ml-2' onClick={() => clearImagesList()} />
                  </div>
                </form>
                {renderImagesList()}
              </div>
              <div className='col'>
                <Editor value={hotel.description} onTextChange={(e) => handleEditorChange(e.htmlValue)} headerTemplate={editorHeader} style={{ height: '215px' }} placeholder='Описание' />
              </div>
            </div>
          </Dialog>
          {/* Добавить отель */}
          {/* Редактировать отель */}
          <Dialog header={<div><i className='pi pi-building-columns mr-3' style={{ fontSize: '1.5rem' }} />Редактировать отель</div>} visible={editDialog} maximized draggable={false} onHide={() => {if (!editDialog) return; setEditDialog(false); }} footer={footerEditContent}>
            <div className='grid w-full px-4 py-1'>
              <div className='col flex flex-column gap-2'>
                <InputText name='name' type='text' className='w-full p-inputtext-sm' placeholder='Название отеля' value={hotel.name} onChange={(e) => handleNameChange(e)} />
                <div className='text-xs -mt-2'>{hotel.slug}</div>
                <InputText name='url' type='text' className='w-full p-inputtext-sm' placeholder='URL' value={hotel.url} onChange={(e) => handleChange(e)} />
                <InputText name='address' type='text' className='w-full p-inputtext-sm' placeholder='Адрес' value={hotel.address} onChange={(e) => handleChange(e)} />
                <InputText name='label' type='text' className='w-full p-inputtext-sm' placeholder='Ярлык на главной фотографии' value={hotel.label} onChange={(e) => handleChange(e)} />
                <Chips name='utp' value={hotel.utp} onChange={(e) => handleChange(e)} max={3} placeholder='UTP' className='w-full block p-inputtext-sm' />
                <div className='grid w-full flex align-items-center'>
                  <div className='col'>
                    <InputText name='city' type='text' className='w-full p-inputtext-sm' placeholder='Город' value={hotel.city} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col'>
                    <Dropdown name='type' value={hotel.type} onChange={(e) => handleChange(e)} options={types} placeholder='Тип' className='w-full p-inputtext-sm' checkmark={true}  highlightOnSelect={false} showClear />
                  </div>
                  <div className='col'>
                    <Dropdown name='best' value={hotel.best} onChange={(e) => handleChange(e)} options={best} optionLabel='name' placeholder='ТОП-3' className='w-full p-inputtext-sm' checkmark={true}  highlightOnSelect={false} />
                  </div>
                  <div className='col'>
                    <Rating name='stars' value={hotel.stars} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <div className='grid w-full'>
                  <div className='col'>
                    <InputText name='price' keyfilter='money' className='w-full p-inputtext-sm' placeholder='Цена' value={hotel.price} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col'>
                    <InputText name='dprice' type='text' className='w-full p-inputtext-sm' placeholder='Пояснение' value={hotel.dprice} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col'>
                    <InputText name='rating' keyfilter='num' type='text' className='w-full p-inputtext-sm' placeholder='Рейтинг' value={hotel.rating} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <form>
                  <div className='flex align-items-center grid w-full mt-1 mb-2 px-2'>
                    <InputText name='coord' type='text' className='p-inputtext-sm mr-3' placeholder='Координаты' value={hotel.coord} onChange={(e) => handleChange(e)} />
                    <div>
                      <label className='block -mt-2 text-xs'>Загрузить изображение</label>
                      <input type='file' name='file' ref={inputFile} onChange={uploadImage} className='p-button p-button-outlined p-button-sm mb-2' disabled={!hotel.name} />
                    </div>
                    <Button icon='pi pi-trash' severity='secondary' rounded disabled={!images.length} text size="large" className='ml-2' onClick={() => clearImagesList()} />
                  </div>
                </form>
                {renderImagesList()}
              </div>
              <div className='col'>
                <Editor value={hotel.description} onTextChange={(e) => handleEditorChange(e.htmlValue)} headerTemplate={editorHeader} style={{ height: '215px' }} placeholder='Описание' />
                <div className='flex align-items-center mt-2'>
                  <Checkbox inputId='public' name='public' onChange={e => handlePublicChange(e.checked)} checked={hotel.public} />
                  <label htmlFor='public' className='ml-2'>Опубликован</label>
                </div>
              </div>
            </div>
          </Dialog>
          {/* Редактировать отель */}
        </main>
      </AdminLayout>
      <Toast ref={toast} position='top-center' />
    </>
  )
}
