import {useRouter} from 'next/router'
import { Button } from 'primereact/button'

export const CruisesButtonsGroup = () => {
  const router = useRouter()

    return (
      <main className='w-full mb-3'>
        <div className='flex flex-column md:flex-row gap-3 md:gap-0 justify-content-center'>
          <Button label='Морские круизы' outlined raised size='large' className='text-700 mx-3 border-orange-400 border-3' onClick={() => router.push('/sea-cruises')} />
          <Button label='Речные круизы' outlined raised size='large' className='text-700 mx-3 border-orange-400 border-3' onClick={() => router.push('/river-cruises')} />
        </div>
      </main>
    )
  }
 