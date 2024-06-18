<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" md="11">
      <v-row>
        <v-col cols="12">
          <h1>Digite a sua data de nascimento</h1>
        </v-col>

        <v-col cols="12" md="7">
          <v-form v-model="form">
            <v-text-field
              ref="formElement"
              :autofocus="true"
              :disabled="isLoading"
              v-model="birthDate"
              :rules="[required]"
              v-mask="'##/##/####'"
              placeholder="00/00/0000"
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
import { computed, ref } from "vue";

import { required } from "@/rules";
import { checkBirthDate } from "@patient/repositories/patient.repository";

const birthDate = ref("");
const form = ref(false);
const formElement = ref<HTMLFormElement>()!

import { AlertProps, Data } from "@patient/types";

interface Emit {
  (event: "alert", options: AlertProps): void;
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

async function send() {
  if (!form.value) return;

  isLoading.value = true;

  checkBirthDate(props.data.internal.identifier!, birthDate.value)
    .then((res) => {
      data.value.patient = res.data
      data.value.internal.birthDate = birthDate.value
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
</script>
