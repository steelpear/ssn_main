import { NextResponse } from 'next/server'
import fs from 'fs/promises'

export async function POST(req) {
  try {
    const date = new Date()
    const prefix = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear() + '_' + ('0' + date.getHours()).slice(-2) + '-' + ('0' + date.getMinutes()).slice(-2)
    const formData = await req.formData()
    const file = formData.get('file')
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFile(`./public/img/${prefix + '_' + file.name}`, buffer)
    return NextResponse.json({ state: true, name: prefix + '_' + file.name })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ state: false, name: 'null' })
  }
}
