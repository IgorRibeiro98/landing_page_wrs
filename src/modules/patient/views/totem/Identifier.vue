<template>
  <div class="fill-height d-flex align-center justify-center">
    <v-row justify="center">
      <v-col cols="12" v-if="!chosenIdentificationMethod">
        <h1 class="text-center">Escolha como deseja se identificar</h1>
      </v-col>

      <v-col cols="12" md="4">
        <v-btn class="pa-1" @click="setIdentification('cpf')" block rounded="0" variant="tonal"
          :color="identificationMethod == 'cpf' ? 'primary' : 'secondary'">
          CPF
        </v-btn>
      </v-col>

      <v-col cols="12" md="4">
        <v-btn class="pa-1" @click="setIdentification('passport')" block rounded="0" variant="tonal"
          :color="identificationMethod == 'passport' ? 'primary' : 'secondary'">
          Passaporte / RNE
        </v-btn>
      </v-col>

      <v-col cols="12" class="mt-10" v-if="chosenIdentificationMethod">
        <Transition name="fade" mode="out-in">
          <component :is="identifierComponent" v-model="data.identifier.generic_id" :loading="isLoading"
            @search="searchPatient">
          </component>
        </Transition>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

import CPFIdentifier from "@patient/components/CPFIdentifier.vue";
import PassportIdentifier from "@patient/components/PassportIdentifier.vue";

import useAlertStore from "@/stores/alert";

import { findByIdentifier } from "@patient/repositories/patient.repository";

interface Props {
  modelValue: Data;
}

const isLoading = ref(false);

const { openAlert } = useAlertStore();

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", 'update:loading', "next", "to", "start"]);

const chosenIdentificationMethod = ref(false);
const identificationMethod = ref<string | null>(null);

const identifierComponent = computed(() => {
  if (identificationMethod.value == "cpf") {
    return CPFIdentifier;
  } else if (identificationMethod.value == "passport") {
    return PassportIdentifier;
  }
});

const data: any = computed({
  get() {
    return props.modelValue;
  },
  set() {
    emit("update:modelValue", data);
  },
});

function setIdentification(value: string) {
  identificationMethod.value = value;
  chosenIdentificationMethod.value = true;
}

function searchPatient(identifier: string) {
  isLoading.value = true;

  emit('update:loading', {
    display: true,
    title: 'Aguarde um momento',
    text: 'Estamos buscando seu cadastro'
  })

  findByIdentifier(identifier)
    .then((res) => {
      data.value.identifier = { ...res.data };
      emit("next", null);
    })
    .catch((err) => {
      openAlert("Cadastro não localizado", err.response.data.message);
      emit("to", "Menu");
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
