export { default } from 'next-auth/middleware'
export const config = {
  matcher: ['/profile', '/create-prompt', '/update-prompt/:id*'],
}
