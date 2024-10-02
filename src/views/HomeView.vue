<script setup>
import {onMounted, ref} from 'vue';
import {WasmClient} from '../wasm/client.js'; // Adjust the path as needed

// Reactive variables
const stockCatalog = ref(null);
const loading = ref(true);
const error = ref(null);

// Initialize the WebAssembly client and fetch the stock catalog
onMounted(async () => {
  const wasmClient = new WasmClient();

  try {
    await wasmClient.init();
    stockCatalog.value = await wasmClient.fetchStockCatalog(); // Store the fetched catalog
  } catch (err) {
    error.value = 'Failed to load stock catalog.';
    console.error('Error using WebAssembly:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main>
    <!-- Show loading indicator -->
    <p v-if="loading">Loading stock catalog...</p>

    <!-- Show error if any -->
    <p v-if="error">{{ error }}</p>

    <!-- Render stock catalog if available -->
    <div v-if="stockCatalog">
      <div v-for="(category, categoryName) in stockCatalog.categories" :key="categoryName">
        <h3>{{ categoryName }}</h3>
        <ul>
          <li v-for="item in category.items" :key="item.id">
            <router-link :to="{ name: 'item', params: { id: item.id } }">
              {{ item.name }} (Calories per 100g: {{ item.calories_100g }})
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
