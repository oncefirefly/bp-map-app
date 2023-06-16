<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean;
}>();
</script>

<template>
  <div v-if="props.isLoading" class="loading-container">
    <div class="loading-spinner"></div>
  </div>
</template>

<style scoped>
.loading-container {
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.4);
}
.loading-spinner {
  width: 80px;
  height: 80px;
}
.loading-spinner:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: loading 1.2s linear infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
