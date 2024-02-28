<template>
  <v-navigation-drawer v-if="$route.name != 'project.all'" v-model="drawer" :rail="rail" permanent color="nav-color"
      class="position-fixed">
      <!-- <v-list density="compact" nav>
          <v-list-item>
              <template #prepend>
                  <Avatar :user="authUser" color="secondary" size="24" />
              </template>
              <template #title>
                  <span class="pl-4 font-weight-semi-bold">{{ authUser.full_name }}</span>
              </template>
          </v-list-item>
      </v-list>
      <v-divider /> -->
      <v-btn color="nav-color" size="28" class="toggle-rail-drawer"
          :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'" @click.stop="toggleRail"></v-btn>
      <v-list class="mt-3" nav>
          <v-list-item :active="checkActive(drawerItem.route.name)" :title="drawerItem.title" @click="$router.push(drawerItem.route)"
               value="home" v-for="(drawerItem, index) in drawerItems" :key="index">
              <template #prepend="{ isActive }">
                  <v-icon size="24" :color="isActive ? 'secondary' : undefined">{{ drawerItem.icon }}</v-icon>
              </template>
              <template #title>
                  <span :class="{ 'font-weight-semi-bold': checkActive(drawerItem.route.name) }">{{ drawerItem.title
                  }}</span>
              </template>
          </v-list-item>
      </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

interface DrawerItem {
  icon: string
  title: string
  route: any
}


const drawer = ref(true)
const rail = ref(true)
const navDrawerLeftPosition = computed<string>(() => {
  if (rail.value) {
      return '73%'
  }
  return '94%'
})
const drawerItems = ref<DrawerItem[]>([
  {
      icon: 'mdi-monitor-vertical',
      title: 'Totens',
      route: {
          name: 'totem.view',
      }
  },
  {
      icon: 'mdi-account-group',
      title: 'Filas',
      route: {
          name: 'user.all',
      }
  },
  // {
  //     icon: 'mdi-bulletin-board',
  //     title: 'Kanban',
  //     route: {
  //         name: 'project.boards',
  //     }
  // },
  // {
  //     icon: 'mdi-calendar',
  //     title: 'Calendário',
  //     route: {
  //         name: 'project.calendar.view',
  //     }
  // },

  // {
  //     icon: 'mdi-file-sign',
  //     title: 'Propostas',
  //     route: {
  //         name: 'proposal.all',

  //     }
  // },
  // {
  //     icon: 'mdi-form-select',
  //     title: 'Formulários',
  //     route: {
  //         name: 'form.all',
  //     }
  // }
])
const route = useRoute()

const checkActive = (routeName: string): boolean => {
  return route.matched.some((route) => {
      return route.name == routeName
  })
}

const toggleRail = () => {
  if (rail.value) {
      return rail.value = false
  }
  rail.value = true
}
</script>
<style scoped lang="scss">
.toggle-rail-drawer {
  position: absolute;
  top: 5%;
  left: v-bind(navDrawerLeftPosition);
  font-size: 1rem
}
</style>
