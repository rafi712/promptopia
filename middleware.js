import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export const middleware = (request) => {
  if (!request.cookies.has('next-auth.session-token')) {
    return NextResponse.redirect('https://promptopia-rafi712.vercel.app/')
  }
}

export const config = {
  matcher: ['/profile', '/create-prompt', '/update-prompt/:id*'],
}
