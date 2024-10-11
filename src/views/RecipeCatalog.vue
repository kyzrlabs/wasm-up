<script setup>
import {useRecipeStore} from '../stores/recipe.js';
import {onMounted} from "vue"; // Import the stock store

const recipeStore = useRecipeStore();

onMounted(() => {
  recipeStore.fetchRecipeCatalog();
});
</script>

<template>
  <main>
    <div v-if="recipeStore.loading">Loading...</div>
    <div v-else-if="recipeStore.error">{{ recipeStore.error }}</div>
    <div v-if="recipeStore.recipeCatalog">
      <div v-for="(recipes, category) in recipeStore.recipeCatalog.categories" :key="category">
        {{ category }}
        <ul>
          <li v-for="recipe in recipes" :key="recipe.id">
            <router-link :to="{ name: 'recipe-item', params: { id: recipe.id } }" >{{ recipe.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>