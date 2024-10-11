import { defineStore } from 'pinia';
import {computed, ref} from 'vue';
import {useWasmStore} from "@/stores/wasm.js";

export const useRecipeStore = defineStore('recipeStore', () => {
    const wasmStore = useWasmStore();  // Access the wasm client from the wasmStore
    const recipeCatalog = ref(null);
    const recipe = ref(null);

    const loading = computed(() => wasmStore.loading);  // Use computed for reactivity
    const error = computed(() => wasmStore.error);  // Use computed for reactivity

    const fetchRecipeCatalog = async () => {
        recipeCatalog.value = await wasmStore.fetchRecipeCatalog();
    };

    const fetchRecipe = async (id) => {
        recipe.value = await wasmStore.fetchRecipe(id);  // Use the utility to call the function with arguments
    };

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
        clearRecipe
    };
});
