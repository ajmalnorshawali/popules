<template>
<div>
    <div class="border-b border-gray-200">
        <nav class="flex" aria-label="Tabs">
            <button v-for="tab in tabs" :key="tab.props.title" @click="selectTab(tab)" :class="[
            tab.props.title === selectedTab.props.title
              ? 'border-violet-500 text-violet-700'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-5 px-5 border-b-2 font-medium flex-1 text-center',
          ]">
                {{ tab.props.title }}
            </button>
        </nav>
    </div>
    <div class="py-5">
        <slot></slot>
    </div>
</div>
</template>


<script setup>
import { ref, useSlots, provide } from 'vue'

const slots = useSlots()
const tabs = slots.default()
const selectedTab = ref(tabs[0])

function selectTab(tab) {
  selectedTab.value = tab
}

provide('selectedTab', selectedTab)
</script>