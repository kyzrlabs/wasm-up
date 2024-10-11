// stores/stock.js
import { defineStore } from 'pinia';
import { useWasmStore } from './wasm.js';
import {ref} from "vue";

export const useStockStore = defineStore('stockStore', () => {
    const wasmStore = useWasmStore();  // Access the wasmStore
    const stockCatalog = ref(null);
    const stockItem = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchStockCatalog = async () => {
        try {
            stockCatalog.value = await wasmStore.fetchStockCatalog();  // Fetch the stock catalog
        } catch (err) {
            error.value = 'Failed to fetch stock catalog.';
            console.error('Error fetching stock catalog:', err);
        } finally {
            loading.value = false;
        }
    };

    const fetchStockItem = async(id) => {
        try {
            stockItem.value = await wasmStore.fetchItem(id);
        } catch (err) {
            error.value = 'Failed to fetch stock item.';
            console.error('Error fetching stock item:', err);
        } finally {
            loading.value = false;
        }
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
