# Gemini Project: popules
This file contains project-specific information and memories for Gemini.

# Project Requirements
1) Use Vue JS framework (Typescript). - **Completed**
2) follow ECMAScript 2015 (ES6) standards or newer - **Completed**
3) Use Tailwind CSS to ease UI development - **Completed**
4) Apply infinite scroll - **No Longer Relevant (explore.vue removed)**
5) Create a simple test case using a testing tool like Vitest for components you’ve made. - **Not Completed**


## Theme
- Violet - **Completed**

**Key Tools & Technologies**:
* Agentic AI Interface: Gemini CLI
* Development Environment: Zen MCP
* Front-end: Nuxt.js
* CSS Framework: Tailwind + Flowbite

## Application Layout
The application layout will consist of the following components:

*   **Navbar:** A top navigation bar. - **Completed**
*   **Sidebar:** A sidebar menu with links. - **Completed**
*   **Main Page:** The main content area.

### Sidebar Menu
The sidebar will contain the following menu items:

1.  Explore - **No Longer Relevant (explore.vue removed)**
2.  Messages - **Completed**

### Main Page
The main page will display 5 cards in a row. - **Not Completed**

## Unique Categories from API
- fitness
- vacancies
- makeup
- finance
- cars
- travel
- workplace
- design



## Credentials Plan
**Step 1: Create the authentication middleware**
*   Create a new file `middleware/auth.global.ts`. - **Completed**
*   In this middleware, I will check for a dummy email and password in the cookies.
*   If the user is authenticated, I will set a `isAuthenticated` flag in the route meta.
*   Use `components/Login.vue`, (email: admin@jobstore.com) (password: 123qwe)

**Step 2: Update `Navbar.vue` to use the authentication status**
*   I will read the `isAuthenticated` flag from the route meta. - **Completed**
*   I will use this flag to conditionally show/hide the "Following" link in the navbar. - **Completed**

## Infinite Scroll Implementation Guide

### Concept
Infinite scroll is a web design technique that loads content continuously as the user scrolls down a page, eliminating the need for pagination (e.g., "next page" buttons). It's commonly used in social media feeds, e-commerce product listings, and news websites to provide a seamless browsing experience.

**How it works (the core idea):**

1.  **Initial Load:** When the page first loads, a small amount of content is displayed.
2.  **Scroll Detection:** As the user scrolls down, the browser constantly checks their position on the page.
3.  **Threshold Trigger:** When the user's scroll position gets close to the bottom of the currently loaded content (e.g., within 200 pixels of the bottom), a trigger is activated.
4.  **Data Fetch:** Upon activation, a request is sent to the server (usually an API endpoint) to fetch the *next* batch of content. This request typically includes parameters like the `page` number or an `offset` to tell the server which data to send next.
5.  **Content Append:** Once the new data is received from the server, it's appended to the existing content on the page, usually below the previously loaded items.
6.  **Repeat:** Steps 2-5 repeat until there's no more content to load from the server.

### Key Components in a Nuxt.js Application:

*   **`ref` for reactive data:** Used to store the list of items, the current page number, a loading state, and a flag to indicate if there's more data available.
*   **`onMounted` and `onUnmounted` hooks:**
    *   `onMounted`: Used to attach the scroll event listener to the window (or a specific scrollable container) when the component is first rendered. It also triggers the initial data fetch.
    *   `onUnmounted`: Used to remove the scroll event listener when the component is destroyed to prevent memory leaks.
*   **Scroll Event Listener (`handleScroll` function):** This function is the heart of infinite scroll. It calculates the user's scroll position relative to the document's height and determines if they've reached the "trigger zone" near the bottom.
*   **Data Fetching Function (`fetchItems`):** This asynchronous function makes the API call to get new data. It should:
    *   Set a `isLoading` flag to `true` to show a loading indicator.
    *   Increment the `currentPage` number for the next request.
    *   Append the new data to the existing `items` array.
    *   Set `hasMore` to `false` if the API returns an empty array, indicating no more data.
    *   Set `isLoading` back to `false` when the fetch is complete (or an error occurs).
*   **Loading Indicator:** A visual cue (like your `Loading.vue` component) to inform the user that more content is being loaded.
*   **"No More Items" Message:** A message displayed when `hasMore` is `false` to let the user know they've reached the end of the list.

### Conceptual Code Example (for a Nuxt.js component):

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Loading from '~/components/Loading.vue' // Assuming you have this component

const items = ref([])
const currentPage = ref(1)
const isLoading = ref(false)
const hasMore = ref(true) // Assume there's more data initially
const itemsPerPage = 10 // Or whatever your API supports

const fetchItems = async () => {
  if (isLoading.value || !hasMore.value) return

  isLoading.value = true
  try {
    // Replace with your actual API call
    // Example: const response = await useFetch(`/api/items?page=${currentPage.value}&limit=${itemsPerPage}`)
    // const newItems = response.data.value // If using useFetch
    const response = await fetch(`/api/items?page=${currentPage.value}&limit=${itemsPerPage}`)
    const newItems = await response.json()

    if (newItems.length > 0) {
      items.value = [...items.value, ...newItems]
      currentPage.value++
    } else {
      hasMore.value = false // No more items to load
    }
  } catch (error) {
    console.error('Error fetching items:', error)
  } finally {
    isLoading.value = false
  }
}

const handleScroll = () => {
  const { scrollTop, offsetHeight } = document.documentElement
  const { innerHeight } = window

  // Check if user is near the bottom (e.g., within 200px)
  if (scrollTop + innerHeight >= offsetHeight - 200 && !isLoading.value && hasMore.value) {
    fetchItems()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  fetchItems() // Load initial items
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <!-- Display your cards here -->
    <div v-for="item in items" :key="item.id">
      <!-- Your card component or structure -->
      {{ item.name }}
    </div>

    <div v-if="isLoading" class="text-center py-4">
      <Loading />
      <p>Loading more items...</p>
    </div>

    <div v-if="!hasMore && items.length > 0" class="text-center py-4 text-gray-500">
      You've reached the end of the list.
    }
  </div>
</template>
```

### Key Considerations:

*   **Debouncing/Throttling:** For performance, you might want to debounce or throttle the `handleScroll` function to prevent it from firing too frequently.
*   **Error Handling:** Implement robust error handling for your API calls.
*   **User Experience:** Provide clear visual feedback (loading indicators, "no more items" messages).
*   **Accessibility:** Ensure your infinite scroll is accessible to all users.
*   **Server-Side Rendering (SSR):** For Nuxt.js, consider how you'll handle the initial load of items for SSR. You might pre-fetch the first page of data using `useAsyncData` or `useFetch` for the first batch of data.