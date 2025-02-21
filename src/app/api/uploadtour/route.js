import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import { nanoid } from 'nanoid'

export async function POST(req) {
  try {
    const prefix = nanoid()
    const formData = await req.formData()
    const file = formData.get('file')
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFile(`./public/img/tours/${prefix + '_' + file.name}`, buffer)
    return NextResponse.json({ state: true, name: prefix + '_' + file.name })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ state: false, name: 'null' })
  }
}
