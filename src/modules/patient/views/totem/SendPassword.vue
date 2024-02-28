<template>
  <div class="pa-5 d-flex align-center justify-center fill-height">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">
          Como deseja obter as informações do seu atendimento?
        </h1>
        <v-divider thickness="3" length="80%" color="primary" class="my-4 d-flex ma-auto"></v-divider>
        <h2>Escolha uma das opções:</h2>
      </v-col>

      <v-col cols="12" class="my-5 pa-0">
        <OptionsButton :options="options" :loading="isLoading" @click="$event.action ? $event.action() : null"></OptionsButton>
      </v-col>

      <v-col cols="12">
        <p class="text-left text-success">
          <v-icon>mdi-leaf-circle</v-icon>
          Contribua para a sustentabilidade escolhendo o SMS, e assim estará
          ajudando o meio ambiente.
        </p>
      </v-col>
    </v-row>
    <ConfirmPhoneDialog @submit="generateSMS" v-model="phoneDialog" :msisid="phone"></ConfirmPhoneDialog>
  </div>
</template>

<script lang="ts" setup>
import ConfirmPhoneDialog from "@/modules/patient/components/ConfirmPhoneDialog.vue";
import OptionsButton from "@/modules/patient/components/OptionsButton.vue";
import { computed, onMounted, ref } from "vue";

import useAlertStore from '@/stores/alert';
import Msisid from "@/valueObjects/Msisid";

const { openAlert } = useAlertStore()

import { printQueue, sendSMSQueue } from '@patient/repositories/queue.repository';

const emit = defineEmits(['update:modelValue', 'next', 'to', 'start'])

const props = defineProps<{
  modelValue: Data;
  totem: Totem;
}>();

const phoneDialog = ref(false);
const isLoading = ref(false)
const msisid = new Msisid();
const phone = computed(() => {
  if (!data.value.patient) return ''

  const { nr_ddi_celular, nr_telefone_celular, nr_ddd_celular } = data.value.patient;

  if (nr_ddi_celular && nr_ddd_celular && nr_telefone_celular) {
    msisid.setPhone(nr_ddi_celular, nr_ddd_celular, nr_telefone_celular);
  }
  return msisid;
});

const data = computed({
  get() {
    return props.modelValue;
  },
  set() {
    emit('update:modelValue', data);
  },
})

const formattedPhone = computed(() => {
  if (!data.value.patient) return ''

  const { nr_telefone_celular, nr_ddd_celular } = data.value.patient;
  if (!nr_ddd_celular || !nr_telefone_celular) return '';

  const number = `${nr_telefone_celular.substr(0, 5)}-${nr_telefone_celular.substr(5, nr_telefone_celular.length)}`;
  return `(${nr_ddd_celular}) ${number}`;
});

const options = ref<ButtonOption[]>([
  {
    title: "SMS",
    id: 'sms',
    subtitle: formattedPhone,
    color: "success",
    action: () => (phoneDialog.value = true),
    show: true,
  },
  {
    title: "QR code",
    id: 'qrcode',
    color: "success",
    action: () => {
      console.log('qrcode');
    },
    show: false,
  },
  {
    title: "Imprimir",
    id: 'print',
    color: "primary",
    action: () => {
      print()
    },
    show: true,
  },
]);

function print() {
  isLoading.value = true

  printQueue(data.value.queue)
    .then(res => {
      data.value.content.send_type = 'print'
      emit('next')
    })
    .catch((error: any) => {
      console.log({ error })
      openAlert('Não foi possível imprimir a senha', error?.response?.data?.message)
    }).finally(() => {
      isLoading.value = false
    });
}

function generateSMS(number: string) {
  isLoading.value = true
  sendSMSQueue(number, data.value?.queue)
    .then(res => {
      data.value.content.send_type = 'sms'
      emit('next')
    })
    .catch((error: any) => {
      openAlert('Não foi possível enviar o SMS', error?.response?.data?.message)
    })
    .finally(() => {
      isLoading.value = false
    });
}

onMounted(() => {
  if (!data.value.patient?.cd_pessoa_fisica) print()
})
</script>
