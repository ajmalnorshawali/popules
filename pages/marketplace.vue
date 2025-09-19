<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

interface FeedItem {
  thumbnail: string
  title: string
  user: {
    fullname: string
  }
  likes_count: number
  comments_count: number
  category: string[]
  content: string
}

const items = ref<FeedItem[]>([])
const isLoading = ref(false);
const isModalOpen = ref(false)
const selectedCard = ref<FeedItem | null>(null)
const categories = ref([])   // unique categories
const selectedCategory = ref('') // bound to <select>
const displayLimit = ref(15); // New ref for display limit

// READ DATA
const getData = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get('https://api.popules.com/api/feed')
        items.value = response.data.data

        // Extract categories, flatten, and remove duplicates
        const allCategories = items.value.map(item => item.category).flat()
        categories.value = [...new Set(allCategories)]
    } catch (error) {
        console.error('Fetch error:', error)
    } finally {
        isLoading.value = false;
    }
}

const totalFilteredItems = computed(() => {
  if (!selectedCategory.value) return items.value.length;
  return items.value.filter(item =>
    item.category.includes(selectedCategory.value)
  ).length;
});

const filteredItems = computed(() => {
  let itemsToShow = items.value;
  if (selectedCategory.value) {
    itemsToShow = items.value.filter(item =>
      item.category.includes(selectedCategory.value)
    );
  }
  return itemsToShow.slice(0, displayLimit.value);
});

const showMore = () => {
  displayLimit.value += 15; // Increase by 15 each time
};

const showLess = () => {
  displayLimit.value = 15; // Reset to 15
};

// Modal state
const openModal = (item: FeedItem) => {
  selectedCard.value = item
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedCard.value = null
}

onMounted(() => {
    getData()
})
</script>

<template>
<main class="pb-10 px-4">
    <!-- filtering -->
    <div class="flex space-x-2">
        <button @click="selectedCategory = ''" class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 rounded-lg px-5 py-2.5 text-center text-sm">All</button>
        <form class="max-w-sm mx-auto">
            <select v-model="selectedCategory" id="categories" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize">
                <option value="">All category</option>
                <option v-for="(cat, index) in categories" :key="index" :value="cat" class="capitalize">
                    {{ cat }}
                </option>
            </select>
        </form>
    </div>

    <Loading v-if="isLoading" />

    <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-3">
            <div v-for="(item, index) in filteredItems" :key="index" class="group relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <!-- Image + Overlay Icons -->
                <div class="relative overflow-hidden">
                    <!-- Image -->
                    <img class="w-full h-[200px] object-cover rounded-t-lg transform transition-transform duration-500 group-hover:scale-110" :src="item.thumbnail" :alt="item.title" />

                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                    <!-- Hover icons -->
                    <div class="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <NuxtLink class="bg-violet-700/50 p-3 rounded cursor-pointer">
                            <LucideHeart :size="20" class="text-white" />
                        </NuxtLink>
                        <NuxtLink @click="openModal(item)" class="bg-violet-700/50 p-3 rounded cursor-pointer">
                            <LucideEye :size="20" class="text-white" />
                        </NuxtLink>
                    </div>
                </div>

                <!-- Card body -->
                <div class="p-3">
                    <p class="uppercase font-bold mb-1">{{ item.title }}</p>
                    <div class="flex items-center">
                        <img class="w-5 h-5 rounded-full mr-1" :src="item.thumbnail" :alt="item.title" />
                        <p class="text-gray-500 mb-0">{{ item.user.fullname }}</p>
                    </div>

                    <div class="flex mt-3 space-x-3">
                        <div class="flex items-center">
                            <LucideThumbsUp :size="15" class="text-gray-500 mr-1" />
                            <p class="text-gray-500 mb-0">{{ item.likes_count }}</p>
                        </div>
                        <div class="flex items-center">
                            <LucideMessageCircleMore :size="15" class="text-gray-500 mr-1" />
                            <p class="text-gray-500 mb-0">{{ item.comments_count }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!isLoading && filteredItems.length > 0" class="flex justify-center mt-8 space-x-4">
            <button v-if="displayLimit < totalFilteredItems" @click="showMore" class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 rounded-lg px-5 py-2.5 text-center">
                View More
            </button>
            <button v-if="displayLimit > 15" @click="showLess" class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 rounded-lg px-5 py-2.5 text-center">
                View Less
            </button>
        </div>
    </div>
</main>

<!-- Modal -->
<div v-if="isModalOpen" @click.self="closeModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="relative p-5 w-full max-w-5xl">
        <div class="relative flex flex-col bg-white rounded-lg shadow-sm w-full">
            <!-- Modal body -->
            <div class="flex p-5">
                <img v-if="selectedCard" :src="selectedCard.thumbnail" :alt="selectedCard.title" class="w-[300px] h-[300px] object-cover rounded mr-3" />
                
                <div>
                    <h3 class="text-xl uppercase font-bold mb-2">{{ selectedCard?.title }}</h3>
                    <p><span class="text-gray-500 mb-0">Fullname</span>: <span class="capitalize">{{ selectedCard?.user?.fullname }}</span></p>
                    <p><span class="text-gray-500 mb-0">Category</span>: <span class="capitalize">{{ selectedCard?.category.join(', ') }}</span></p>

                    <div class="flex mt-3 space-x-3">
                        <div class="flex items-center">
                            <LucideThumbsUp :size="15" class="text-gray-500 mr-1" />
                            <p class="text-gray-500 mb-0">{{ selectedCard?.likes_count }}</p>
                        </div>
                        <div class="flex items-center">
                            <LucideMessageCircleMore :size="15" class="text-gray-500 mr-1" />
                            <p class="text-gray-500 mb-0">{{ selectedCard?.comments_count }}</p>
                        </div>
                    </div>

                    <div class="mt-5">
                       <p><span class="text-gray-500 mb-0">Description</span>:</p>
                       <p>{{ selectedCard?.content }}</p>
                    </div>
                </div>

                <div class="absolute top-5 right-5">
                    <NuxtLink class="cursor-pointer">
                        <LucideHeart :size="30" class="text-violet-700" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
