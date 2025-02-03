import {useState, useEffect} from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'

export const Loader = () => {
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)
  const size = 120

  useEffect(() => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  },[])

  if (height) {
    return (
      <div style={{ position: "absolute", top: (height / 2) - (size / 2), left: (width / 2) - (size / 2)}}>
        <ProgressSpinner style={{width: size, height: size}} strokeWidth="3" />
      </div>
    )
  } else {return (<></>)}
}
 