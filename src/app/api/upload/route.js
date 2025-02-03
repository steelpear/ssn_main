import { NextResponse } from 'next/server'
import fs from 'fs/promises'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFile(`./public/popular/${file.name}`, buffer)
    return NextResponse.json({ state: true, name: file.name })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ state: false, name: 'null' })
  }
}
