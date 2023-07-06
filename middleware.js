import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export const middleware = (request) => {
  if (!request.cookies.has('next-auth.session-token')) {
    return NextResponse.redirect('http://127.0.0.1:3000/')
  }
}

export const config = {
  matcher: ['/profile', '/create-prompt', '/update-prompt/:id*'],
}
