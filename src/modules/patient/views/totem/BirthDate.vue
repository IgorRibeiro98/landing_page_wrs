<template>
  <h1 class="mb-4 text-center">Verificação de Identidade</h1>

  <p class="mb-4">
    <b>{{ data.challenge?.name }}</b>
    Para a sua segurança, precisamos que você selecione a sua data de
    nascimento.
  </p>

  <div>
    <v-row>
      <v-col
        v-for="(sugestion, index) of data.challenge?.birthDays"
        :key="index"
        cols="12"
        md="3"
      >
        <v-sheet
        color="transparent"
          variant="outlined"
          border="sm"
          @click="send(sugestion)"
          stacked
          width="100%"
          :disabled="isLoading"
          class="d-flex flex-column justify-space-evenly align-center cursor-pointer"
          style="min-height: 150px"
        >
          <v-icon icon="mdi-calendar" size="45" color="primary"></v-icon>
          <p class="font-weight-medium">
            {{ sugestion }}
          </p>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import { checkBirthDate } from "@patient/repositories/patient.repository";

const birthDate = ref("");
const formElement = ref<HTMLFormElement>()!;

import { AlertProps, Data, LoadingProps, Patient } from "@patient/types";

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "loading", options: LoadingProps): void;
  (event: "next"): void;
  (event: "to", value: string): void;
  (event: "update:data", value: any): void;
}

const isLoading = ref(false);
const emit = defineEmits<Emit>();

const props = defineProps<{
  data: Data;
}>();

const data = computed({
  get: () => props.data,
  set: (value: Data) => emit("update:data", value),
});

async function send(date: any) {
  isLoading.value = true;

  emit("loading", {
    text: "Aguarde enquanto validamos a sua data de nascimento",
    callback(loading) {
      checkBirthDate(props.data.internal.identifier!, date)
        .then((res) => {
          data.value.patient = formatPatient(res.data);
          data.value.internal.birthDate = date;
          emit("next");
        })
        .catch((error) => {
          openAlert(error);
        })
        .finally(() => {
          isLoading.value = false;
          loading.value = false;
        });
    },
  });
}

function formatPatient(patient: Patient) {
  const { ddd_cellphone, cellphone_number, ddd_phone, phone_number } = patient.data;
  let telephone = "";
  let cellphone = "";

  if (phone_number) {
    telephone = (ddd_phone ?? "").concat(phone_number);
  }

  if (cellphone_number) {
    cellphone = (ddd_cellphone ?? "").concat(cellphone_number);
  }

  patient.data.cellphone = cellphone;
  patient.data.telephone = telephone;
  return patient;
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
          setTimeout(() => formElement.value!.focus(), 500);
        } else emit("to", "Queues");
      },
    },
  });
}
</script>
