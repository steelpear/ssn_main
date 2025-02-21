import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/admin', '/admin-popular', '/admin-reviews']
}

export default function middleware(req){
  const cookie = req.cookies.get('_jkNhfyGtr5-kQh5y7Ujhs')
  const url = req.url

  if (!cookie) {return NextResponse.redirect(new URL('/auth', req.url))}
  if (cookie && url.includes('/auth')) {return NextResponse.redirect(new URL('/admin', req.url))}
}
