<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
    <aside class="bg-white w-64 px-4">
        <ul>
            <li>
                <NuxtLink to="/" :class="{'text-violet-700 rounded-lg': route.path === '/'}" class="flex items-center p-3">
                    <LucideHome :size="20" class="mr-3" /> 
                    <span>Explore</span>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/messages" :class="{'text-violet-700 rounded-lg': route.path === '/messages'}" class="flex items-center p-3">
                    <LucideMessageCircle :size="20" class="mr-3" /> 
                    <span>Messages</span>
                </NuxtLink>
            </li>
        </ul>
    </aside>
</template>
