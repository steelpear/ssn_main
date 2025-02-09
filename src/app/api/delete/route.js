import { NextResponse } from 'next/server'
import {unlink} from 'fs/promises'

export async function POST(req) {
  try {
    const path = await req.json()
    unlink(`./public${path}`)
    return NextResponse.json({ state: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ state: false })
  }
}
