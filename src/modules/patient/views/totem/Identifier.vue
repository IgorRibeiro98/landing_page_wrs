<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" md="11">
      <v-row>
        <v-col cols="12">
          <h1>Digite seu CPF no campo abaixo</h1>
        </v-col>

        <v-col cols="12" md="7">
          <v-form v-model="form">
            <v-text-field
              ref="formElement"
              :autofocus="true"
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
                @click="send()"
                :loading="isLoading"
                :disabled="isLoading"
              >
                Continuar
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="5" class="d-flex justify-center">
          <VirtualKeyboard always-visible/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import VirtualKeyboard from "@/components/VirtualKeyboard.vue";
import { ref, computed } from "vue";

import { cpf, required } from "@/rules";
import { findByIdentifier } from "@patient/repositories/patient.repository";

const identifier = ref("");
const form = ref(false);
const formElement = ref<HTMLFormElement>()!

import { AlertProps } from "@patient/types";

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
  (event: "to", value: ScreenComponent | number): void;
  (event: "update:data", value: any): void;
}

const isLoading = ref(false);
const emit = defineEmits<Emit>();

const props = defineProps<{
  data: any
}>()

const data = computed({
  get: () => props.data,
  set: (value: any) => emit('update:data', value)
})

function getUnformattedIdentifier() {
  return identifier.value.replace(/\D/g, "");
}

async function send() {
  if (!form.value) return;

  isLoading.value = true;

  findByIdentifier(getUnformattedIdentifier())
    .then((res) => {
      console.log({res})
      data.value.patient = res.data
      emit('next')
    })
    .catch((error) => {
      openAlert(error)
    })
    .finally(() => (isLoading.value = false));
}

function openAlert(text: string | Error) {
  emit("alert", {
        title: `Ops, ${text}! :(`,
        text: "Não se preocupe! Vamos te encaminhar para a recepção",
        action: {
          type: "choise",
          acceptLabel: "Ok, entendi",
          rejectLabel: "Finalizar",
          callback(accept: boolean) {
            if (accept) {
              identifier.value = "";
              console.log('continuar')
              setTimeout(() => formElement.value!.focus(), 500)
            }
            else console.log('emitir senha')
          }
        },
  });
}
</script>
