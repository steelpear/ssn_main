import { useState, useRef } from 'react'
import Head from 'next/head'
import useSWR, { useSWRConfig } from 'swr'
import slug from 'slug'
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
import { Image } from 'primereact/image'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { MultiSelect } from 'primereact/multiselect'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function SetOfTours() {
  const toast = useRef(null)
  const inputFile = useRef(null)
  const [loading, setLoading] = useState(false)
  const [addDialog, setAddDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [selectedTours, setSelectedTours] = useState(null)
  const [filters, setFilters] = useState({'global': { value: null, matchMode: FilterMatchMode.CONTAINS }})
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [set, setSet] = useState({
    img: '',
    name: '',
    slug: '',
    description: '',
    tours: [],
    public: true
  })

  const { data: sets, isLoading } = useSWR('/api/setoftours/getallsets', fetcher, { revalidateOnFocus: false })

  const { data: tours } = useSWR('/api/tours/gettours', fetcher, { revalidateOnFocus: false })

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
    setSet(prevState => ({
        ...prevState,
        [name]: value
    }))}

  const handleNameChange = e => {
    const { value } = e.target
    setSet(prevState => ({
        ...prevState,
        'name': value,
        'slug': slug(value)
    }))}

  const handlePublicChange = value => {
    setSet(prevState => ({
        ...prevState,
        'public': value
    }))}

    const handleToursChange = value => {
      setSelectedTours(value)
      setSet(prevState => ({
        ...prevState,
        'tours': value
      }))}

  const footerContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => closeAddDialog()} className='p-button-text' />
      <Button label='Добавить' icon='pi pi-plus' loading={loading} onClick={() => addSet()} autoFocus disabled={!set.name} />
    </div>)

  const footerEditContent = (
    <div>
      <Button label='Отмена' icon='pi pi-times' onClick={() => closeEditDialog()} className='p-button-text' />
      <Button label='Сохранить' icon='pi pi-save' loading={loading} onClick={() => editSet()} />
    </div>)

  const deleteSet = async (id) => {
    const res = await fetch('/api/setoftours/deleteset', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ id })
    })
    const response = await res.json()
    if (response.state) {toast.current.show({severity:'success', detail:'Группа удалена', life: 2000})}
    else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
    await mutate('/api/setoftours/getallsets', fetcher('/api/setoftours/getallsets', {revalidate: false}))
  }

  const editSet = async () => {
    const res = await fetch('/api/setoftours/updateset', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          id: set._id,
          data: set
        })
      })
  const response = await res.json()
    if (response.state) {
      toast.current.show({severity:'success', detail:'Изменения сохранены', life: 2000})
      await mutate('/api/setoftours/getallsets', fetcher('/api/setoftours/getallsets'))
      setSet({
        img: '',
        name: '',
        slug: '',
        description: '',
        tours: [],
        public: true
      })
      setEditDialog(false)
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const openEditDialog = (set) => {
    setSet(set)
    setSelectedTours(set.tours)
    setEditDialog(true)
  }

  const closeEditDialog = () => {
    setEditDialog(false)
    setSelectedTours(null)
    setSet({
      img: '',
      name: '',
      slug: '',
      description: '',
      tours: [],
      public: true
    })
  }

  const closeAddDialog = () => {
    setAddDialog(false)
    setSelectedTours(null)
    setSet({
      img: '',
      name: '',
      slug: '',
      description: '',
      tours: [],
      public: true
    })
  }

  const addSet = async () => {
    setLoading(true)
    const res = await fetch('/api/setoftours/addset', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(set)
    })
    const response = await res.json()
    if (response) {toast.current.show({severity:'success', detail:'Группа добавлена', life: 2000})}
    else {toast.current.show({severity:'danger', detail:'Что-то пошло не так', life: 2000})}
    setLoading(false)
    setAddDialog(false)
    setSet({
      img: '',
      name: '',
      slug: '',
      description: '',
      tours: [],
      public: true
    })
    await mutate('/api/setoftours/getallsets', fetcher('/api/setoftours/getallsets', {revalidate: false}))
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
      setSet({...set, img: `/img/tours/${response.name}`})
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const deleteImage = async path => {
    const res = await fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify(path)
    })
    const response = await res.json()
    if (response.state) {
      setSet({...set, img: ''})
    } else {toast.current.show({severity:'danger', detail:'Что-то пошло не так!', life: 2000})}
  }

  const renderImagesList = () => (
  <div className='relative'>
    <Image src={set.img} alt="Image" width="150" preview />
    <i className='pi pi-times cursor-pointer absolute right-0 top-0 mr-1 mt-1' style={{fontSize:'.8rem', color:'white'}} onClick={() => deleteImage(set.img)} />
  </div>)

  if (!sets) return <Loader />

  return (
    <>
      <Head>
        <title>Панель управления / Группы туров</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <AdminLayout>
        <main className='p-6'>
          <Button label='Добавить группу' icon='pi pi-plus' severity='secondary' outlined onClick={() => setAddDialog(true)} />
          <div className="mt-3">
            <DataTable value={sets} loading={isLoading} size='small' dataKey='_id' stripedRows removableSort paginator responsiveLayout='scroll' paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown' currentPageReportTemplate='Строки {first} - {last} из {totalRecords}' rows={20} rowsPerPageOptions={[20,50,sets ? sets.length : 0]} filters={filters} globalFilterFields={['name', 'description']} header={headerTemplate} emptyMessage='Данных нет' style={{fontSize:14}} tableStyle={{ minWidth: '50rem' }}>
              <Column header='#' body={(data, options) => <div>{options.rowIndex + 1}</div>} />
              <Column header='Имя' field='name' sortable body={data => <div className={`${!data.public && 'line-through'}`}>{data.name}</div>} />
              <Column body={(data, options) => (
                <div className='flex align-items-center justify-content-end'>
                  <Button icon='pi pi-pencil' rounded text severity='secondary' aria-label='Edit' onClick={() => openEditDialog(data)}/>
                  <Button icon='pi pi-trash' rounded text severity='danger' aria-label='Delete' onClick={() => deleteSet(data._id)} />
                </div>)} />
            </DataTable>
          </div>
          {/* Добавить группу */}
          <Dialog header={<div><i className='pi pi-check-square mr-3' style={{ fontSize: '1.5rem' }} />Добавить группу</div>} visible={addDialog} style={{ width: '50vw' }} maximizable draggable={false} onHide={() => {if (!addDialog) return; closeAddDialog(); }} footer={footerContent}>
            <div className='grid gap-3 w-full py-3'>
              <InputText name='name' type='text' className='w-full p-inputtext-sm' placeholder='Название группы' value={set.name} onChange={(e) => handleNameChange(e)} />
              <div className='text-xs -mt-2'>{set.slug}</div>
              <InputTextarea name='description' className='w-full p-inputtext-sm' placeholder='Краткое описание' value={set.description} onChange={(e) => handleChange(e)} rows={5} cols={30} />
              <MultiSelect value={selectedTours} onChange={(e) => handleToursChange(e.value)} options={tours} optionLabel='name' display='chip' placeholder='Туры' maxSelectedLabels={3} className='w-full' />
              <form>
                <div className='flex align-items-center grid w-full mt-1 px-2'>
                  <label className='block -mt-2 text-xs'>Загрузить изображение</label>
                  <input type='file' name='file' ref={inputFile} onChange={() => uploadImage()} className='p-button p-button-outlined p-button-sm mb-2' disabled={!set.name} />
                </div>
              </form>
              {renderImagesList()}
            </div>
          </Dialog>
          {/* Добавить группу */}
          {/* Редактировать группу */}
           <Dialog header={<div><i className='pi pi-check-square mr-3' style={{ fontSize: '1.5rem' }} />Редактировать группу</div>} visible={editDialog} style={{ width: '50vw' }} maximizable draggable={false} onHide={() => {if (!editDialog) return; closeEditDialog(); }} footer={footerEditContent}>
           <div className='grid gap-3 w-full py-3'>
              <InputText name='name' type='text' className='w-full p-inputtext-sm' placeholder='Название группы' value={set.name} onChange={(e) => handleNameChange(e)} />
              <div className='text-xs -mt-2'>{set.slug}</div>
              <InputTextarea name='description' className='w-full p-inputtext-sm' placeholder='Краткое описание' value={set.description} onChange={(e) => handleChange(e)} rows={5} cols={30} />
              <MultiSelect value={selectedTours} onChange={(e) => handleToursChange(e.value)} options={tours} optionLabel='name' display='chip' placeholder='Туры' maxSelectedLabels={3} className='w-full' />
              <form>
                <div className='flex align-items-center grid w-full mt-1 px-2'>
                  <label className='block -mt-2 text-xs'>Загрузить изображение</label>
                  <input type='file' name='file' ref={inputFile} onChange={() => uploadImage()} className='p-button p-button-outlined p-button-sm mb-2' disabled={!set.name} />
                </div>
              </form>
              {renderImagesList()}
              <div className='flex align-items-center mt-2 ml-1'>
                <Checkbox inputId='public' name='public' onChange={e => handlePublicChange(e.checked)} checked={set.public} />
                <label htmlFor='public' className='ml-2'>Опубликована</label>
              </div>
            </div>
          </Dialog>
          {/* Редактировать группу */}
        </main>
      </AdminLayout>
      <Toast ref={toast} position='top-center' />
    </>
  )
}
