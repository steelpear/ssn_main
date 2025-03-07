import { useEffect } from 'react'

const useCruScript = (url, async = true, crossOrigin = 'anonymous') => {

  useEffect(() => {
    {window.awidgetInfo = {
      host: '//cruisenavigator.ru',
      agentId: '0367b872-2e94-4b94-b40f-b1e6dd9cde14',
      background: '#ffffff'
      }}
    const script = document.createElement('script')
    script.src = url
    script.async = async
    script.crossOrigin = crossOrigin
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [url, async, crossOrigin])
}

export default useCruScript
