<template>
  <v-container fluid class="pa-5 d-flex align-center justify-center">
    <v-row>
      <v-col cols="12">
        <p class="text-h2 text-secondary-1 text-center">
          Como deseja obter as informações do seu atendimento?
        </p>
        <v-divider thickness="3" length="80%" color="primary" class="my-4 d-flex ma-auto"></v-divider>
        <p class="text-h4">Escolha uma das opções:</p>
      </v-col>

      <v-col cols="12" class="my-5 pa-0">
        <OptionsButton :options="options" @click="$event.action()"></OptionsButton>
      </v-col>
      <v-col cols="12">
        <p class="text-h4 text-left text-success">
          <v-icon>mdi-leaf-circle</v-icon>
          Contribua para a sustentabilidade escolhendo o QRcode, e assim estará
          ajudando o meio ambiente.
        </p>
      </v-col>
    </v-row>
    <ConfirmPhoneDialog @submit="generateSMS" v-model="phoneDialog" :msisid="phone"></ConfirmPhoneDialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import OptionsButton from "@/modules/patient/components/OptionsButton.vue";
import ConfirmPhoneDialog from "@/modules/patient/components/ConfirmPhoneDialog.vue";
import Msisid from '@/valueObjects/Msisid'

const props = defineProps<{
  modelValue: any;
  totem: any;
}>();

const phoneDialog = ref(false);
const msisid = new Msisid();
const phone = computed(() => {
  const { nr_ddi_celular, nr_telefone_celular, nr_ddd_celular } = data.value.patient;

  if(nr_ddi_celular && nr_ddd_celular && nr_telefone_celular) {
    msisid.setPhone(nr_ddi_celular, nr_ddd_celular, nr_telefone_celular);
  }
  return msisid;
});

const data = computed(() => props.modelValue);

const formattedPhone = computed(() => {
  const { nr_telefone_celular, nr_ddd_celular } = data.value.patient;
  if(!nr_ddd_celular || !nr_telefone_celular) return '';

  const number = `${nr_telefone_celular.substr(0,5)}-${nr_telefone_celular.substr(5, nr_telefone_celular.length)}`;
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
    color: "secondary",
    action: () => {
      console.log('print');
    },
    show: true,
  },
]);

function generateSMS(number: string) {
  console.log(number);
}
</script>
