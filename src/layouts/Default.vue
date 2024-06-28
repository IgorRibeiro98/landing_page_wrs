<template>
  <AppBar />
  <NavigationDrawer :items="drawerItems" />
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
import { ref } from 'vue';
import { RouterView } from "vue-router";

const drawerItems = ref<DrawerItem[]>([
  // {
  //   icon: 'mdi-monitor-vertical',
  //   title: 'Totens',
  //   route: {
  //     name: 'totem.view',
  //   }
  // },
  // {
  //   icon: 'mdi-account-group',
  //   title: 'Filas',
  //   route: {
  //     name: 'queue.view',
  //   }
  // },
  // {
  //   icon: 'mdi-sitemap-outline',
  //   title: 'Tipo de Atendimento',
  //   route: {
  //     name: 'attendance-type.view',
  //   }
  // },
  // {
  //   icon: 'mdi-account-supervisor',
  //   title: 'Usuário',
  //   route: {
  //     name: 'user.view',
  //   }
  // },
  {
    icon: 'mdi-city-variant-outline',
    title: 'Tenant',
    route: {
      name: 'tenant.create',
    }
  },
  {
    icon: 'mdi-shield-key-outline',
    title: 'ACL',
    route: {
      name: 'management.acl',
    }
  },
  // {
  //   icon: 'mdi-cog',
  //   title: 'Gerenciamento',
  //   route: {
  //     name: '#',
  //   },
  //   items: [
  //     {
  //       icon: 'mdi-shield-key-outline',
  //       title: 'ACL',
  //       route: {
  //         name: 'management.acl',
  //       }
  //     },
  //   ]
  // },
])



</script>
<style scoped lang="scss"></style>
