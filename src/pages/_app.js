import 'primereact/resources/themes/tailwind-light/theme.css'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/primereact.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '@/styles/main.css'
import '@/styles/tourtrans.css'

export default function App({ Component, pageProps }) {
  const value = {
    ripple: true
  }
  
  return (
    <PrimeReactProvider value={value}>
      <Component {...pageProps} />
    </PrimeReactProvider>
  )
}
