<template>
  <div v-if="isLoading"></div>
  <div
    v-else
    class="fill-height d-flex align-center justify-center flex-column"
  >
    <div>
      <img :src="checkCircle" />
    </div>

    <h1 class="text-success">Senha gerada com sucesso! :)</h1>
    <p>Retire sua senha e aguarde ser chamado pelo painel da recepção.</p>

    <div class="w-100">
      <Timer
        hide-number
        start-manual
        :time="15"
        ref="timer"
        @end="$emit('next')"
        class="mt-4"
      />
    </div>
    <iframe
      :src="url"
      frameborder="0"
      class="rounded-xl border mt-6"
      height="200"
      v-if="!app"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { AlertProps, LoadingProps } from "@/modules/patient/types";
import Timer from "@patient/components/Timer.vue";
import { computed, onBeforeMount, onMounted, ref } from "vue";

import checkCircle from "@/assets/icons/check-circle.svg";

const props = defineProps<{
  data: Data;
}>();

const url = computed(() => {
  const params = new URLSearchParams(props.data.ticket! as any);

  return window.location.origin + `/#/senha?${params.toString()}`;
});

const emit = defineEmits<{
  (event: "alert", payload: AlertProps): void;
  (event: "next"): void;
  (event: "loading", payload: LoadingProps): void;
}>();

const timer = ref();
const isLoading = ref(true);
const app = computed(() => "api" in window ?? false);

function print() {
  emit("loading", {
    text: "Aguarde só mais um instante",
    callback(loading) {
      window.api
        .print(JSON.parse(JSON.stringify(props.data.ticket!)))
        .then((res: any) => {
          timer.value.start();
        })
        .catch((error: any) => {
          emit("alert", {
            title: "Ops, Não foi possível imprimir a senha! :(",
            text: `Por favor, anote o número abaixo <br/> <h1> ${props.data.ticket?.value} </h1> Já acionamos a equipe responsavel para cuidar disso`,
            action: {
              type: "confirm",
              label: "Já anotei a minha senha",
              callback() {
                emit("next");
              },
            },
          });
          console.log({ error });
        })
        .finally(() => {
          isLoading.value = false;
          loading.value = false;
        });
    },
  });
}

onBeforeMount(() => {
  if (app.value) return print();
});

onMounted(() => {
  if (!app.value) {
    timer.value.start();
    isLoading.value = false;
  }
});
</script>
