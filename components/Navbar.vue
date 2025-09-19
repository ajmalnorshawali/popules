<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import Login from '~/components/Login.vue'
import SignUp from '~/components/SignUp.vue'
import Tabs from '~/components/Tabs.vue'
import Tab from '~/components/Tab.vue'

const isModalOpen = ref(false)
const route = useRoute()
const router = useRouter()
const isAuthenticated = useCookie('isAuthenticated')
const { $swal } = useNuxtApp()

const logout = () => {
    $swal.fire({
        title: '',
        text: 'Are you sure want to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#6D28D9',
        cancelButtonColor: '#b91c1c',
        confirmButtonText: 'Logout',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            isAuthenticated.value = null
            route.meta.isAuthenticated = false
            $swal.fire({
                text: 'You have been logged out.',
                icon: 'success',
                timer: 3000,              
                showConfirmButton: false 
            })

            // 👇 redirect to homepage
            router.push('/')
        }
    })
}

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}
</script>

<template>
<nav class="bg-white fixed w-full z-50">
    <div class="border-b p-5">
        <div class="max-w-6xl flex flex-wrap items-center justify-between mx-auto">
            <div class="py-2 px-3">
                <img src="~/assets/img/logo.png" class="h-8" alt="Flowbite Logo">
            </div>

            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="flex flex-col p-5 md:p-0 md:flex-row">
                    <li><!-- wishlist -->
                        <div class="flex items-center py-2 px-3">
                            <LucideHeart :size="30" class="text-violet-700 mr-1" />
                            <div>
                                <p class="mb-0 text-sm">0 Items</p>
                                <p class="font-bold">
                                    <NuxtLink class="text-gray-700 hover:text-gray-800 cursor-pointer">
                                        Wishlist
                                    </NuxtLink>
                                </p>
                            </div>
                        </div>
                    </li><!-- wishlist -->
                    <li v-if="!route.meta.isAuthenticated"><!-- account -->
                        <div class="flex items-center py-2 px-3">
                            <LucideUser :size="30" class="text-violet-700 mr-1" />
                            <div>
                                <p class="mb-0 text-sm">Account</p>
                                <p class="font-bold">
                                    <NuxtLink @click.prevent="openModal()" class="text-gray-700 hover:text-gray-800 cursor-pointer">
                                        Login
                                    </NuxtLink>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li v-else>
                        <div class="flex items-center py-2 px-3">
                            <LucideUser :size="30" class="text-violet-700 mr-1" />
                            <div>
                                <p class="mb-0 text-sm">admin@jobstore.com</p>
                                <p class="font-bold">
                                    <NuxtLink @click.prevent="logout()" class="text-gray-700 hover:text-gray-800 cursor-pointer">
                                        Logout
                                    </NuxtLink>
                                </p>
                            </div>
                        </div>
                    </li><!-- account -->
                </ul>
            </div>
        </div>
    </div>
    <div class="border-b py-1">
        <div class="max-w-6xl flex flex-wrap items-center justify-between mx-auto">
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="flex flex-col p-1 md:p-0 md:flex-row">
                    <li>
                        <NuxtLink to="/" :class="{'text-violet-700 rounded-lg': route.path === '/'}" class="flex items-center py-2 px-3">
                            <LucideHome :size="20" class="mr-1" />
                            <span>Home</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/marketplace" :class="{'text-violet-700 rounded-lg': route.path === '/marketplace'}" class="flex items-center py-2 px-3">
                            <LucideNewspaper :size="20" class="mr-1" />
                            <span>Marketplace</span>
                        </NuxtLink>
                    </li>
                    <li v-if="route.meta.isAuthenticated">
                        <NuxtLink to="/following" :class="{'text-violet-700 rounded-lg': route.path === '/following'}" class="flex items-center py-2 px-3">
                            <LucideUserPlus2 :size="20" class="mr-1" />
                            <span>Following</span>
                        </NuxtLink>
                    </li>
                    <li v-if="route.meta.isAuthenticated">
                        <NuxtLink to="/messages" :class="{'text-violet-700 rounded-lg': route.path === '/messages'}" class="flex items-center py-2 px-3">
                            <LucideMessageCircleMore :size="20" class="mr-1" />
                            <span>Messages</span>
                        </NuxtLink>
                    </li>
                    <li v-if="route.meta.isAuthenticated">
                        <NuxtLink to="/profile" :class="{'text-violet-700 rounded-lg': route.path === '/profile'}" class="flex items-center py-2 px-3">
                            <LucideUser :size="20" class="mr-1" />
                            <span>Profile</span>
                        </NuxtLink>
                    </li>
                    <li v-if="route.meta.isAuthenticated">
                        <NuxtLink to="/business" :class="{'text-violet-700 rounded-lg': route.path === '/business'}" class="flex items-center py-2 px-3">
                            <LucideBriefcaseBusiness :size="20" class="mr-1" />
                            <span>Business</span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>

<!-- Main modal -->
<div v-if="isModalOpen" @click.self="closeModal" tabindex="-1" aria-hidden="true" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative p-5 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative flex flex-col bg-white rounded-lg shadow-sm w-full max-h-[80vh]">
            <!-- Modal header (fixed) -->
            <div class="p-4 border-b">
                <h3 class="text-2xl text-center">Welcome to Popules</h3>
            </div>
            
            <!-- Modal body -->
            <div class="pt-0 p-5 overflow-y-auto">
                <Tabs>
                    <Tab title="Login">
                        <Login @login-success="closeModal" />
                    </Tab>
                    <Tab title="Sign Up">
                        <SignUp />
                    </Tab>
                </Tabs>
            </div>

            <!-- Modal footer (fixed) -->
            <div class="p-5 border-t flex justify-center">
                <p class="text-sm">Popules © 2025</p>
            </div>
        </div>
    </div>
</div>
</template>
