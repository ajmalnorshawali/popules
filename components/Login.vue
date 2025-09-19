<script setup>
import { ref } from 'vue'
import { useCookie, useNuxtApp } from '#app'
import { useRoute } from 'vue-router'
const isAuthenticated = useCookie('isAuthenticated')
const emit = defineEmits(['login-success'])

const route = useRoute()
const loginForm = ref({
  email: '',
  password: ''
})

function login() {
  if (loginForm.value.email === 'admin@jobstore.com' && loginForm.value.password === '123qwe') {
    isAuthenticated.value = 'true'
    route.meta.isAuthenticated = true
    emit('login-success')

    // Popup for successful login
    const { $swal } = useNuxtApp()
    $swal.fire({
      text: 'You have successfully logged in.',
      icon: 'success',
      timer: 3000,              
      showConfirmButton: false 
    })
  }
}
</script>

<template>
<h3 class="text-3xl text-center text-gray-700">
    Login
</h3>
<form @click.prevent="login" class="w-full">
    <div class="mb-5">
        <label for="email" class="block mb-2 text-gray-700">Email</label>
        <input v-model="loginForm.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your email" required />
    </div>
    <div class="mb-5">
        <label for="password" class="block mb-2 text-gray-700">Password</label>
        <input v-model="loginForm.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your password" required />
    </div>
    <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
        </div>
        <label for="remember" class="ms-2 text-gray-700">Remember me</label>
    </div>
    <button type="submit" class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 rounded-lg px-5 py-2.5 text-center w-full">Login</button>
</form>
</template>