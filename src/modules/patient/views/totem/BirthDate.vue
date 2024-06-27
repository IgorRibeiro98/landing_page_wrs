<template>
      <h1 class="mb-4 text-center">Verificação de Identidade</h1>

      <p class="mb-4">
        <b>{{ data.patient!.first_name }}</b>
        Para a sua segurança, precisamos que você selecione a sua data de nascimento.
      </p>

      <div>
        <v-row>
          <v-col v-for="(sugestion, index) of sugestions" :key="index" cols="12" md="3">
            <v-btn @click="send(sugestion)" stacked width="100%" :disabled="isLoading">
              <v-icon icon="mdi-calendar" size="35" color="primary"></v-icon>
              <span class="font-weight-regular">
                {{ sugestion }}
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

import { checkBirthDate, getBirthDateSugestion } from "@patient/repositories/patient.repository";

const birthDate = ref("");
const form = ref(false);
const formElement = ref<HTMLFormElement>()!
const sugestions = ref([])

import { AlertProps, Data, LoadingProps } from "@patient/types";

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: 'loading', options: LoadingProps): void;
  (event: "next"): void;
  (event: "to", value: string): void;
  (event: "update:data", value: any): void;
}

const isLoading = ref(false);
const emit = defineEmits<Emit>();

const props = defineProps<{
  data: Data
}>()

const data = computed({
  get: () => props.data,
  set: (value: Data) => emit('update:data', value)
})

async function send(date: any) {
  isLoading.value = true;

  emit('loading', {
    text: 'Aguarde enquanto validamos a sua data de nascimento',
    callback(loading) {
      checkBirthDate(props.data.internal.identifier!, date)
    .then((res) => {
      data.value.patient = res.data
      data.value.internal.birthDate = date
      emit('next')
    })
    .catch((error) => {
      openAlert(error)
    })
    .finally(() => {
      isLoading.value = false
      loading.value = false
    });
    }
  })
}

function openAlert(text: string | Error) {
  emit("alert", {
    title: `Ops, ${text}! :(`,
    text: "Não se preocupe! Vamos te encaminhar para a recepção",
    action: {
      type: "choise",
      rejectLabel: "Tentar novamente",
      acceptLabel: "Ok, entendi",
      callback(accept: boolean) {
        if (!accept) {
          birthDate.value = "";
          setTimeout(() => formElement.value!.focus(), 500)
        }
        else emit("to", 'Queues');
      }
    }
  });
}

onMounted(() => {
  getBirthDateSugestion(data.value.patient!.id)
    .then(res => {
      sugestions.value = res.data
    })
})
</script>
