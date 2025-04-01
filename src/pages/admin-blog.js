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
import { Calendar } from 'primereact/calendar'
import { FileUpload } from 'primereact/fileupload'
import { FloatLabel } from 'primereact/floatlabel'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Blog() {
  const toast = useRef(null)
  const main = useRef(null)
  const gallery = useRef(null)
  const [loading, setLoading] = useState(false)
  const [addDialog, setAddDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [images, setImages] = useState([])
  const [filters, setFilters] = useState({'global': { value: null, matchMode: FilterMatchMode.CONTAINS }})
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [article, setArticle] = useState({
    img: '',
    title: '',
    slug: '',
    short_title: '',
    announce: '',
    text: '',
    gallery: [],
    tags: [],
    date: '',
    html_title: '',
    meta_description: '',
    public: true
  })

  const { data: articles, isLoading } = useSWR('/api/blog/getallarticles', fetcher, { revalidateOnFocus: false })

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
    setArticle(prevState => ({
        ...prevState,
        [name]: value
    }))}

  const handleEditorChange = value => {
    setArticle(prevState => ({
        ...prevState,
        'text': value
    }))}

  const handlePublicChange = value => {
    setArticle(prevState => ({
        ...prevState,
        'public': value
    }))}

    const handleDateChange = value => {
      setArticle(prevState => ({
          ...prevState,
          'date': value
      }))}

  const handleTitleChange = e => {
    const { value } = e.target
    setArticle(prevState => ({
        ...prevState,
        'title': value,
        'slug': slug(value)
    }))}

  const footerContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => closeDialog()} className='p-button-text' />
      <Button label='Добавить' icon='pi pi-plus' loading={loading} onClick={() => addArticle()} autoFocus disabled={!article.title} />
    </div>
  )

  const footerEditContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => closeDialog()} className='p-button-text' />
      <Button label='Сохранить' icon='pi pi-save' loading={loading} onClick={() => editArticle()} />
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

  const checkSlug = async () => {
    const res = await fetch('/api/blog/checkslug', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(article.slug)
    })
    const response = await res.json()
    if (response.state) {
      return true
    } else {
      return false
    }
  }

  const addArticle = async () => {
    const check = await checkSlug()
    if (check) {
      toast.current.show({severity:'info', summary:'Заголовок не уникальный!', life: 2000})
    } else {
      setLoading(true)
      const res = await fetch('/api/blog/addarticle', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(article)
      })
      const response = await res.json()
      if (response) {toast.current.show({severity:'success', detail:'Статья добавлена', life: 2000})}
      else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
      setLoading(false)
      setAddDialog(false)
      await mutate('/api/blog/getallarticles', fetcher('/api/blog/getallarticles', {revalidate: false}))
    }
  }

  const deleteArticle = async (id) => {
    const res = await fetch('/api/blog/deletearticle', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ id })
    })
    const response = await res.json()
    if (response.state) {toast.current.show({severity:'success', detail:'Статья удалена', life: 2000})}
    else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
    await mutate('/api/blog/getallarticles', fetcher('/api/blog/getallarticles', {revalidate: false}))
  }

  const openEditDialog = (article) => {
    setArticle(article)
    setImages(article.gallery)
    setEditDialog(true)
  }

  const closeDialog = () => {
    setEditDialog(false)
    setAddDialog(false)
    setArticle({})
    setImages([])
  }

  const editArticle = async () => {
    const res = await fetch('/api/blog/updatearticle', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          id: article._id,
          data: article
        })
      })
    const response = await res.json()
    if (response.state) {
      toast.current.show({severity:'success', detail:'Изменения сохранены', life: 2000})
      await mutate('/api/blog/getallarticles', fetcher('/api/blog/getallarticles'))
      setArticle({
        img: '',
        title: '',
        slug: '',
        short_title: '',
        announce: '',
        text: '',
        gallery: [],
        tags: [],
        date: '',
        html_title: '',
        meta_description: '',
        public: true
      })
      setImages([])
      setEditDialog(false)
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const uploadMain = async ({files}) => {
    event.preventDefault()
    const [file] = files
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/uploadblog', {
      method: 'POST',
      body: formData
    })
    const response = await res.json()
    if (response.state) {
      setArticle({...article, img: `/img/blog/${response.name}`})
      main.current.clear()
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const uploadImage = async ({files}) => {
    event.preventDefault()
    const [file] = files
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/uploadblog', {
      method: 'POST',
      body: formData
    })
    const response = await res.json()
    if (response.state) {
      images.push(`/img/blog/${response.name}`)
      setArticle({...article, gallery: images})
      gallery.current.clear()
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const deleteMainImage = async path => {
    const res = await fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify(path)
    })
    const response = await res.json()
    if (response.state) {
      setArticle({...article, img: ''})
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const deleteImage = async path => {
    const res = await fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify(path)
    })
    const response = await res.json()
    if (response.state) {
      setArticle({...article, gallery: images.filter(item => item !== path)})
      setImages(images.filter(item => item !== path))
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
    setArticle({...article, gallery: []})
  }

  if (isLoading) return <Loader />

  return (
    <>
      <Head>
        <title>Панель управления / Блог</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' key='viewport' />
      </Head>
      <AdminLayout>
        <main className='p-6'>
          <Button label='Добавить статью' icon='pi pi-plus' severity='secondary' outlined onClick={() => setAddDialog(true)} />
          <div className="mt-3">
            <DataTable value={articles} loading={isLoading} size='small' dataKey='_id' stripedRows removableSort paginator responsiveLayout='scroll' paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown' currentPageReportTemplate='Строки {first} - {last} из {totalRecords}' rows={20} rowsPerPageOptions={[20,50,articles ? articles.length : 0]} filters={filters} globalFilterFields={['title']} header={headerTemplate} emptyMessage='Статей нет' style={{fontSize:14}} tableStyle={{ minWidth: '50rem' }}>
              <Column header='#' body={(data, options) => <div>{options.rowIndex + 1}</div>} />
              <Column header='Заголовок' field='title' sortable body={data => <div className={`${!data.public && 'line-through'}`}>{data.title}</div>} />
              <Column header='Дата' field='date' sortable body={data => <div className={`${!data.public && 'line-through'}`}>{new Date(data.date).toLocaleDateString()}</div>} />
              <Column body={(data, options) => (
                <div className='flex align-items-center justify-content-end'>
                  <Button icon='pi pi-pencil' rounded text severity='secondary' aria-label='Edit' onClick={() => openEditDialog(data)}/>
                  <Button icon='pi pi-trash' rounded text severity='danger' aria-label='Delete' onClick={() => deleteArticle(data._id)} />
                </div>)} />
            </DataTable>
          </div>
          {/* Добавить статью */}
          <Dialog header={<div><i className='pi pi-pen-to-square mr-3' style={{ fontSize: '1.5rem' }} />Добавить статью</div>} visible={addDialog} maximized draggable={false} onHide={() => {if (!addDialog) return; closeDialog(); }} footer={footerContent}>
            <div className='grid w-full px-3 py-1'>
              <div className='col-9 flex flex-column gap-2'>
                <div className='flex align-items-start gap-2'>
                  <div className='w-full'>
                    <InputText name='title' type='text' className='w-full p-inputtext-sm' placeholder='Заголовок статьи' value={article.title} onChange={(e) => handleTitleChange(e)} />
                    <div className='text-xs ml-1 mt-1 h-1rem'>{article.slug}</div>
                  </div>
                  <InputText name='short_title' type='text' variant='filled' className='w-6 p-inputtext-sm' placeholder='Короткий заголовок' value={article.short_title} onChange={(e) => handleChange(e)} />
                  <Calendar value={article.date} onChange={(e) => handleDateChange(e.value)} dateFormat='dd.mm.yy' locale='en' selectOtherMonths={true} placeholder='Дата' className='p-inputtext-sm'/>
                </div>
                <div className='flex align-items-center mb-2'>
                  <InputTextarea name='announce' className='w-full p-inputtext-sm' placeholder='Анонс статьи' value={article.announce} onChange={(e) => handleChange(e)} rows={2} cols={30} />
                  <FloatLabel className='w-6'>
                    <Chips id='tags' name='tags' value={article.tags} variant='filled' onChange={(e) => handleChange(e)} max={3} className='w-full block p-inputtext-sm ml-2 pr-2' />
                    <label htmlFor='tags'>Теги</label>
                  </FloatLabel>
                </div>
                <Editor value={article.text} onTextChange={(e) => handleEditorChange(e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Текст статьи' />
                <div className='flex align-items-center mb-3 mt-2'>
                  <FileUpload
                    ref={gallery}
                    name='gallery'
                    accept='image/*'
                    customUpload={true}
                    uploadHandler={uploadImage}
                    mode='basic'
                    auto={true}
                    chooseLabel='Галерея'
                  />
                  <div className='flex align-items-center ml-3'>
                    <Checkbox inputId='public' name='public' onChange={e => handlePublicChange(e.checked)} checked={article.public} />
                    <label htmlFor='public' className='ml-2'>Опубликована</label>
                  </div>
                </div>
                {renderImagesList()}
              </div>
              <div className='col-3'>
                <FileUpload
                  ref={main}
                  name='main'
                  accept='image/*'
                  customUpload={true}
                  uploadHandler={uploadMain}
                  mode='basic'
                  auto={true}
                  disabled={article.img}
                  chooseLabel='Заглавное фото'
                  className='mb-3'
                />
                {article.img && <div className='relative'>
                <Image src={article.img} alt='Image' width='100%' preview className='shadow-1' />
                <i className='pi pi-times cursor-pointer absolute right-0 top-0 mr-1 mt-1 p-1' style={{fontSize:'.8rem', color:'white'}} onClick={() => deleteMainImage(article.img)} /></div>}
                <InputText name='html_title' type='text' variant='filled' className='w-full p-inputtext-sm mt-2' placeholder='HTML Title' value={article.html_title} onChange={(e) => handleChange(e)} />
                <InputTextarea name='meta_description' variant='filled' className='w-full p-inputtext-sm mt-2' placeholder='Meta Description' value={article.meta_description} onChange={(e) => handleChange(e)} rows={3} cols={30} />
              </div>
            </div>
          </Dialog>
          {/* Добавить сатью */}
          {/* Редактировать сатью */}
          <Dialog header={<div><i className='pi pi-pen-to-square mr-3' style={{ fontSize: '1.5rem' }} />Редактировать статью</div>} visible={editDialog} maximized draggable={false} onHide={() => {if (!editDialog) return; closeDialog(); }} footer={footerEditContent}>
            <div className='grid w-full px-3 py-1'>
              <div className='col-9 flex flex-column gap-2'>
                <div className='flex align-items-start gap-2'>
                  <div className='w-full'>
                    <InputText name='title' type='text' className='w-full p-inputtext-sm' placeholder='Заголовок статьи' value={article.title} onChange={(e) => handleTitleChange(e)} />
                    <div className='text-xs ml-1 mt-1 h-1rem'>{article.slug}</div>
                  </div>
                  <InputText name='short_title' type='text' variant='filled' className='w-6 p-inputtext-sm' placeholder='Короткий заголовок' value={article.short_title} onChange={(e) => handleChange(e)} />
                  <Calendar value={article.date} onChange={(e) => handleDateChange(e.value)} dateFormat='dd.mm.yy' locale='en' selectOtherMonths={true} placeholder='Дата' className='p-inputtext-sm'/>
                </div>
                <div className='flex align-items-center mb-2'>
                  <InputTextarea name='announce' className='w-full p-inputtext-sm' placeholder='Анонс статьи' value={article.announce} onChange={(e) => handleChange(e)} rows={2} cols={30} />
                  <FloatLabel className='w-6'>
                    <Chips id='tags' name='tags' value={article.tags} variant='filled' onChange={(e) => handleChange(e)} max={3} className='w-full block p-inputtext-sm ml-2 pr-2' />
                    <label htmlFor='tags'>Теги</label>
                  </FloatLabel>
                </div>
                <Editor value={article.text} onTextChange={(e) => handleEditorChange(e.htmlValue)} headerTemplate={editorHeader} style={{ height: '200px' }} placeholder='Текст статьи' />
                <div className='flex align-items-center mb-3 mt-2'>
                  <FileUpload
                    ref={gallery}
                    name='gallery'
                    accept='image/*'
                    customUpload={true}
                    uploadHandler={uploadImage}
                    mode='basic'
                    auto={true}
                    chooseLabel='Галерея'
                  />
                  <div className='flex align-items-center ml-3'>
                    <Checkbox inputId='public' name='public' onChange={e => handlePublicChange(e.checked)} checked={article.public} />
                    <label htmlFor='public' className='ml-2'>Опубликована</label>
                  </div>
                </div>
                {renderImagesList()}
              </div>
              <div className='col-3'>
                <FileUpload
                  ref={main}
                  name='main'
                  accept='image/*'
                  customUpload={true}
                  uploadHandler={uploadMain}
                  mode='basic'
                  auto={true}
                  disabled={article.img}
                  chooseLabel='Заглавное фото'
                  className='mb-3'
                />
                {article.img && <div className='relative'>
                <Image src={article.img} alt='Image' width='100%' preview className='shadow-1' />
                <i className='pi pi-times cursor-pointer absolute right-0 top-0 mr-1 mt-1 p-1' style={{fontSize:'.8rem', color:'white'}} onClick={() => deleteMainImage(article.img)} /></div>}
                <InputText name='html_title' type='text' variant='filled' className='w-full p-inputtext-sm mt-2' placeholder='HTML Title' value={article.html_title} onChange={(e) => handleChange(e)} />
                <InputTextarea name='meta_description' variant='filled' className='w-full p-inputtext-sm mt-2' placeholder='Meta Description' value={article.meta_description} onChange={(e) => handleChange(e)} rows={3} cols={30} />
              </div>
            </div>
          </Dialog>
          {/* Редактировать сатью */}
        </main>
      </AdminLayout>
      <Toast ref={toast} position='top-center' />
    </>
  )
}
