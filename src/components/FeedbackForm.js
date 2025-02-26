import { useState, useEffect, useRef } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import { FloatLabel } from 'primereact/floatlabel'
import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'
import { Roboto } from '../styles/fonts'

export const FeedbackForm = ({visible = false}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [checked, setChecked] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [feedbackDialog, setFeedbackDialog] = useState(false)
  const emailToast = useRef(null)

  useEffect(() => {
    setFeedbackDialog(visible)
  },[visible])

  const mailer = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await fetch('/api/sendemail', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({text: `
          ${name}
          ${phone}
          ${comment}
        `})
      }) 
      emailToast.current.show({severity:'info', summary: 'Запрос отправлен', detail: 'Мы обязательно свяжемся с Вами!', life: 3000})
    } catch (error) {
      emailToast.current.show({severity:'danger', summary: 'Ошибка!', detail: 'Что-то пошло не так...', life: 3000})
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      visible={feedbackDialog}
      dismissableMask={true}
      showHeader={false}
      onHide={() => {if (!feedbackDialog) return; setFeedbackDialog(false);}}
      style={{ width: '30vw' }} breakpoints={{ '960px': '75vw', '667px': '50vw', '481px': '90vw' }}
      pt={{ content: {className: 'border-round-xl'}}}
    >
      <form onSubmit={mailer}>
        <Button icon="pi pi-times" rounded text size="large" aria-label="Cancel" className='hidden lg:flex absolute right-0 -mr-2 xl:-mr-5 -mt-4 xl:-mt-5 clrbtn' style={{color: 'whitesmoke'}} onClick={() => setFeedbackDialog(false)} />
        <Card title={<div className={`${Roboto.className} text-2xl text-center text-700 font-medium`}>Оставить заявку</div>} subTitle={<div className='hidden md:block text-center -mt-1'>Мы обязательно свяжемся с Вами</div>} className='px-0 shadow-none'>
          <div className='flex flex-column gap-3 bg-white'>
            <div className='flex justify-content-center align-items-center'>
              <i className='hidden md:block pi pi-user mr-2 form-icon' style={{ fontSize:'1.5rem', color:'#757D87' }} />
              <FloatLabel>
                <InputText id='name' type='text' className='lg:p-inputtext-lg' value={name} onChange={(e) => setName(e.target.value)} required />
                <label htmlFor='name'>Имя</label>
              </FloatLabel>
            </div>
            <div className='flex justify-content-center align-items-center'>
              <i className='hidden md:block pi pi-phone mr-2 form-icon' style={{ fontSize:'1.5rem', color:'#757D87' }} />
              <FloatLabel>
                <InputMask id='phone' type='phone' value={phone} onChange={(e) => setPhone(e.target.value)} mask='9 (999) 999-99-99'  className='lg:p-inputtext-lg' required />
                <label htmlFor='phone'>Телефон</label>
              </FloatLabel>
            </div>
            <div className='flex justify-content-center align-items-center'>
              <i className='hidden md:block pi pi-comment mr-2 form-icon' style={{ fontSize:'1.5rem', color:'#757D87' }} />
              <FloatLabel>
                <InputText id='comment' type='text' className='lg:p-inputtext-lg' value={comment} onChange={(e) => setComment(e.target.value)} />
                <label htmlFor='comment'>Комментарий</label>
              </FloatLabel>
            </div>
            <div className='flex align-items-center pl-5'>
              <Checkbox
                inputId='private'
                name='private'
                icon='pi pi-check'
                onChange={e => setChecked(e.checked)} checked={checked} 
                pt={{
                  box: {style: {background:'transparent', borderColor: '#FF931E'}},
                  icon: {style: {color:'#FF931E', fontWeight: 'bold'}} 
                }}
              />
              <label htmlFor='private' className='ml-2 text-xs'>Согласен на обработку персональных данных</label>
            </div>
            <Button label='Отправить' icon={isLoading ? 'pi pi-spin pi-sync' : 'pi pi-check'} size='large' raised type='submit' disabled={!checked} className='w-full' style={{background:'#FF931E', borderColor: '#FF931E'}} />
          </div>
          <Toast ref={emailToast} position="top-center" />
        </Card>
      </form>
    </Dialog>
  )
}
   