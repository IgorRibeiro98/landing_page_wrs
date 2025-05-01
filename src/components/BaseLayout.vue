<template>
  <v-container class="pt-8 px-12 d-flex flex-column totem" fluid style="height: 100%">
      <div class="flex-grow-0">
          <div>
              <v-img :src="logo" max-width="194"></v-img>
          </div>
      </div>
      <div style="width: 80%; height: 100%" class="flex-grow-1 ma-auto d-flex flex-column">
          <v-row class="ma-auto" no-gutters style="height: 100%; width: 100%">
              <v-col>
                  <slot></slot>
              </v-col>
          </v-row>
          <div class="text-center">
              <v-divider class="my-4"></v-divider>
              {{ date }} - {{ hour }}
          </div>
      </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

import appLogo from "@/assets/logo.png";
import { capitalizeFirstLetter } from "@/helpers/string";

const logo = computed(() => {
  return appLogo;
});

const hour = ref('')

const date = computed(() => {
const now = new Date();
const day = now.toLocaleDateString("pt-BR", { day: "2-digit" });
const month = now.toLocaleDateString("pt-BR", { month: "long" });
const year = now.toLocaleDateString("pt-BR", { year: "numeric" });
return `${day} de ${capitalizeFirstLetter(month)} de ${year}`;
});

let timerId: number = 0;

function startHour() {
hour.value = new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });

const now = new Date();
const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

setTimeout(() => {
  hour.value = new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });

  timerId = setInterval(() => {
    hour.value = new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
  }, 60000);
}, msUntilNextMinute);
}
onMounted(() => {
startHour();
});

onUnmounted(() => {
clearInterval(timerId);
});
</script>
