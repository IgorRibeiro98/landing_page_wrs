<template>
  <v-row justify="center">
    <v-col cols="12">
      <h1>
        Enviamos um código SMS para o seu celular com final {{ data.patient?.phone_hint }} e para o seu app.
      </h1>
    </v-col>
    <v-col cols="12" md="8" lg="7">
      <v-form v-model="form" lazy-validation ref="formElement">
        <v-text-field @update:model-value="token.wasSended = false" ref="inputElement" validate-on="input"
          v-mask="'###-###'" v-model="token.data" number :rules="[required, (value: string) => min(6, getUnformattedCode()) , tokenRule]"
          placeholder="000-000"></v-text-field>
      </v-form>

      <v-row class="d-flex" dense justify="center">
        <v-col cols="12" md="7">
          <v-btn rounded variant="outlined" class="mr-4" @click="resendToken" :disabled="token.sendLoading">
            {{ resendLabel }}
          </v-btn>
          <div v-if="token.timer > 0">
            Seu código expira em 0:{{ token.timer.toString().padStart(2, '0') }}
          </div>
        </v-col>

        <v-col cols="12" md="5">
          <v-btn color="primary" @click="sendSignature" :disabled="!form || token.data.length != 7 || isLoading"
            :loading="isLoading" rounded>
            Continua
          </v-btn>
        </v-col>
      </v-row>

      <p class="mt-10">
        Caso não tenha acesso ao código ou seu número esteja incorreto,
        volte uma etapa para tentar a leitura biométrica
        ou pule o check-in para passar na recepção.
      </p>

      <v-btn variant="text" class="mt-4 text-primary" @click="$emit('to', 'Queues')">
        Pular check-in rápido
      </v-btn> 
    </v-col>

    <v-col cols="12" md="4" lg="5" class="d-flex justify-center">
      <VirtualKeyboard always-visible />
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { Data, AlertProps, LoadingProps } from "@patient/types";
import { required } from '@/rules'
import { ref, computed, onMounted } from 'vue'

import { checkToken, sendToken, signature } from '@patient/repositories/signature.repository'

const props = defineProps<{
  data: Data
}>()

const emit = defineEmits<{
  (event: 'update:data', value: Data): void
  (event: 'next'): void;
  (event: 'cancel'): void;
  (event: "alert", options: AlertProps): void;
  (event: "loading", options: LoadingProps): void;
  (event: "to", payload: string): void;
}>()

const data = computed({
  get: () => props.data,
  set: (value: Data) => emit('update:data', value)
})

const token = ref({
  data: '',
  wasSended: false,
  isValid: false,
  expiration: 10,
  timer: 0,
  sendLoading: false,
  timesItWasSend: 0
})

const formElement = ref<HTMLFormElement>()
const inputElement = ref<HTMLInputElement>()

const isLoading = ref(false)

const resendLabel = computed(() => {
  if (token.value.timesItWasSend <= 1) return 'Não recebi o código'

  return 'Reenviar código'
})

function min(min: number, value: string): boolean | string {
  if (value.length < min) return `Mínimo de ${min} caracteres`

  return true
}

function tokenRule(value: string) {
  if (value.length == 7 && token.value.wasSended && !token.value.isValid) return 'Token inválido'

  return true
}

function getUnformattedCode() {
  return token.value.data.replace(/\D/g, "");
}

const form = ref(false)

function sendSignature() {
  isLoading.value = true

  checkToken(getUnformattedCode())
    .then(() => {

      emit('loading', { 
        text: 'Aguardando autorização da operadora',
        callback(loading) {
          signature(getUnformattedCode())
          .then(() => {
            loading.value = false
            emit('next')
          })
          .catch((error) => {
            loading.value = false

            emit('alert', {
              title: `Ops, ${error.response?.data?.message} :(`,
              text: 'Tente novamente',
              action: {
                type: 'choise',
                acceptLabel: 'Ok, entendi',
                rejectLabel: 'Finalizar',
                callback(choice: boolean) {
                  if (!choice) return emit('cancel')
                  emit('to', 'Queues')
                }
              }
            })
          })
        }
      })
     
    })
    .catch(error => {
      console.log({ error })
      token.value.wasSended = true
      token.value.isValid = false
      formElement.value!.validate()

      if (error.data!.maxAttempts <= 0) {
        const message = {
          title: 'Você atingiu o limite de tentativas',
          text: 'Vamos te encaminhar para a recepção :)'
        }

        if (data.value.patient?.has_face_recognition) return emit('alert', {
          ...message,
          action: {
            type: 'choise',
            acceptLabel: 'Ir para recepção',
            rejectLabel: 'Tentar com biometria facial',
            callback(choise: boolean) {
              if (!choise) return emit('to', 'FaceRecognition')

              emit('to', 'Queues')
            }
          }
        })

        emit('alert', {
          ...message,
          action: {
            type: 'confirm',
            label: 'Ok, entendi',
            callback() {
              emit('to', 'Queues')
            }
          }
        })
      }
    })
    .finally(() => isLoading.value = false)
}

function resendToken() {
  send()

  const message = {
    title: `Enviamos um novo código SMS para o seu celular com o final ${data.value.patient?.phone_hint} e para o seu app :)`,
    text: ''
  }

  if (data.value.patient?.has_face_recognition)
    return emit('alert', {
      ...message,
      action: {
        type: 'choise',
        acceptLabel: 'Continuar',
        rejectLabel: 'Tentar com biometria facial',
        callback(choise: boolean) {
          if (!choise) return emit('to', 'FaceRecognition')

          token.value.data = ''
          formElement.value!.resetValidation()
          setTimeout(() => inputElement.value!.focus(), 500)
        }
      }
    })

  emit('alert', {
    ...message,
    action: {
      type: 'choise',
      acceptLabel: 'Continuar',
      rejectLabel: 'Ir para recepção',
      callback(choise: boolean) {
        if (!choise) return emit('to', 'Queues')

        token.value.data = ''
        formElement.value!.resetValidation()
        setTimeout(() => inputElement.value!.focus(), 500)
      }
    }
  })
}

function send() {
  token.value.timesItWasSend++
  token.value.sendLoading = true

  sendToken()
    .then(() => {
      if (token.value.timesItWasSend <= 1) {
        token.value.sendLoading = false
        return
      }

      token.value.timer = token.value.expiration

      const interval = setInterval(() => {
        if (token.value.timer == 0) {
          token.value.sendLoading = false
          return clearInterval(interval)
        }

        token.value.timer--
      }, 1000)
    })
    .catch((errorSendToken) => {
      console.log({ errorSendToken })
    })
}


onMounted(() => {
  send()
})
</script>
