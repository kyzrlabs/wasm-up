// stores/stock.js
import { defineStore } from 'pinia';
import { useWasmStore } from './wasm.js';
import {computed, ref} from "vue";

export const useStockStore = defineStore('stockStore', () => {
    const wasmStore = useWasmStore();  // Access the wasmStore directly
    const stockCatalog = ref(null);
    const stockItem = ref(null);

    const loading = computed(() => wasmStore.loading);  // Use computed for reactivity
    const error = computed(() => wasmStore.error);  // Use computed for reactivity

    const fetchStockCatalog = async () => {
        stockCatalog.value = await wasmStore.fetchStockCatalog();
    };

    const fetchStockItem = async(id) => {
        stockItem.value = await wasmStore.fetchItem(id);
    }

   const clearStockItem = () => {
        stockItem.value = null;
   }

    return {
        stockCatalog,
        stockItem,
        loading,
        error,
        fetchStockCatalog,
        fetchStockItem,
        clearStockItem,
    };
});
