<template>
  <v-app-bar color="nav-color" class="position-fixed">
    <template #prepend>
      <v-img aspect-ratio="16/9" v-if="!$vuetify.display.mobile" @click="$router.push({ path: '/' })" class="pointer mx-4" :src="logo" width="50"></v-img>
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="item in items" :value="item.route.name">
          <v-btn class="text-regular mx-1" @click="$router.push(item.route)"
            :active="$router.currentRoute.value.name == item.route.name">
            <v-icon class="mr-1">{{ item.icon }}</v-icon>
            <span v-if="!$vuetify.display.mobile">{{ item.title }}</span>
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </template>
    <template #append>
        {{ user.name }}
      
      <v-btn @click="toggleTheme" variant="text" :icon="themeIcon"></v-btn>
      <v-btn @click="logoutUser" :loading="loadingLogout" title="Sair" icon="mdi-exit-to-app"></v-btn>
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import logo from "@/assets/logo.png";
import { computed, ref } from "vue";
import { useTheme } from "vuetify";
import { signout } from '@/modules/auth/services/auth.service'
import { storeToRefs } from 'pinia'

import useUserStore from '@/stores/user'

const {user} = storeToRefs(useUserStore())

const theme = useTheme();
const loadingLogout = ref(false);

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  localStorage.setItem("theme", JSON.stringify(theme.global.current.value));
  localStorage.setItem("themeName", theme.global.name.value);
}

const themeIcon = computed<string>(() => {
  if (theme.global.current.value.dark) {
    return "mdi-white-balance-sunny";
  }
  return "mdi-weather-night";
});

function logoutUser() {
  loadingLogout.value = true

  signout()
    .finally(() => {
      loadingLogout.value = false
    })
}

const items = [
  {
    title: "Totens",
    icon: "mdi-monitor-vertical",
    route: {
      name: "totem.view",
    },
  },
  {
    title: "Filas",
    icon: "mdi-format-list-bulleted",
    route: {
      name: "queue.view",
    },
  },
  {
      icon: 'mdi-sitemap-outline',
      title: 'Tipos de Atendimento',
      route: {
          name: 'attendance-type.view',
      }
  },
];
</script>
<style scoped lang="scss"></style>
