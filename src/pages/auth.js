import {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Cookies from 'js-cookie'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Roboto, Montserrat } from '../styles/fonts'

export default function Auth() {
  const toast = useRef(null)
  const router = useRouter()
  const [height, setHeight] = useState(null)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {setHeight(window.innerHeight - 30)}, [])

  const checkLogin = async () => {
    const res = await fetch('/api/checkuser', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({login, password})
    })
    const response = await res.json()
    if (response) {
      Cookies.set('_jkNhfyGtr5-kQh5y7Ujhs', login, {
        expires: 30,
        path: '/',
        sameSite: 'None',
        secure: true 
      })
      toast.current.show({ severity: 'success', summary: `Удачно, ${login}!`, detail: 'Вы авторизованы.' })
      setTimeout(() => router.push('/admin'), 500)
    } else {toast.current.show({ severity: 'error', summary: 'Неудачно!', detail: 'Ошибка авторизации!' })}
  }

    return (
      <>
        <Head>
          <title>ПРО100-ТУР | Авторизация</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        </Head>
        <div className="flex flex-column justify-content-center align-items-center w-full" style={{height: height, marginTop: '-30px'}}>
          <div className='w-3 h-auto'>
            <div className='flex justify-content-center align-items-center mb-4'>
              <img src='/bird.svg' alt='logo' width={70} />
              <div className='line-height-1'>
                <div className={`${Montserrat.className} text-center text-700 text-3xl font-semibold`}>ПРО100-ТУР</div>
                <div className={`${Roboto.className} text-center text-700 text-2xl font-medium`}>Авторизация</div>
              </div>
            </div>
            <div className="flex flex-column gap-4 justify-content-center w-full">
              <IconField iconPosition="right">
                <InputIcon className="pi pi-user mr-3 text-sm" />
                <InputText value={login} onChange={(e) => setLogin(e.target.value)} className='p-inputtext-lg' placeholder='Введите логин' />
              </IconField>
              <Password
                value={password}
                placeholder='Введите пароль'
                promptLabel='Введите пароль'
                weakLabel='Слабый'
                mediumLabel='Средний'
                strongLabel='Надёжный'
                onChange={(e) => setPassword(e.target.value)}
                inputClassName="p-inputtext-lg w-full"
                toggleMask
                feedback={true}
              />
            </div>
            <Button disabled={!login} label="Войти" icon="pi pi-check" size="large" onClick={() => checkLogin()} className="p-button-success p-button-raised mt-4 w-full"/>
            <div className={`${Roboto.className} text-center text-xl font-medium text-blue-700 cursor-pointer mt-2`} onClick={() =>  window.open('/', '_self')}>Вернуться на сайт</div>
          </div>
          <Toast ref={toast} position="top-center" />
        </div>
      </>
    )
}
