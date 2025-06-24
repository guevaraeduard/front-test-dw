export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const session = localStorage.getItem('techstore_user_session')
    if (!session) {
      return navigateTo('/login')
    }
  }
}) 