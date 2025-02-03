import { useState, useRef } from 'react'
import Head from 'next/head'
import useSWR, { useSWRConfig } from 'swr'
import { AdminLayout } from '../components/AdminLayout'
import { Loader } from '../components/Loader'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Editor } from 'primereact/editor'
import { FloatLabel } from 'primereact/floatlabel'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Hotels() {
  const toast = useRef(null)
  const inputFile = useRef(null)
  const [loading, setLoading] = useState(false)
  const [addDialog, setAddDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [img, setImg] = useState('')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [currentId, setCurrentId] = useState('')
  const [showCard, setShowCard] = useState(false)

  const { data: hotels } = useSWR('/api/hotels/getallhotels', fetcher, { revalidateOnFocus: false })

  const { mutate } = useSWRConfig()

  const footerContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => setAddDialog(false)} className='p-button-text' />
      <Button label='Добавить' icon='pi pi-plus' loading={loading} onClick={() => addHotel()} autoFocus />
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
      body: JSON.stringify({ img, name, url, description, public: true })
    })
    const response = await res.json()
    if (response) {toast.current.show({severity:'success', detail:'Отель добавлен', life: 2000})}
    else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
    setLoading(false)
    setAddDialog(false)
    setDescription('')
    setName('')
    setImg('')
    setUrl('')
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

  const openEditDialog = async (id) => {
    const object = await popular.filter(item => item._id === id)
    setName(object[0].name)
    setUrl(object[0].url)
    setImg(object[0].img)
    setDescription(object[0].description)
    setShowCard(object[0].public)
    setCurrentId(id)
    setEditDialog(true)
  }

  const closeEditDialog = () => {
    setEditDialog(false)
    setName('')
    setUrl('')
    setImg('')
    setDescription('')
    setCurrentId('')
    setShowCard(true)
  }

  const editHotel = async () => {
    const res = await fetch('/api/hotels/updatehotel', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          id: currentId,
          data: { img, name, url, description, public: showCard }
        })
      })
  const response = await res.json()
    if (response.state) {
      toast.current.show({severity:'success', detail:'Изменения сохранены', life: 2000})
      await mutate('/api/hotels/getallhotels', fetcher('/api/hotels/getallhotels', {revalidate: false}))
      closeEditDialog()
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
    if (response.state) {setImg(`/hotels/${response.name}`)
    } else {setImg('Ошибка! Введите URL вручную.')}
  }

  // if (!hotels) return <Loader />

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
                <div className='flex align-items-center justify-content-between my-1 border-bottom-1 border-300' key={item._id}>
                  <div className={`flex align-items-center gap-3 ${!item.public && 'line-through'}`}>
                    <div>{index + 1}</div>
                    <div>{item.name}</div>
                    <div><a href={item.url} target='_blank' className='text-blue-600'>{item.url}</a></div>
                  </div>
                  <div className='flex align-items-center justify-content-between'>
                    <Button icon='pi pi-pencil' rounded text severity='secondary' aria-label='Edit' onClick={() => openEditDialog(item._id)}/>
                    <Button icon='pi pi-trash' rounded text severity='danger' aria-label='Delete' onClick={() => deleteHotel(item._id)} />
                  </div>
                </div>
              )})}
          </div>
          <Dialog header={<div><i className='pi pi-building-columns mr-2' style={{ fontSize: '1.5rem' }} />Добавить отель</div>} visible={addDialog} maximizable style={{ width: '55vw' }} onHide={() => {if (!addDialog) return; setAddDialog(false); }} footer={footerContent}>
            <div className='grid mt-2 w-full'>
              <div className='col flex justify-content-center'>
                <div className='flex flex-column gap-4 flex-wrap'>
                  <FloatLabel>
                    <InputText id='name' type='text' className='p-inputtext-lg' value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor='name'>Название объекта</label>
                  </FloatLabel>
                  <FloatLabel>
                    <InputText id='url' type='text' className='p-inputtext-lg' value={url} onChange={(e) => setUrl(e.target.value)} />
                    <label htmlFor='url'>URL</label>
                  </FloatLabel>
                  <FloatLabel>
                    <InputText id='img' type='text' className='p-inputtext-lg' value={img} onChange={(e) => setImg(e.target.value)} />
                    <label htmlFor='img'>Ссылка на изображение</label>
                  </FloatLabel>
                  <form>
                    <label className='block pb-1 -mt-3 text-sm'>Загрузить изображение 600 x 400 px</label>
                    <input type='file' name='file' ref={inputFile} onChange={uploadImage} className='p-button p-button-outlined p-button-sm' />
                  </form>
                </div>
              </div>
              <div className='col'>
                <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} headerTemplate={editorHeader} style={{ height: '215px' }} placeholder='Описание' />
              </div>
            </div>
          </Dialog>
          <Dialog header={<div><i className='pi pi-pen-to-square mr-2' style={{ fontSize: '1.5rem' }} />Редактировать объект</div>} visible={editDialog} maximizable style={{ width: '55vw' }} onHide={() => {if (!editDialog) return; closeEditDialog(); }} footer={footerEditContent}>
          <div className='grid mt-2 w-full'>
              <div className='col flex justify-content-center'>
                <div className='flex flex-column gap-4 flex-wrap'>
                  <FloatLabel>
                    <InputText id='name' type='text' className='p-inputtext-lg' value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor='name'>Название объекта</label>
                  </FloatLabel>
                  <FloatLabel>
                    <InputText id='url' type='text' className='p-inputtext-lg' value={url} onChange={(e) => setUrl(e.target.value)} />
                    <label htmlFor='url'>URL</label>
                  </FloatLabel>
                  <FloatLabel>
                    <InputText id='img' type='text' className='p-inputtext-lg' value={img} onChange={(e) => setImg(e.target.value)} />
                    <label htmlFor='img'>Ссылка на изображение</label>
                  </FloatLabel>
                  <form>
                    <label className='block pb-1 -mt-3 text-sm'>Загрузить изображение 600 x 400 px</label>
                    <input type='file' name='file' ref={inputFile} onChange={uploadImage} className='p-button p-button-outlined p-button-sm' />
                  </form>
                  {/* <Button label='Загрузить изображение' icon='pi pi-image' severity='secondary' outlined onClick={() => setEditDialog(false)} /> */}
                  <div className='flex align-items-center'>
                    <Checkbox inputId='public' onChange={e => setShowCard(e.checked)} checked={showCard} />
                    <label htmlFor='public' className='ml-2 text-lg'>Опубликован</label>
                  </div>
                </div>
              </div>
              <div className='col'>
                <Editor value={description} onTextChange={(e) => setDescription(e.htmlValue)} headerTemplate={editorHeader} style={{ height: '215px' }} placeholder='Описание' />
              </div>
            </div>
          </Dialog>
        </main>
      </AdminLayout>
      <Toast ref={toast} position='top-center' />
    </>
  )
}
