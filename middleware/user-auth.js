export default defineNuxtRouteMiddleware(async (to) => {
 
  const { isAuthenticated, token } = useAuth()
  if (process.client) {
    const auth = await isAuthenticated()
    if (!auth) {
      return navigateTo('/login')
      }
  } 
  return token.value ? true : navigateTo('/login')
})  