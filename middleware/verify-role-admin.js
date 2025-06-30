export default defineNuxtRouteMiddleware(async (to) => {
  const { user } = useAuth()
  
  if (user && user.value.role !== 'admin') {
    return navigateTo('/')
  }
})  