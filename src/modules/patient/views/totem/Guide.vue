<template>
    <div class="fill-height position-relative">
        <p :class="title"> Guia de Serviço </p> <v-btn @click="show = !show">R</v-btn>

        <GuideCarousel v-if="show" class="fill-height" :urls="urls" />

        <v-btn block :disabled="isLoading" :loading="isLoading" size="x-large" height="3.5em" color="primary"
            style="position: absolute; bottom: 0.5em" @click="showSignatureHelp = true">
            Clique para assinar a guia do convênio
        </v-btn>
    </div>

    <HelpToSign v-model="showSignatureHelp" @end="signature" />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import GuideCarousel from '@patient/components/GuideCarousel.vue';

import HelpToSign from '@patient/components/HelpSignatureFlow.vue';

import useAlertStore from '@/stores/alert'
import useResponsive from '@patient/helpers/responsives';

import { signatureGuide } from '@patient/repositories/schedule.repository'

const { openAlert } = useAlertStore()
const { title } = useResponsive()

const props = defineProps<{
    modelValue: Data;
    totem: Totem
}>();

const urls = ref([
    'https://drive.google.com/file/d/1-K9QNOdOmcPNOSR1hfbxGCo04OkOERZ4/preview'
])

const isLoading = ref(false)
const showSignatureHelp = ref(false)
const show = ref(false);
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
        .then(() => {
            emit('next')
        })
        .catch(error => {
            showSignatureHelp.value = false

            openAlert('Falha na assinatura da guia', error.response.data.message)
        })
        .finally(() => {
            isLoading.value = false
        })
}

</script>
