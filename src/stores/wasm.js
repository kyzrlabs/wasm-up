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

    const callWasmFunction = async (fn, ...args) => {
        loading.value = true;
        try {
            const result = await fn(...args);  // Call the provided WebAssembly function
            return result;
        } catch (err) {
            error.value = err.message || 'An error occurred during the WebAssembly call.';
            console.error('WebAssembly Call Error:', err);
            throw err;  // Rethrow the error to allow further handling
        } finally {
            loading.value = false;
        }
    };

    const fetchStockCatalog = async () => {
        const client = await getWasmClient();
        return await callWasmFunction(() => client.fetchStockCatalog());  // Pass function reference
    };

    const fetchRecipeCatalog = async () => {
        const client = await getWasmClient();
        return await callWasmFunction(() => client.fetchRecipeCatalog());
    }

    const fetchItem = async (id) => {
        const client = await getWasmClient();
        return await callWasmFunction(() => client.fetchItem(id));
    }

    const fetchRecipe = async (id) => {
        const client = await getWasmClient();
        return await callWasmFunction(() => client.fetchRecipe(id));
    }

    return {
        wasmClient,
        loading,
        error,
        callWasmFunction,
        fetchStockCatalog,
        fetchRecipeCatalog,
        fetchItem,
        fetchRecipe,
    };
});
