<template>
  <div class="text-white">
    <h1 class="text-center mb-4">Bem-vindo às Leve Clinicas!</h1>
    <p class="text-center text-primary">
      Para retirar sua senha, responda a pergunta abaixo:
    </p>
    <div class="mt-8">
      <p class="text-center">Você possui consulta agendada?</p>

      <v-row>
        <v-col class="d-flex" cols="12">
          <v-btn class="mx-auto" height="120" width="400" color="primary" @click="emit('next')">Sim</v-btn>
        </v-col>
        <v-col class="d-flex" cols="12">
          <v-btn class="mx-auto" height="120" width="400" color="primary" @click="emit('to', 'Queues')">Não</v-btn>
        </v-col>
      </v-row>
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
