<template>
  <v-main class="d-flex flex-column" style="height: 100vh; overflow: auto">
    <v-container class="flex-grow-1 d-flex pa-0" fluid>
      <RouterView />
    </v-container>
  </v-main>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<style scoped lang="scss"></style>
