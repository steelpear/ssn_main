'use client'

import Router from 'next/router'
import React, { useCallback, useEffect } from 'react'
import ym, { YMInitializer } from 'react-yandex-metrika'

const YM_COUNTER_ID = 100853614

export const YandexMetrikaContainer = ({ enabled }) => {
  const hit = useCallback(
    (url) => {
      if (enabled) {
        ym('hit', url)
      } else {
        console.log(`%c[YandexMetrika](HIT)`, `color: orange`, url)
      }
    },
    [enabled],
  )

  useEffect(() => {
    hit(window.location.pathname + window.location.search)
    Router.events.on('routeChangeComplete', (url) => hit(url))
  }, [hit])

  if (!enabled) return null

  return (
    <YMInitializer
      accounts={[YM_COUNTER_ID]}
      options={{
        defer: true,
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      }}
      version='2'
    />
  )
}
