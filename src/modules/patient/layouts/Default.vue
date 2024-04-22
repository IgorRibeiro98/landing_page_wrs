<template>
  <div class="d-flex flex-column flex-grow-1 totem" :style="styles" fluid>
    <div>
      <div>
        <v-img :src="logo" width="194"></v-img>
      </div>
      <div class="mt-4 d-flex justify-space-between" style="">
        <v-btn
          variant="text"
          color="primary"
          @click="emit('back')"
          :disabled="hideBack"
        >
          <v-icon class="mr-2" size="30">mdi-chevron-left</v-icon>
          <span class="font-weight-bold">Voltar</span></v-btn
        >
        <v-btn
          variant="text"
          color="primary"
          @click="emit('cancel')"
          :disabled="hideCancel"
          ><span class="font-weight-bold">Cancelar</span></v-btn
        >
      </div>
    </div>
    <div style="width: 80%" class="mx-auto flex-grow-1 d-flex flex-column">
        <slot></slot>
    </div>
    <div class="text-center">
      <v-divider class="my-4"></v-divider>
      {{ date }} - {{ hour }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import appLogo from "@/assets/logo.png";
import { capitalizeFirstLetter } from "@/helpers/string";
import useTenantStore from "@/modules/tenant/store";
import { computed, onMounted, onUnmounted, ref, withDefaults } from "vue";

interface Emits {
  (event: "cancel"): void;
  (event: "back"): void;
}

interface Props {
  hideBack?: boolean;
  hideCancel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hideBack: false,
  hideCancel: false,
});
const emit = defineEmits<Emits>();
const tenantStore = useTenantStore();
const styles = ref<any>({});
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

const hour = ref("");
let timerId: number = 0;

function startHour() {
  hour.value = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const now = new Date();
  const msUntilNextMinute =
    60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

  setTimeout(() => {
    hour.value = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    timerId = setInterval(() => {
      hour.value = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }, 60000);
  }, msUntilNextMinute);
}

function setStyles(newStyles: any) {
  styles.value = newStyles;
}

defineExpose({
  setStyles,
});
onMounted(() => {
  startHour();
});

onUnmounted(() => {
  clearInterval(timerId);
});
</script>
