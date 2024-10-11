<script setup>
import {useRoute} from "vue-router";

defineProps({
  id: String
})

import {useRecipeStore} from '../stores/recipe.js';
import {onMounted, onUnmounted, ref} from "vue"; // Import the stock store

const route = useRoute()
const recipeStore = useRecipeStore();
const recipe = ref(null);

onMounted(() => {
  recipeStore.fetchRecipe(route.params.id);
});

onUnmounted(() => {
  recipeStore.clearRecipe();
});

</script>

<template>
  <main>
    <div v-if="recipeStore.loading">Loading...</div>
    <div v-else-if="recipeStore.error">{{ recipeStore.error }}</div>
    <div v-if="recipeStore.recipe">
      <h2>{{recipeStore.recipe.name}}</h2>
      <p>{{recipeStore.recipe.description}}</p>
    </div>
  </main>
</template>

<style scoped>

</style>