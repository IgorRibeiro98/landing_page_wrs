<template>
  <v-main>
    <v-container fluid class="d-flex flex-column overflow-auto h-100">
      <div class="flex-grow-1">
        <RouterView />
      </div>
    </v-container>
  </v-main>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
