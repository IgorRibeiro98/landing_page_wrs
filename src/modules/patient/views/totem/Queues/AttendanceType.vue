<template>
 <div>
  <v-row>
    <v-col cols="12">
      <h1 class="text-center">
        Escolha seu tipo de prioridade:
      </h1>
    </v-col>

    <v-col cols="12" md="4" v-for="(type, index) in data.queue!.attendance_types as AttendanceTypeInternalItem[]"
      :key="index">

      <v-sheet @click="print(type)" v-ripple color="transparent" style="cursor: pointer; white-space: normal;"
        border="sm" rounded class="pa-6 d-flex align-center" link :height="$vuetify.display.mdAndUp ? '300' : 'auto'">
        <div>
          <div class="mr-2">
            <v-img :src="type.data!.icon" width="64" height="64"> </v-img>
          </div>
          <h2 class="font-weight-bold">
            {{ type.data!.name }}
          </h2>

          <p>
            {{ type.data!.description }}
          </p>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
 </div>
</template>

<script setup lang="ts">
import { AlertProps, LoadingProps } from '@/modules/patient/types';
import { computed } from 'vue';

import { createTicket } from '@/modules/patient/repositories/provider-queue.repository';

interface Emit {
  (event: "alert", options: AlertProps): void;
  (event: "next"): void;
  (event: "cancel"): void;
  (event: "alert", payload: AlertProps): void;
  (event: "loading", payload: LoadingProps): void;
  (event: "update:data", value: any): void;
}

interface AttendanceTypeInternalItem extends AttendanceType {
  loading: boolean;
}

const props = defineProps<{
  totem: Totem
  data: Data
}>()

const emit = defineEmits<Emit>()

const data = computed({
  get: () => props.data,
  set: (value: Data) => emit('update:data', value)
})

async function print(type: AttendanceTypeInternalItem) {
  const payload = {
    queue_id: type.integration_id,
    patient_id: data.value.patient?.id ?? null,
    establishment_id: props.totem.site_id,
    preferential: false
  }

  emit('loading', {
    text: 'Gerando senha',
    async callback(loading) {

      createTicket(payload)
        .then(({data: ticket}) => { 
          data.value.ticket = ticket

          loading.value = false
          emit('next')
        })
        .catch(title => {
          loading.value = false
          emit('alert', {
            title, text: 'Fale com a recepção para prosseguir com o seu atendimento',
            action: {
              type: 'confirm',
              label: 'Ok, entendi',
              callback() {
                emit('cancel')
              }
            },
          })
        })
    }
  })
}
</script>

<style scoped>
.disabled {
  pointer-events: none;
}
</style>
