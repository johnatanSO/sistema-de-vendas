import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { usersService } from './src/services/usersService'

export async function middleware(request: NextRequest) {
  const hasSession = await usersService.getSession(request)
  if (!hasSession) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
export const config = {
  matcher: ['/', '/vendas', '/produtos'],
}
