<template>
  <v-app-bar color="nav-color" elevation="0" order="1">
    <template #prepend>
      <v-img :src="logo" width="40" height="40"></v-img>
      <span class="text-overline font-weight-bold" v-if="!mobile">WRS Serviços de engenharia</span>
    </template>
    <span class="text-overline font-weight-bold" v-if="mobile">WRS Serviços de engenharia</span>
    <template #append>
      <ContactButton class="mr-6" />
      <div class="d-flex align-center ga-4">
        <div class="d-flex align-center ga-4" v-if="!$vuetify.display.mobile">
          <v-btn v-for="action in appBarActions" v-show="action.onlyMobile ? !action.onlyMobile : true"
            @click="action.action" variant="text" :icon="action.icon" density="comfortable"></v-btn>
        </div>
      </div>
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import appLogo from "@/assets/LOGO-WRS.png";
import { appBarItems } from "@/layouts/AppMenuItems";
import useSystemStore from "@/stores/system";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useTheme, useDisplay } from "vuetify";
import ContactButton from "@/components/ContactButton.vue";


const { mobile } = useDisplay();
const { drawer } = storeToRefs(useSystemStore());
const router = useRouter();
const theme = useTheme();
const loadingLogout = ref(false);

const logo = computed<any>(() => {
  return appLogo;
});

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

interface AppBarActions {
  icon: string
  title: string
  action: () => void
  onlyMobile?: boolean
}

const appBarActions = computed<AppBarActions[]>(() => [
  // {
  //   icon: themeIcon.value,
  //   title: "Alterar tema",
  //   action: toggleTheme,
  // },
]);
</script>
<style scoped lang="scss"></style>
