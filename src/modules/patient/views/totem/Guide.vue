<template>
    <div class="fill-height">
        <p class="text-body-1 text-secondary-1">
            Guia de Serviço
        </p>

        <div class="fill-height mt-8 ">
            <GuideCarousel :urls="urls" />
        </div>

        <div>
            <v-btn block :disabled="isLoading" :loading="isLoading" size="x-large" height="3.5em" color="primary"
                style="position: absolute; bottom: 2em" @click="showSignatureHelp = true">
                Clique para assinar a guia do convênio
            </v-btn>
        </div>
    </div>

    <HelpToSign v-model="showSignatureHelp" @end="signature" />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import GuideCarousel from '@patient/components/GuideCarousel.vue';

import HelpToSign from '@patient/components/HelpSignatureFlow.vue';

import useAlertStore from '@/stores/alert'

import { signatureGuide } from '@patient/repositories/schedule.repository'

const { alert } = storeToRefs<any>(useAlertStore())

const props = defineProps<{
    modelValue: any;
    totem: any
}>();


interface PriorityBtn {
    title: string;
    type: 'regular' | 'priority';
    key: string;
    variant: any;
    icons: string[]
}

const urls = ref([
    'https://drive.google.com/file/d/1-K9QNOdOmcPNOSR1hfbxGCo04OkOERZ4/preview'
])

const isLoading = ref(false)
const showSignatureHelp = ref(false)

const emit = defineEmits(['update:modelValue', 'next', 'to', 'start'])

const data = computed({
    get() {
        return props.modelValue
    },
    set() {
        emit('update:modelValue', data)
    }
})

function signature() {
    isLoading.value = true

    signatureGuide()
        .then(res => {
            emit('next')
        })
        .catch(error => {
            showSignatureHelp.value = false

            alert.value = {
                display: true,
                title: 'Falha na assinatura da guia',
                text: error.response.data.message,
            }
        })
        .finally(() => {
            isLoading.value = false
        })
}

</script>