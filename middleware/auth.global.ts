export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useCookie('isAuthenticated')

  if (isAuthenticated.value) {
    to.meta.isAuthenticated = true
  }
})
