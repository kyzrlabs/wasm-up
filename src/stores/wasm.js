// stores/wasmStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { WasmClient } from '../wasm/client.js'; // Adjust the path as needed

export const useWasmStore = defineStore('wasmStore', () => {
    const wasmClient = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const getWasmClient = async () => {
        if (!wasmClient.value) {
            // Ensure it's only initialized once
            loading.value = true;
            const client = new WasmClient();
            try {
                await client.init();
                wasmClient.value = client;
            } catch (err) {
                error.value = 'Failed to initialize WebAssembly client.';
                console.error('Error initializing WebAssembly:', err);
            } finally {
                loading.value = false;
            }

        }
        return wasmClient.value;
    };

    const fetchStockCatalog = async () => {
        const client = await getWasmClient();
        return await client.fetchStockCatalog();
    };

    const fetchRecipeCatalog = async () => {
        const client = await getWasmClient();
        return await client.fetchRecipeCatalog();
    }

    const fetchItem = async (id) => {
        const client = await getWasmClient();
        return await client.fetchItem(id);
    }

    const fetchRecipe = async (id) => {
        const client = await getWasmClient();
        return await client.fetchRecipe(id);
    }


    return {
        wasmClient,
        loading,
        error,
        fetchStockCatalog,
        fetchRecipeCatalog,
        fetchItem,
        fetchRecipe,
    };
});
