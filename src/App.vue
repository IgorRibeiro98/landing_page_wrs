<template>
  <v-app>
    <v-layout fill-height class="pa-0 ma-0 h-screen overflow-hidden">
      <router-view />
    </v-layout>
    <Alert />
  </v-app>
</template>

<script lang="ts" setup>
import bootstrap from "@/bootstrap";
import { useRoute } from "vue-router";

import { onMounted } from "vue";

const route = useRoute()

onMounted(() =>  bootstrap(route));

</script>

<style scoped>
.layout-container {
  display: flex;
  overflow: auto;
  height: 100vh;
  flex-direction: column;
}

.top {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
}

.bottom {
  flex-grow: 0;
  flex-shrink: 0;
  overflow: auto;
}
</style>
