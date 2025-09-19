import { defineNuxtPlugin } from '#app'
import { initFlowbite } from 'flowbite'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.hook('app:mounted', initFlowbite)
  }
})