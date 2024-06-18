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

import { signatureGuide } from '@patient/repositories/schedule.repository';

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

const urls = computed(() => {
    return props.data.patient?.schedules.map(schedule => schedule.guide?.url).filter(v => v) ?? []
})

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

onMounted(() => {
    if (!urls.value.length) emit('to', 'Queues')
})

</script>