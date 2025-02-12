import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps'

export const YandexMaps = ({...props}) => {
  const coords = props.center ? props.center.split(',') : '44.692609, 37.779309'.split(',')

  return (
    <div className='w-full shadow-4'>
      <YMaps>
        <Map
          defaultState={{
            center: coords,
            zoom: props.zoom,
            controls: []
          }}
          width='100%'
          height={props.height}
        >
          <Placemark
            defaultGeometry={coords}
            properties={{
              iconCaption: props.label
            }}
          />
          <ZoomControl options={{float:'right'}} />
        </Map>
      </YMaps>
    </div>
  )
}
 