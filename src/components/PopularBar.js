import { PopularDirections } from '../components/PopularDirections'
import { ToursPanel } from '../components/ToursPanel'

export const PopularBar = () => {

  return (
    <main className='my-6 px-2 lg:px-8'>
      <div className='grid'>
        <div className='col-12 md:col-6'>
          <ToursPanel />
        </div>
        <div className='col-12 md:col-6'>
          <PopularDirections />
        </div>
      </div>
    </main>
  )
}
 