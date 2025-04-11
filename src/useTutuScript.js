import { useEffect } from 'react'

const useTutuScript = (url, async = true, crossOrigin = 'anonymous') => {

  useEffect(() => {
    const script = document.createElement('script')
    script.id = 'widScrParams'
    script.src = url
    script.async = async
    script.crossOrigin = crossOrigin
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [url, async, crossOrigin])
}

export default useTutuScript
