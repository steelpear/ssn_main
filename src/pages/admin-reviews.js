import { useState, useRef } from 'react'
import Head from 'next/head'
import useSWR, { useSWRConfig } from 'swr'
import { AdminLayout } from '../components/AdminLayout'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Loader } from '../components/Loader'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { Checkbox } from 'primereact/checkbox'
import { Rating } from 'primereact/rating'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Reviews() {
  const toast = useRef(null)
  const [loading, setLoading] = useState(false)
  const [addDialog, setAddDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [filters, setFilters] = useState({'global': { value: null, matchMode: FilterMatchMode.CONTAINS }})
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [review, setReview] = useState({
    img: '',
    name: '',
    city: '',
    date: '',
    text: '',
    rating: '5',
    public: true
  })

  const { data: reviews, isLoading } = useSWR('/api/reviews/getallreviews', fetcher, { revalidateOnFocus: false })

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

  const headerTemplate = () => (<div className='flex align-items-center justify-content-end'>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search pt-1" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Поиск" className='w-full md:w-16rem pr-5' />
          <InputIcon className="pi pi-times cursor-pointer -ml-4 pt-1" onClick={() => initFilters()} />
        </IconField>
      </div>)

  const handleChange = e => {
    const { name, value } = e.target
    setReview(prevState => ({
        ...prevState,
        [name]: value
    }))}

    const handlePublicChange = value => {
      setReview(prevState => ({
          ...prevState,
          'public': value
      }))}

  const footerContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => closeAddDialog()} className='p-button-text' />
      <Button label='Добавить' icon='pi pi-plus' loading={loading} onClick={() => addReview()} autoFocus disabled={!review.name} />
    </div>)

  const footerEditContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => closeEditDialog()} className='p-button-text' />
      <Button label='Сохранить' icon='pi pi-save' loading={loading} onClick={() => editReview()} />
    </div>)

const deleteReview = async (id) => {
  const res = await fetch('/api/reviews/deletereview', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ id })
  })
  const response = await res.json()
  if (response.state) {toast.current.show({severity:'success', detail:'Отзыв удалён', life: 2000})}
  else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
  await mutate('/api/reviews/getallreviews', fetcher('/api/reviews/getallreviews', {revalidate: false}))
}

const editReview = async () => {
  const res = await fetch('/api/reviews/updatereview', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        id: review._id,
        data: review
      })
    })
const response = await res.json()
  if (response.state) {
    toast.current.show({severity:'success', detail:'Изменения сохранены', life: 2000})
    await mutate('/api/reviews/getallreviews', fetcher('/api/reviews/getallreviews'))
    setReview({
      img: '',
      name: '',
      city: '',
      date: '',
      text: '',
      rating: '5',
      public: true
    })
    setEditDialog(false)
  } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
}

const openEditDialog = (review) => {
  setReview(review)
  setEditDialog(true)
}

const closeEditDialog = () => {
  setEditDialog(false)
  setReview({
    img: '',
    name: '',
    city: '',
    date: '',
    text: '',
    rating: '5',
    public: true
  })
}

const closeAddDialog = () => {
  setAddDialog(false)
  setReview({
    img: '',
    name: '',
    city: '',
    date: '',
    text: '',
    rating: '5',
    public: true
  })
}

const addReview = async () => {
  setLoading(true)
  const res = await fetch('/api/reviews/addreview', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(review)
  })
  const response = await res.json()
  if (response) {toast.current.show({severity:'success', detail:'Отзыв добавлен', life: 2000})}
  else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
  setLoading(false)
  setAddDialog(false)
  setReview({
    img: '',
    name: '',
    city: '',
    date: '',
    text: '',
    rating: '5',
    public: true
  })
  await mutate('/api/reviews/getallreviews', fetcher('/api/reviews/getallreviews', {revalidate: false}))
}

  if (!reviews) return <Loader />

  return (
    <>
      <Head>
        <title>Панель управления / Отзывы</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <AdminLayout>
        <main className='p-6'>
          <Button label='Добавить отзыв' icon='pi pi-plus' severity='secondary' outlined onClick={() => setAddDialog(true)} />
          <div className="mt-3">
            <DataTable value={reviews} loading={isLoading} size='small' dataKey='_id' stripedRows removableSort paginator responsiveLayout='scroll' paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown' currentPageReportTemplate='Строки {first} - {last} из {totalRecords}' rows={20} rowsPerPageOptions={[20,50,reviews ? review.length : 0]} filters={filters} globalFilterFields={['name', 'city', 'text']} header={headerTemplate} emptyMessage='Данных нет' style={{fontSize:14}} tableStyle={{ minWidth: '50rem' }}>
              <Column header='#' body={(data, options) => <div>{options.rowIndex + 1}</div>} />
              <Column header='Имя' field='name' sortable body={data => <div className={`${!data.public && 'line-through'}`}>{data.name}</div>} />
              <Column header='Город' field='city' sortable body={data => <div className={`${!data.public && 'line-through'}`}>{data.city}</div>} />
              <Column body={(data, options) => (
                <div className='flex align-items-center justify-content-end'>
                  <Button icon='pi pi-pencil' rounded text severity='secondary' aria-label='Edit' onClick={() => openEditDialog(data)}/>
                  <Button icon='pi pi-trash' rounded text severity='danger' aria-label='Delete' onClick={() => deleteReview(data._id)} />
                </div>)} />
            </DataTable>
          </div>
          {/* Добавить отзыв */}
          <Dialog header={<div><i className='pi pi-comment mr-3' style={{ fontSize: '1.5rem' }} />Добавить отзыв</div>} visible={addDialog} style={{ width: '50vw' }} maximizable draggable={false} onHide={() => {if (!addDialog) return; setAddDialog(false); }} footer={footerContent}>
            <div className='grid w-full py-3'>
              <div className='w-full flex gap-2 align-items-center'>
                <div className='col px-0'>
                  <InputText name='name' type='text' className='w-full p-inputtext-sm' placeholder='Имя' value={review.name} onChange={(e) => handleChange(e)} />
                </div>
                <div className='col px-0'>
                  <InputText name='city' type='text' className='w-full p-inputtext-sm' placeholder='Где отдыхали' value={review.city} onChange={(e) => handleChange(e)} />
                </div>
              </div>
              <InputTextarea name='text' className='w-full p-inputtext-sm' placeholder='Текст отзыва' value={review.text} onChange={(e) => handleChange(e)} rows={5} cols={30} />
              <div className='w-full flex gap-2 align-items-center'>
                <div className='col px-0'>
                  <InputText name='date' type='text' className='w-full p-inputtext-sm' placeholder='Когда отдыхали' value={review.date} onChange={(e) => handleChange(e)} />
                </div>
                <div className='col px-0'>
                  <Rating name='rating' value={review.rating} onChange={(e) => handleChange(e)} />
                </div>
                <div className='col px-0'>
                  <div className='flex align-items-center mt-2'>
                    <Checkbox inputId='public' name='public' onChange={e => handlePublicChange(e.checked)} checked={review.public} />
                    <label htmlFor='public' className='ml-2'>Опубликован</label>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
          {/* Добавить отзыв */}
          {/* Редактировать отзыв */}
           <Dialog header={<div><i className='pi pi-comment mr-3' style={{ fontSize: '1.5rem' }} />Редактировать отзыв</div>} visible={editDialog} style={{ width: '50vw' }} maximizable draggable={false} onHide={() => {if (!editDialog) return; setEditDialog(false); }} footer={footerEditContent}>
            <div className='grid w-full py-3'>
              <div className='w-full flex gap-2 align-items-center'>
                <div className='col px-0'>
                  <InputText name='name' type='text' className='w-full p-inputtext-sm' placeholder='Имя' value={review.name} onChange={(e) => handleChange(e)} />
                </div>
                <div className='col px-0'>
                  <InputText name='city' type='text' className='w-full p-inputtext-sm' placeholder='Где отдыхали' value={review.city} onChange={(e) => handleChange(e)} />
                </div>
              </div>
              <InputTextarea name='text' className='w-full p-inputtext-sm' placeholder='Текст отзыва' value={review.text} onChange={(e) => handleChange(e)} rows={5} cols={30} />
              <div className='w-full flex gap-2 align-items-center'>
                <div className='col px-0'>
                  <InputText name='date' type='text' className='w-full p-inputtext-sm' placeholder='Когда отдыхали' value={review.date} onChange={(e) => handleChange(e)} />
                </div>
                <div className='col px-0'>
                  <Rating name='rating' value={review.rating} onChange={(e) => handleChange(e)} />
                </div>
                <div className='col px-0'>
                  <div className='flex align-items-center mt-2'>
                    <Checkbox inputId='public' name='public' onChange={e => handlePublicChange(e.checked)} checked={review.public} />
                    <label htmlFor='public' className='ml-2'>Опубликован</label>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
          {/* Редактировать отзыв */}
        </main>
      </AdminLayout>
      <Toast ref={toast} position='top-center' />
    </>
  )
}
