<template>
  <v-app-bar color="nav-color" class="position-fixed" elevation="0">
    <template #prepend>
      <v-btn
        icon="mdi-menu"
        density="comfortable"
        v-if="$vuetify.display.mobile"
        @click="drawer = true"
      ></v-btn>
      <v-img
        aspect-ratio="16/9"
        @click="$router.push({ path: '/' })"
        class="pointer mx-4"
        :src="logo"
        width="30"
      ></v-img>
      <v-slide-group show-arrows v-if="!$vuetify.display.mobile">
        <v-slide-group-item
          v-for="item in appBarItems"
          :value="item.route.name"
        >
          <v-btn
            class="text-regular mx-1"
            @click="$router.push(item.route)"
            :active="$router.currentRoute.value.name == item.route.name"
            v-if="authorization.acl(item.acl)"
          >
            <v-icon class="mr-1">{{ item.icon }}</v-icon>
            <span v-if="!$vuetify.display.mobile">{{ item.title }}</span>
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </template>
    <template #append>
      <div class="d-flex align-center ga-4">
        <v-select
          style="min-width: 200px"
          hideDetails="auto"
          density="compact"
          variant="solo"
          filled
          flat
          return-object
          item-title="name"
          :items="authUser.tenants"
          v-model="currentTenant"
        >
          <template #item="{ item, props }">
            <v-list-item v-bind="props">
              <template #prepend>
                <v-img
                  max-width="40"
                  width="40"
                  max-height="40"
                  height="40"
                  class="rounded-lg mr-4 border"
                  :src="(item.raw.logo as string)"
                ></v-img>
              </template>
            </v-list-item>
          </template>
        </v-select>
        <div class="d-flex align-center ga-4" v-if="!$vuetify.display.mobile">
          <v-btn
            v-for="action in appBarActions"
            v-show="action.onlyMobile ? !action.onlyMobile : true"
            @click="action.action"
            variant="text"
            :icon="action.icon"
            density="comfortable"
          ></v-btn>
        </div>
        <v-menu v-else>
          <template #activator="{ props }">
            <v-btn icon v-bind="props" density="comfortable">
              <Avatar :user="authUser" density="comfortable"></Avatar>
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item
              v-for="action in appBarActions"
              @click="action.action"
              :key="action.title"
            >
              <v-list-item-title> <v-icon class="mr-2">{{ action.icon }}</v-icon> {{ action.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import appLogo from "@/assets/logo.png";
import { changeTenant } from "@/helpers";
import { appBarItems } from "@/layouts/AppMenuItems";
import { signout } from "@/modules/auth/services/auth.service";
import useTenantStore from "@/modules/tenant/store";
import authorization from "@/plugins/authorization";
import useSystemStore from "@/stores/system";
import { useAuthStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";
import Avatar from "./Avatar.vue";

const { authUser } = storeToRefs(useAuthStore());

const { drawer } = storeToRefs(useSystemStore());
const router = useRouter();

const currentTenant = computed({
  get() {
    const url = new URL(window.location.href);

    const [subdomain] = url.hostname.split(".");

    return authUser.value.tenants?.find((tenant) => subdomain == tenant.subdomain);
  },
  set(value: any) {
    changeTenant(value.subdomain);
  },
});

const tenantStore = useTenantStore();

const theme = useTheme();
const loadingLogout = ref(false);

const logo = computed<any>(() => {
  return tenantStore.tenant.logo ?? appLogo;
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
  {
    icon: themeIcon.value,
    title: "Alterar tema",
    action: toggleTheme,
  },
  {
    icon: 'mdi-account',
    title: 'Perfil',
    action: () => router.push({ name: 'user.self' }),
    onlyMobile: true,
  },
  {
    icon: "mdi-exit-to-app",
    title: "Sair",
    action: logoutUser,
  }
]);

function logoutUser() {
  loadingLogout.value = true;

  signout().finally(() => {
    loadingLogout.value = false;
  });
}
</script>
<style scoped lang="scss"></style>
