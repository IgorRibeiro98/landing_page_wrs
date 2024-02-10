<template>
  <v-dialog width="100%" v-model="dialog">
    <v-card class="pa-8 ma-auto" width="80%">
      <v-card-text>
        <h2 class="text-center" :class="title">Confira seu número abaixo</h2>


        <v-divider thickness="3" length="90%" color="primary" class="mt-4 mb-8 d-flex ma-auto"></v-divider>
        <v-text-field class="f-height-1" :prefix="countryCode" number="true" v-mask="'(##) #####-####'" keyboard="phone"
          label="Celular" v-model="phoneNumber"></v-text-field>

        <p :class="subtitle">
          Se necessário altere o número de celular, caso contrário clique em <b>enviar</b>.
        </p>
      </v-card-text>


      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-btn block variant="tonal" color="primary" class="pa-8 text-h5" @click="send">Enviar</v-btn>
          </v-col>
          <v-col cols="12">
            <p :class="subtitle" class="text-center text-success">
              <v-icon>mdi-leaf-circle</v-icon>
              Parabéns pela iniciativa!
            </p>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <VirtualKeyboard target="phone" class="bottom-container mt-4" />
  </v-dialog>
</template>
<script lang="ts" setup>
import VirtualKeyboard from '@/components/VirtualKeyboard.vue'

import { computed, ref, watch, onMounted } from 'vue';
import useResponsive from '../helpers/responsives'

const { title, subtitle } = useResponsive()

const props = defineProps<{
  modelValue: boolean;
  msisid: any
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "submit", value: string): void;
}>();
const disabled = ref(true);

const phoneNumber = ref('');
const countryCode = ref('');

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function send() {
  dialog.value = false;
  emit('submit', `${props.msisid.getCC()} ${phoneNumber.value}`);
}

function setPhoneNumber() {
  countryCode.value = props.msisid.getCC();
  phoneNumber.value = `${props.msisid.getNDC()} ${props.msisid.getSN()}`;
}
onMounted(() => {
  setPhoneNumber()
})

watch(() => props.modelValue, (value: boolean) => {
  if (value) {
    setPhoneNumber();
  }
});
</script>
<style lang="scss" scoped></style>
