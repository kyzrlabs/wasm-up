<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {useRoute} from "vue-router";
import {useStockStore} from "@/stores/stock.js"; // Adjust the path as needed

defineProps({
  id: String
})

const route = useRoute()
const stockStore = useStockStore();

onMounted(() => {
  stockStore.fetchStockItem(route.params.id);
});

onUnmounted(() => {
  stockStore.clearStockItem();
});
</script>
<template>
  <div class="item">
    <!-- Show loading indicator -->
    <p v-if="stockStore.loading">Loading item...</p>

    <!-- Show error if any -->
    <p v-if="stockStore.error">{{ error }}</p>

    <!-- Render item if available -->
    <div v-if="stockStore.stockItem">
      <h1>{{ stockStore.stockItem.name }}</h1>
    </div>
  </div>
</template>