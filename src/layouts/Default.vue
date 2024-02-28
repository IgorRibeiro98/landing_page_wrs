<template>
  <v-layout fill-height style="height: 100vh; overflow: hidden">
    <AppBar />
    <NavigationDrawer v-if="false"/>
    <v-main>
      <v-container
        fluid
        class="pl-8 d-flex flex-column full-height"
        style="overflow: auto"
      >
        <div class="flex-grow-1">
          <RouterView />
        </div>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { RouterView } from "vue-router";
</script>
<style scoped lang="scss"></style>
