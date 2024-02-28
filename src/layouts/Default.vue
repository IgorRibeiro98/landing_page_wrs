<template>
  <AppBar />
  <NavigationDrawer v-if="false" />

  <v-main>
    <v-container fluid class="d-flex flex-column overflow-auto h-100">
      <v-breadcrumbs class="px-0 pt-0" :items="['Foo', 'Bar', 'Fizz']"></v-breadcrumbs>

      <div class="flex-grow-1">
        <RouterView />
      </div>
    </v-container>
  </v-main>
</template>
<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { RouterView } from "vue-router";
</script>
<style scoped lang="scss"></style>
