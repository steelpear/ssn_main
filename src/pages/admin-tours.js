import { useState, useRef } from 'react'
import Head from 'next/head'
import useSWR, { useSWRConfig } from 'swr'
import slug from 'slug'
import { AdminLayout } from '../components/AdminLayout'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { FilterMatchMode } from 'primereact/api'
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

export default function Tours() {
  const toast = useRef(null)
  const inputFile = useRef(null)
  const [loading, setLoading] = useState(false)
  const [addDialog, setAddDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [images, setImages] = useState([])
  const [filters, setFilters] = useState({'global': { value: null, matchMode: FilterMatchMode.CONTAINS }})
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [tour, setTour] = useState({
    img: [],
    name: '',
    slug: '',
    description: '',
    Important: '',
    included: '',
    price: '',
    dprice: '',
    program: '',
    region: '',
    booking: '',
    utp: [],
    public: true
  })

  const { data: tours, isLoading } = useSWR('/api/tours/getalltours', fetcher, { revalidateOnFocus: false })

  const { mutate } = useSWRConfig()

  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }
    _filters['global'].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const initFilters = () => {
    setFilters({'global': { value: null, matchMode: FilterMatchMode.CONTAINS }})
    setGlobalFilterValue('')
  }

  const headerTemplate = () => {
    return (
      <div className='flex align-items-center justify-content-end'>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search pt-1" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Поиск" className='w-full md:w-16rem pr-5' />
          <InputIcon className="pi pi-times cursor-pointer -ml-4 pt-1" onClick={() => initFilters()} />
        </IconField>
      </div>
    )
  }

  const handleChange = e => {
    const { name, value } = e.target
    setTour(prevState => ({
        ...prevState,
        [name]: value
    }))}

  const handleEditorChange = value => {
    setTour(prevState => ({
        ...prevState,
        'description': value
    }))}

    const handleActionsChange = value => {
      setTour(prevState => ({
          ...prevState,
          'actions': value
    }))}

  const handlePublicChange = value => {
    setTour(prevState => ({
        ...prevState,
        'public': value
    }))}

  const handleNameChange = e => {
    const { value } = e.target
    setTour(prevState => ({
        ...prevState,
        'name': value,
        'slug': slug(value)
    }))}

  const footerContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => setAddDialog(false)} className='p-button-text' />
      <Button label='Добавить' icon='pi pi-plus' loading={loading} onClick={() => addTour()} autoFocus disabled={!tour.name} />
    </div>
  )

  const footerEditContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => closeEditDialog()} className='p-button-text' />
      <Button label='Сохранить' icon='pi pi-save' loading={loading} onClick={() => editTour()} />
    </div>
  )

  const renderEditorHeader = () => (
    <span className='ql-formats'>
      <button className='ql-bold' aria-label='Bold' />
      <button className='ql-italic' aria-label='Italic' />
      <button className='ql-underline' aria-label='Underline' />
      <button className='ql-strike' aria-label='Strike' />
      <button className='ql-blockquote' aria-label='Blockquote' />
      <select className='ql-background'>
        <option value=''></option>
        <option value='red'></option>
        <option value='blue'></option>
        <option value='white'></option>
        <option value='black'></option>
        <option value='orange'></option>
        <option value='green'></option>
      </select>
      <select className='ql-color'>
        <option value=''></option>
        <option value='red'></option>
        <option value='blue'></option>
        <option value='white'></option>
        <option value='black'></option>
        <option value='orange'></option>
        <option value='green'></option>
      </select>
      <select className='ql-header'>
        <option value=''></option>
        <option value='1'></option>
        <option value='2'></option>
        <option value='3'></option>
        <option value='4'></option>
        <option value='5'></option>
        <option value='6'></option>
      </select>
      <button className='ql-image' aria-label='Image' />
      <button className='ql-video' aria-label='Video' />
      <button className='ql-link' aria-label='Link' />
      <button className='ql-list' value='ordered' aria-label='List' />
      <button className='ql-list' value='bullet' aria-label='List' />
      <select className='ql-align'>
        <option value=''></option>
        <option value='center'></option>
        <option value='right'></option>
        <option value='justify'></option>
      </select>
    </span>)

  const editorHeader = renderEditorHeader()

  const addTour = async () => {
    setLoading(true)
    const res = await fetch('/api/tours/addtour', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(tour)
    })
    const response = await res.json()
    if (response) {toast.current.show({severity:'success', detail:'Тур добавлен', life: 2000})}
    else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
    setLoading(false)
    setAddDialog(false)
    await mutate('/api/tours/getalltours', fetcher('/api/tours/getalltours', {revalidate: false}))
  }

  const deleteTour = async (id) => {
    const res = await fetch('/api/tours/deletetour', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ id })
    })
    const response = await res.json()
    if (response.state) {toast.current.show({severity:'success', detail:'Тур удалён', life: 2000})}
    else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
    await mutate('/api/tours/getalltours', fetcher('/api/tours/getalltours', {revalidate: false}))
  }

  const openEditDialog = (tour) => {
    setTour(tour)
    setImages(tour.img)
    setEditDialog(true)
  }

  const closeEditDialog = () => {
    setEditDialog(false)
    setTour({
      img: [],
      name: '',
      slug: '',
      description: '',
      Important: '',
      included: '',
      price: '',
      dprice: '',
      program: '',
      region: '',
      booking: '',
      utp: [],
      public: true
    })
    setImages([])
  }

  const editTour = async () => {
    const res = await fetch('/api/tours/updatetour', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          id: tour._id,
          data: tour
        })
      })
    const response = await res.json()
    if (response.state) {
      toast.current.show({severity:'success', detail:'Изменения сохранены', life: 2000})
      await mutate('/api/tours/getalltours', fetcher('/api/tours/getalltours'))
      setTour(
        {img: [],
        name: '',
        slug: '',
        description: '',
        Important: '',
        included: '',
        price: '',
        dprice: '',
        program: '',
        region: '',
        booking: '',
        utp: [],
        public: true
      })
      setImages([])
      setEditDialog(false)
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const uploadImage = async () => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', inputFile.current.files[0])
    const res = await fetch('/api/uploadtour', {
      method: 'POST',
      body: formData
    })
    const response = await res.json()
    if (response.state) {
      images.push(`/img/tours/${response.name}`)
      setTour({...tour, img: images})
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const deleteImage = async path => {
    const res = await fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify(path)
    })
    const response = await res.json()
    if (response.state) {
      setTour({...tour, img: images.filter(item => item !== path)})
      setImages(tour.img)
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
    setTour({...tour, img: []})
  }

  if (!tours) return <Loader />

  return (
    <>
      <Head>
        <title>Панель управления / Список туров</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' key='viewport' />
      </Head>
      <AdminLayout>
        <main className='p-6'>
          <Button label='Добавить тур' icon='pi pi-plus' severity='secondary' outlined onClick={() => setAddDialog(true)} />
          <div className="mt-3">
            <DataTable value={tours} loading={isLoading} size='small' dataKey='_id' stripedRows removableSort paginator responsiveLayout='scroll' paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown' currentPageReportTemplate='Строки {first} - {last} из {totalRecords}' rows={20} rowsPerPageOptions={[20,50,tours ? tours.length : 0]} filters={filters} globalFilterFields={['name', 'region']} header={headerTemplate} emptyMessage='Данных нет' style={{fontSize:14}} tableStyle={{ minWidth: '50rem' }}>
              <Column header='#' body={(data, options) => <div>{options.rowIndex + 1}</div>} />
              <Column header='Название' field='name' sortable body={data => <div className={`${!data.public && 'line-through'}`}>{data.name}</div>} />
              <Column header='Регион' field='region' sortable body={data => <div className={`${!data.public && 'line-through'}`}>{data.region}</div>} />
              <Column body={(data, options) => (
                <div className='flex align-items-center justify-content-end'>
                  <Button icon='pi pi-pencil' rounded text severity='secondary' aria-label='Edit' onClick={() => openEditDialog(data)}/>
                  <Button icon='pi pi-trash' rounded text severity='danger' aria-label='Delete' onClick={() => deleteTour(data._id)} />
                </div>)} />
            </DataTable>
          </div>
          {/* Добавить тур */}
          <Dialog header={<div><i className='pi pi-building-columns mr-3' style={{ fontSize: '1.5rem' }} />Добавить тур</div>} visible={addDialog} maximized draggable={false} onHide={() => {if (!addDialog) return; setAddDialog(false); }} footer={footerContent}>
            <div className='grid w-full px-3 py-1'>
              <div className='col flex flex-column gap-2'>
                <InputText name='name' type='text' className='w-full p-inputtext-sm' placeholder='Название тура' value={tour.name} onChange={(e) => handleNameChange(e)} />
                <div className='text-xs -mt-2'>{tour.slug}</div>
                <Chips name='utp' value={tour.utp} onChange={(e) => handleChange(e)} max={3} placeholder='UTP' className='w-full block p-inputtext-sm' />
                <div className='grid w-full'>
                  <div className='col'>
                    <InputText name='price' keyfilter='money' className='w-full p-inputtext-sm' placeholder='Цена' value={tour.price} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col'>
                    <InputText name='dprice' type='text' className='w-full p-inputtext-sm' placeholder='Пояснение' value={tour.dprice} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <form>
                  <div className='flex align-items-center grid w-full mt-1 px-2'>
                    {/* <InputText name='coord' type='text' className='p-inputtext-sm mr-3' placeholder='Координаты' value={tour.coord} onChange={(e) => handleChange(e)} /> */}
                    <div>
                      <label className='block -mt-2 text-xs'>Загрузить изображение</label>
                      <input type='file' name='file' ref={inputFile} onChange={() => uploadImage()} className='p-button p-button-outlined p-button-sm mb-2' disabled={!tour.name} />
                    </div>
                    <Button icon='pi pi-trash' severity='secondary' rounded disabled={!images.length} text size="large" className='ml-1' onClick={() => clearImagesList()} />
                  </div>
                </form>
                {renderImagesList()}
              </div>
              <div className='col'>
                <Editor value={tour.description} onTextChange={(e) => handleEditorChange(e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Описание' />
                {/* <Editor value={tour.actions} onTextChange={(e) => handleActionsChange(e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Акции' className='mt-2' /> */}
              </div>
            </div>
          </Dialog>
          {/* Добавить тур */}
          {/* Редактировать тур */}
          {/* <Dialog header={<div><i className='pi pi-building-columns mr-3' style={{ fontSize: '1.5rem' }} />Редактировать отель</div>} visible={editDialog} maximized draggable={false} onHide={() => {if (!editDialog) return; setEditDialog(false); }} footer={footerEditContent}>
            <div className='grid w-full px-3 py-1'>
              <div className='col flex flex-column gap-2'>
                <InputText name='name' type='text' className='w-full p-inputtext-sm' placeholder='Название отеля' value={tour.name} onChange={(e) => handleNameChange(e)} />
                <div className='text-xs -mt-2'>{tour.slug}</div>
                <InputText name='url' type='text' className='w-full p-inputtext-sm' placeholder='URL' value={tour.url} onChange={(e) => handleChange(e)} />
                <InputText name='address' type='text' className='w-full p-inputtext-sm' placeholder='Адрес' value={tour.address} onChange={(e) => handleChange(e)} />
                <div className='grid w-full flex align-items-center'>
                  <div className='col'>
                    <InputText name='label' type='text' className='w-full p-inputtext-sm' placeholder='Ярлык на главной фотографии' value={tour.label} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col'>
                    <InputText name='simple_name' type='text' className='w-full p-inputtext-sm' placeholder='Краткое название' value={tour.simple_name} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <Chips name='utp' value={tour.utp} onChange={(e) => handleChange(e)} max={3} placeholder='UTP' className='w-full block p-inputtext-sm' />
                <div className='grid w-full flex align-items-center'>
                  <div className='col'>
                    <InputText name='city' type='text' className='w-full p-inputtext-sm' placeholder='Город' value={tour.city} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col'>
                    <Dropdown name='type' value={tour.type} onChange={(e) => handleChange(e)} options={types} placeholder='Тип' className='w-full p-inputtext-sm' checkmark={true}  highlightOnSelect={false} showClear />
                  </div>
                  <div className='col'>
                    <Dropdown name='best' value={tour.best} onChange={(e) => handleChange(e)} options={best} optionLabel='name' placeholder='ТОП-3' className='w-full p-inputtext-sm' checkmark={true}  highlightOnSelect={false} />
                  </div>
                  <div className='col'>
                    <Rating name='stars' value={tour.stars} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <div className='grid w-full'>
                  <div className='col'>
                    <InputText name='price' keyfilter='money' className='w-full p-inputtext-sm' placeholder='Цена' value={tour.price} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col'>
                    <InputText name='dprice' type='text' className='w-full p-inputtext-sm' placeholder='Пояснение' value={tour.dprice} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col'>
                    <InputText name='rating' keyfilter='num' type='text' className='w-full p-inputtext-sm' placeholder='Рейтинг' value={tour.rating} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <form>
                  <div className='flex align-items-center grid w-full mt-1 mb-2 px-2'>
                    <InputText name='coord' type='text' className='p-inputtext-sm mr-3' placeholder='Координаты' value={tour.coord} onChange={(e) => handleChange(e)} />
                    <div>
                      <label className='block -mt-2 text-xs'>Загрузить изображение</label>
                      <input type='file' name='file' ref={inputFile} onChange={uploadImage} className='p-button p-button-outlined p-button-sm mb-2' disabled={!tour.name} />
                    </div>
                    <Button icon='pi pi-trash' severity='secondary' rounded disabled={!images.length} text size="large" className='ml-1' onClick={() => clearImagesList()} />
                  </div>
                </form>
                {renderImagesList()}
              </div>
              <div className='col'>
                <Editor value={tour.description} onTextChange={(e) => handleEditorChange(e.htmlValue)} headerTemplate={editorHeader} style={{ height: '215px' }} placeholder='Описание' />
                <Editor value={tour.actions} onTextChange={(e) => handleActionsChange(e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Акции' className='mt-2' />
                <div className='flex align-items-center mt-2'>
                  <Checkbox inputId='public' name='public' onChange={e => handlePublicChange(e.checked)} checked={tour.public} />
                  <label htmlFor='public' className='ml-2'>Опубликован</label>
                </div>
              </div>
            </div>
          </Dialog> */}
          {/* Редактировать тур */}
        </main>
      </AdminLayout>
      <Toast ref={toast} position='top-center' />
    </>
  )
}
