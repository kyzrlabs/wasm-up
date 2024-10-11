<script setup>
import {onMounted, ref} from 'vue';
import { useStockStore } from '../stores/stock'; // Import the stock store

const stockStore = useStockStore();

onMounted(() => {
  stockStore.fetchStockCatalog();
});
</script>

<template>
  <main>
    <div v-if="stockStore.loading">Loading...</div>
    <div v-else-if="stockStore.error">{{ stockStore.error }}</div>
    <div v-if="stockStore.stockCatalog">
      <!-- Render the stock catalog -->
      <div v-for="(stocks, category) in stockStore.stockCatalog.categories" :key="category">
        {{ category }}
        <ul>
          <li v-for="stock in stocks.items" :key="stock.id">
            <router-link :to="{ name: 'stock-item', params: { id: stock.id } }">{{ stock.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>