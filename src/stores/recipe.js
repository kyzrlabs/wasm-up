// stores/stock.js
import { defineStore } from 'pinia';
import { useWasmStore } from './wasm.js';
import {ref} from "vue"; // Import the wasmStore to access the initialized WasmClient

export const useRecipeStore = defineStore('recipeStore', () => {
    const wasmStore = useWasmStore();  // Access the wasmStore
    const recipeCatalog = ref(null);
    const recipe = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchRecipeCatalog = async () => {
        try {
            recipeCatalog.value = await wasmStore.fetchRecipeCatalog();  // Fetch the stock catalog
        } catch (err) {
            error.value = 'Failed to fetch recipe catalog.';
            console.error('Error fetching recipe catalog:', err);
        } finally {
            loading.value = false;
        }
    };

    const fetchRecipe = async (id) => {
        try {
            recipe.value = await wasmStore.fetchRecipe(id);
        } catch (err) {
            error.value = 'Failed to fetch recipe.';
            console.error('Error fetching recipe:', err);
        } finally {
            loading.value = false;
        }
    }

    const clearRecipe = () => {
        recipe.value = null;
    }

    return {
        recipeCatalog,
        recipe,
        loading,
        error,
        fetchRecipeCatalog,
        fetchRecipe,
        clearRecipe,
    };
});
