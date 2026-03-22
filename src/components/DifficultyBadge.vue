<template>
  <span :class="['badge', 'badge-' + difficulty]">{{ difficulty }}</span>
</template>

<script setup>
defineProps({ difficulty: String })
</script>
