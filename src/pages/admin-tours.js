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
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Chips } from 'primereact/chips'
import { Image } from 'primereact/image'
import { Checkbox } from 'primereact/checkbox'
import { Editor } from 'primereact/editor'
import { TabView, TabPanel } from 'primereact/tabview'

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
    important: '',
    price: '',
    dprice: '',
    program: '',
    placement: '',
    region: '',
    duration: '',
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

  const handleEditorChange = (name, value) => {
    setTour(prevState => ({
        ...prevState,
        [name]: value
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
      <Button label='Отмена' icon='pi pi-times' onClick={() => closeDialog()} className='p-button-text' />
      <Button label='Добавить' icon='pi pi-plus' loading={loading} onClick={() => addTour()} autoFocus disabled={!tour.name} />
    </div>
  )

  const footerEditContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => closeDialog()} className='p-button-text' />
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

  const closeDialog = () => {
    setEditDialog(false)
    setAddDialog(false)
    setTour({})
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
        important: '',
        price: '',
        dprice: '',
        program: '',
        placement: '',
        region: '',
        duration: '',
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
          <Dialog header={<div><i className='pi pi-globe mr-3' style={{ fontSize: '1.5rem' }} />Добавить тур</div>} visible={addDialog} maximized draggable={false} onHide={() => {if (!addDialog) return; setAddDialog(false); }} footer={footerContent}>
            <div className='grid no-gutter w-full px-3 py-1'>
              <div className='col-5 flex flex-column gap-2'>
                <InputText name='name' type='text' className='w-full p-inputtext-sm' placeholder='Название тура' value={tour.name} onChange={(e) => handleNameChange(e)} />
                <div className='text-xs -mt-2'>{tour.slug}</div>
                <Chips name='utp' value={tour.utp} onChange={(e) => handleChange(e)} max={6} placeholder='УТП' className='w-full block p-inputtext-sm' />
                <div className='flex gap-2 w-full align-items-center'>
                  <div className='col p-0'>
                    <InputText name='region' type='text' className='w-full p-inputtext-sm' placeholder='Регион' value={tour.region} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col p-0'>
                    <InputText name='duration' type='text' className='w-full p-inputtext-sm' placeholder='Длительность' value={tour.duration} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <div className='flex gap-2 w-full align-items-center'>
                  <div className='col p-0'>
                    <InputText name='price' keyfilter='money' className='w-full p-inputtext-sm' placeholder='Цена' value={tour.price} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col p-0'>
                    <InputText name='dprice' type='text' className='w-full p-inputtext-sm' placeholder='Пояснение к цене' value={tour.dprice} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <InputTextarea name='booking' type='text' className='w-full p-inputtext-sm' placeholder='Условия бронирования' value={tour.booking} onChange={(e) => handleChange(e)} rows={5} cols={30} />
                <form>
                  <div className='flex align-items-center grid w-full mt-1 px-2'>
                    <div>
                      <label className='block -mt-2 text-xs'>Загрузить изображение</label>
                      <input type='file' name='file' ref={inputFile} onChange={() => uploadImage()} className='p-button p-button-outlined p-button-sm mb-2' disabled={!tour.name} />
                    </div>
                    <Button icon='pi pi-trash' severity='secondary' rounded disabled={!images.length} text size="large" className='ml-1' onClick={() => clearImagesList()} />
                  </div>
                </form>
                {renderImagesList()}
              </div>
              <div className='col-7 p-0'>
                <TabView pt={{ navContainer: {className: 'px-2'}, panelContainer: {className: 'px-0'}}}>
                  <TabPanel header='Описание'>
                    <Editor value={tour.description} onTextChange={(e) => handleEditorChange('description', e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Описание' />
                  </TabPanel>
                  <TabPanel header='Программа'>
                    <Editor value={tour.program} onTextChange={(e) => handleEditorChange('program', e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Программа' />
                  </TabPanel>
                  <TabPanel header='Размещение'>
                    <Editor value={tour.placement} onTextChange={(e) => handleEditorChange('placement', e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Размещение' />
                  </TabPanel>
                  <TabPanel header='Важное'>
                    <Editor value={tour.important} onTextChange={(e) => handleEditorChange('important', e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Важное' />
                  </TabPanel>
                </TabView>
              </div>
            </div>
          </Dialog>
          {/* Добавить тур */}
          {/* Редактировать тур */}
          <Dialog header={<div><i className='pi pi-globe mr-3' style={{ fontSize: '1.5rem' }} />Редактировать тур</div>} visible={editDialog} maximized draggable={false} onHide={() => {if (!editDialog) return; setEditDialog(false); }} footer={footerEditContent}>
            <div className='grid no-gutter w-full px-3 py-1'>
              <div className='col-5 flex flex-column gap-2'>
                <InputText name='name' type='text' className='w-full p-inputtext-sm' placeholder='Название тура' value={tour.name} onChange={(e) => handleNameChange(e)} />
                <div className='text-xs -mt-2'>{tour.slug}</div>
                <Chips name='utp' value={tour.utp} onChange={(e) => handleChange(e)} max={6} placeholder='УТП' className='w-full block p-inputtext-sm' />
                <div className='flex gap-2 w-full align-items-center'>
                  <div className='col p-0'>
                    <InputText name='region' type='text' className='w-full p-inputtext-sm' placeholder='Регион' value={tour.region} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col p-0'>
                    <InputText name='duration' type='text' className='w-full p-inputtext-sm' placeholder='Длительность' value={tour.duration} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <div className='flex gap-2 w-full align-items-center'>
                  <div className='col p-0'>
                    <InputText name='price' keyfilter='money' className='w-full p-inputtext-sm' placeholder='Цена' value={tour.price} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='col p-0'>
                    <InputText name='dprice' type='text' className='w-full p-inputtext-sm' placeholder='Пояснение к цене' value={tour.dprice} onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <InputTextarea name='booking' type='text' className='w-full p-inputtext-sm' placeholder='Условия бронирования' value={tour.booking} onChange={(e) => handleChange(e)} rows={5} cols={30} />
                <form>
                  <div className='flex align-items-center grid w-full mt-1 px-2'>
                    <div>
                      <label className='block -mt-2 text-xs'>Загрузить изображение</label>
                      <input type='file' name='file' ref={inputFile} onChange={() => uploadImage()} className='p-button p-button-outlined p-button-sm mb-2' disabled={!tour.name} />
                    </div>
                    <Button icon='pi pi-trash' severity='secondary' rounded disabled={!images.length} text size="large" className='ml-1' onClick={() => clearImagesList()} />
                  </div>
                </form>
                {renderImagesList()}
              </div>
              <div className='col-7 p-0'>
                <TabView pt={{ navContainer: {className: 'px-2'}, panelContainer: {className: 'px-0'}}}>
                  <TabPanel header='Описание'>
                    <Editor value={tour.description} onTextChange={(e) => handleEditorChange('description', e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Описание' />
                  </TabPanel>
                  <TabPanel header='Программа'>
                    <Editor value={tour.program} onTextChange={(e) => handleEditorChange('program', e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Программа' />
                  </TabPanel>
                  <TabPanel header='Размещение'>
                    <Editor value={tour.placement} onTextChange={(e) => handleEditorChange('placement', e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Размещение' />
                  </TabPanel>
                  <TabPanel header='Важное'>
                    <Editor value={tour.important} onTextChange={(e) => handleEditorChange('important', e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Важное' />
                  </TabPanel>
                </TabView>
                <div className='flex align-items-center mt-2 ml-1'>
                  <Checkbox inputId='public' name='public' onChange={e => handlePublicChange(e.checked)} checked={tour.public} />
                  <label htmlFor='public' className='ml-2'>Опубликован</label>
                </div>
              </div>
            </div>
          </Dialog>
          {/* Редактировать тур */}
        </main>
      </AdminLayout>
      <Toast ref={toast} position='top-center' />
    </>
  )
}
