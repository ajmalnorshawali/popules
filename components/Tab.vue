<template>
<div v-if="isActive">
    <slot></slot>
</div>
</template>

<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})

const selectedTab = inject('selectedTab')
const isActive = computed(() => selectedTab.value.props.title === props.title)
</script>