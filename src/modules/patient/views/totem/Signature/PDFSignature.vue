<template>
    <div class="fill-height">
        <GuideCarousel :urls="urls">
            <template #append>

            </template>
        </GuideCarousel>

        <v-btn block :disabled="isLoading" :loading="isLoading" size="x-large" color="primary"
            @click="showSignatureHelp = true">
            Clique para assinar a guia do convênio
        </v-btn>

        <HelpToSign v-model="showSignatureHelp" @end="signature" />
    </div>
</template>
<script lang="ts" setup>
import GuideCarousel from "@/modules/patient/components/GuideCarousel.vue";
import { AlertProps, Data, LoadingProps } from "@patient/types";
import { computed, onMounted, ref } from "vue";

import HelpToSign from '@patient/components/HelpSignatureFlow.vue';

import { getGuidesBySchedules, signatureGuide } from '@patient/repositories/schedule.repository';

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

const isLoading = ref(false)
const showSignatureHelp = ref(false)

const urls = ref<string[]>([])

function signature() {
    isLoading.value = true
    signatureGuide()
        .then(res => {
            emit('next')
        })
        .catch(error => {
            showSignatureHelp.value = false
            emit('alert', error);
        })
        .finally(() => {
            isLoading.value = false
        })
}

const scheduleIds = computed(() => {
  return props.data.patient?.schedules?.appointment.map(schedule => schedule.schedule_sequence) ?? []
})

function loadGuides() {
    emit('loading', {
        text: 'Aguarde um momento, estamos caregando as suas guias',
        callback(loading) {
          getGuidesBySchedules(scheduleIds.value)
            .then(res => {
              urls.value = res.data
            })
            .catch(error => {
              emit('alert', {
                title: error,
                text: 'Não se preocupe, vamos te encaminhar para a recepção =D',
                action: {
                  type: 'confirm',
                  label: 'Ok',
                  callback() {
                    emit('to', 'Queues')
                  }
                }
              })
            })
            .finally(() => (loading.value = false))
        }
    })
}

onMounted(() => {
    loadGuides()
})

</script>
