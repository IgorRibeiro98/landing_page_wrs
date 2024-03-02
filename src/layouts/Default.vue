<template>
  <AppBar />
  <NavigationDrawer v-if="false" />

  <v-main>
    <v-container fluid class="d-flex flex-column overflow-auto h-100">
      <Breadcrumb class="mb-4"></Breadcrumb>

      <div class="flex-grow-1">
        <RouterView />
      </div>
    </v-container>
  </v-main>
</template>
<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import Breadcrumb from "@/components/BreadCrumb.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { RouterView } from "vue-router";

</script>
<style scoped lang="scss"></style>
