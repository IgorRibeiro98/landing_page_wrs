<template>
  <v-container class="pt-8 px-12 d-flex flex-column totem" fluid style="height: 100%">
    <div class="flex-grow-0">
      <div>
        <v-img :src="logo" max-width="194"></v-img>
      </div>
      <div class="d-flex justify-space-between mt-8">
        <v-btn variant="text" color="primary" @click="emit('back')">
          <v-icon class="mr-2" size="30">mdi-chevron-left</v-icon>
          <span class="font-weight-bold">Voltar</span></v-btn
        >
        <v-btn variant="text" color="primary" @click="emit('cancel')"
          ><span class="font-weight-bold">Cancelar</span></v-btn
        >
      </div>
    </div>
    <div
      style="width: 80%; height: 100%"
      class="flex-grow-1 ma-auto d-flex flex-column"
    >
      <v-row class="ma-auto" style="height: 100%; width: 100%">
        <v-col>
            <slot></slot>
        </v-col>

        <v-slide-x-reverse-transition class="v-col v-col-4" mode="out-in">
        <v-col cols="4" v-show="keyboard" >
          <div class="d-flex justify-center align-center h-100">
            <VirtualKeyboard v-model="keyboard"/>
          </div>
        </v-col>
      </v-slide-x-reverse-transition>
      </v-row>
      <div class="text-center">
        <v-divider class="my-4"></v-divider>
        {{ date }} - {{ hour }}
      </div>
    </div>
  </v-container>
</template>
<script lang="ts" setup>
import appLogo from "@/assets/logo.png";
import VirtualKeyboard from '@/components/VirtualKeyboard.vue';
import { capitalizeFirstLetter } from "@/helpers/string";
import useTenantStore from "@/modules/tenant/store";
import { computed, onMounted, onUnmounted, ref } from "vue";

interface Emits {
  (event: "cancel"): void;
  (event: "back"): void;
}
const emit = defineEmits<Emits>()
const tenantStore = useTenantStore();

const logo = computed(() => {
  return tenantStore.tenant.logo || appLogo;
});
const keyboard = ref(false);
const date = computed(() => {
  const now = new Date();
  const day = now.toLocaleDateString("pt-BR", { day: "2-digit" });
  const month = now.toLocaleDateString("pt-BR", { month: "long" });
  const year = now.toLocaleDateString("pt-BR", { year: "numeric" });
  return `${day} de ${capitalizeFirstLetter(month)} de ${year}`;
});

const hour = ref('')
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
