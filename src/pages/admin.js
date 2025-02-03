import {useRouter} from 'next/router'
import Head from 'next/head'
import useSWRImmutable from 'swr/immutable'
import { AdminLayout } from '../components/AdminLayout'
import { Card } from 'primereact/card'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Admin() {
  const router = useRouter()
  const { data } = useSWRImmutable('/api/getcollectionslist', fetcher)

  return (
    <>
      <Head>
        <title>Панель управления / Главная</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <AdminLayout>
      <main className='p-6'>
        <div className='grid'>
          {data && data.map(item => {
            return (
              <div className="col-3" key={item._id}>
                <Card className='pb-0 border-solid border-400 border-1 cursor-pointer' onClick={() => router.push(`/admin-${item.name}`)}>
                  <p className='m-0 text-lg text-center'>{item.name}</p>
                </Card>
              </div>
            )
          })}
        </div>
      </main>
    </AdminLayout>
    </>
  )
}
