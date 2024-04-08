<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" md="11">
      <v-row>
        <v-col cols="12">
          <h1>Digite os 4 primeiros dígitos do seu CPF</h1>
        </v-col>

        <v-col cols="12" md="7">
          <v-form v-model="form">
            <v-text-field
              :disabled="isLoading"
              v-model="identifier"
              :rules="[required, cpf]"
              v-mask="'###.###.###-##'"
              placeholder="000.000.000-00"
              number
            >
            </v-text-field>
          </v-form>

          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-btn
                color="primary"
                block
                rounded
                @click="send"
                :loading="isLoading"
                :disabled="isLoading"
              >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="5" class="d-flex justify-center">
          <VirtualKeyboard />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import VirtualKeyboard from "@/components/VirtualKeyboard.vue";
import { ref } from "vue";

import { cpf, required } from "@/rules";
import { findByIdentifier } from "@patient/repositories/patient.repository";

const identifier = ref("46518973800");
const form = ref(false);

import { AlertProps } from "@patient/types";

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
  (event: "to", value: ScreenComponent | number): void;
}

const isLoading = ref(false);
const emit = defineEmits<Emit>();

function getUnformattedIdentifier() {
  return identifier.value.replace(/\D/g, "");
}

async function send() {
  if (!form.value) return;

  isLoading.value = true;

  findByIdentifier(getUnformattedIdentifier())
    .then((res) => {
      emit('next')
    })
    .catch((error) => {
      openAlert(error)
    })
    .finally(() => (isLoading.value = false));
}

function openAlert(text: string | Error) {
  emit("alert", {
        title: "Não foi possível continuar o atendimento",
        text,
        action: {
          type: "choise",
          acceptLabel: "Vou tentar novamente",
          rejectLabel: "Prefiro emitir uma senha",
          callback(accept: boolean) {
            if (accept) {
              identifier.value = "";
              console.log('continuar')
            }
            else console.log('emitir senha')
          }
        },
  });
}
</script>
