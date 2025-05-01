<template>
  <AppBar />
  <NavigationDrawer :items="drawerItems" v-if="false"/>
  <v-main>
    <v-container fluid class="d-flex flex-column overflow-auto h-100 bg-primary">
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
import { appBarItems, navigationDrawerItems } from '@/layouts/AppMenuItems';
import { RouterView } from "vue-router";

const drawerItems = [
  ...appBarItems.map((item: DrawerItem) => { item.onlyMobile = true; return item }),
  ...navigationDrawerItems
];
</script>
<style scoped lang="scss"></style>
