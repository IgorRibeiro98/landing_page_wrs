<template>
  <div class="text-white fill-height d-flex align-center justify-center">
    <div>
      <h1 class="text-center mb-4">Bem-vindo</h1>
      <div class="mt-8">
        <v-row>
          <v-col class="d-flex" cols="12">
            <v-btn class="mx-auto" height="120" width="400" color="primary" @click="emit('next')">Iniciar Atendimento</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InitSvg from "@/assets/init.svg";
import Default from "@/layouts/Default.vue";
import { onMounted } from "vue";

const emit = defineEmits<{
  (event: "next"): void;
  (event: 'to', value: string): void;
}>();
interface Props {
  layoutRef: typeof Default;
}

const props = defineProps<Props>();
onMounted(() => {
  props.layoutRef.setStyles({
    backgroundImage: `url('${InitSvg}')`,
    backgroundSize: "100% 100%",
    color: 'white'
  });
});
</script>
