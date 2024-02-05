<template>
    <v-row no-gutters justify="center" align-content="center" class="fill-height">
        <v-col cols="12" v-if="!chosenIdentificationMethod">
            <p class="text-center text-body-1 text-secondary-1 mb-6">
                Escolha como deseja se identificar
            </p>
        </v-col>

        <v-col cols="4" class="mr-8">
            <v-btn @click="setIdentification('cpf')" block height="4em"
                :color="identificationMethod == 'cpf' ? 'primary' : 'secondary-1'">
                <h2> CPF </h2>
            </v-btn>
        </v-col>

        <v-col cols="4">
            <v-btn @click="setIdentification('passport')" block height="4em"
                :color="identificationMethod == 'passport' ? 'primary' : 'secondary-1'">
                <h2 class="ml-4"> Passaporte / RNE </h2>
            </v-btn>
        </v-col>

        <v-col cols="12" class="mt-10" v-if="chosenIdentificationMethod">
            <Transition name="fade" mode="out-in">
                <component :is="identifierComponent" v-model="data.identifier" :loading="isLoading" @search="searchPatient">
                </component>
            </Transition>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import CPFIdentifier from '@patient/components/CPFIdentifier.vue'
import PassportIdentifier from '@patient/components/PassportIdentifier.vue'

import useAlertStore from '@/stores/alert'

import { findByIdentifier } from '@patient/repositories/patient.repository'

const identifierComponent = computed(() => {
    if (identificationMethod.value == 'cpf') {
        return CPFIdentifier
    } else if (identificationMethod.value == 'passport') {
        return PassportIdentifier
    }
})

const isLoading = ref(false)

const { alert } = storeToRefs<any>(useAlertStore())

interface Props {
    modelValue: any;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'next', 'to', 'start']);

const chosenIdentificationMethod = ref(false)
const identificationMethod = ref<string | null>(null)

const data: any = computed({
    get() {
        return props.modelValue;
    },
    set() {
        emit('update:modelValue', data);
    },
});

function setIdentification(value: string) {
    identificationMethod.value = value
    chosenIdentificationMethod.value = true

}

function searchPatient(identifier: string) {
    isLoading.value = true

    findByIdentifier(identifier)
        .then((res: any) => {
            data.value.patient = Object.assign(data.value.patient, res.data)
            emit('next', null)
        })
        .catch(err => {
            alert.value = {
                display: true,
                title: 'Falha na validação',
                text: err.response.data.message
            }
            emit('to', 'Menu')
        })
        .finally(() => {
            isLoading.value = false
        })
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