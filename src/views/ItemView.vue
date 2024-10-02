<script setup>
import {onMounted, ref} from 'vue';
import {WasmClient} from '../wasm/client.js';
import {useRoute} from "vue-router"; // Adjust the path as needed

defineProps({
  id: String
})

// Reactive variables
const item = ref(null);
const loading = ref(true);
const error = ref(null);
const route = useRoute()

// Initialize the WebAssembly client and fetch the stock catalog
onMounted(async () => {
  const wasmClient = new WasmClient();

  try {
    await wasmClient.init();
    //use id to fetch item
    item.value = await wasmClient.fetchItem(route.params.id); // Store the fetched catalog
  } catch (err) {
    error.value = 'Failed to load stock catalog.';
    console.error('Error using WebAssembly:', err);
  } finally {
    loading.value = false;
  }
});
</script>
<template>
  <div class="item">
    <!-- Show loading indicator -->
    <p v-if="loading">Loading item...</p>

    <!-- Show error if any -->
    <p v-if="error">{{ error }}</p>

    <!-- Render item if available -->
    <div v-if="item">
      <h1>{{ item.name }}</h1>
      <p>Calories per 100g: {{ item.calories_100g }}</p>
      <h3>Contents</h3>
      <ul>
        <li>Water: {{item.contents.water}}g </li>
        <li>Sugar: {{item.contents.sugar}}g </li>
        <li>Fat: {{item.contents.fat}}g </li>
        <li>Dry Matter: {{item.contents.dry_matter}}g </li>
      </ul>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .item {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
