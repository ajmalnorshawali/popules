<script setup lang="ts">
definePageMeta({
    layout: "global",
});
</script>

<template>
<div class="max-w-6xl mx-auto flex items-center justify-between h-auto md:h-screen">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
        <!-- Left content -->
        <div class="md:col-span-7 my-auto">
            <img src="~/assets/img/logo.png" alt="Landing Image" class="h-20 mb-6" />
            <h1 class="text-5xl mb-12">Where Every Article Tells a Story.</h1>
            <NuxtLink to="/marketplace" class="text-violet-700 border border-violet-700 hover:bg-violet-800 hover:text-white rounded-lg text-sm px-5 py-3 text-center">
                EXPLORE MORE
            </NuxtLink>
            
            <div class="mt-20">
                <p>Available for both Android and IOS</p>
                <div class="flex space-x-2">
                    <img src="~/assets/img/googleplay.png" class="rounded-lg h-10" alt="Googleplay">
                    <img src="~/assets/img/appstore.png" class="rounded-lg h-10" alt="Appstore">
                </div>
            </div>
        </div>

        <!-- Right image -->
        <div class="md:col-span-5 my-auto">
            <img src="~/assets/img/bg-landing.png" alt="Landing Image" class="w-full" />
        </div>
    </div>
</div>
</template>
