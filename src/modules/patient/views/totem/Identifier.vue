<template>
    <div class="fill-height d-flex align-center justify-center">
        <v-row justify="center">
            <v-col cols="12" v-if="!chosenIdentificationMethod">
                <p :class="title" class="text-center">
                    Escolha como deseja se identificar
                </p>
            </v-col>

            <v-col cols="12" md="4">
                <v-btn @click="setIdentification('cpf')" block :size="btnSize"
                    :color="identificationMethod == 'cpf' ? 'primary' : 'secondary'">
                    <h2> CPF </h2>
                </v-btn>
            </v-col>

            <v-col cols="12" md="4">
                <v-btn @click="setIdentification('passport')" block :size="btnSize"
                    :color="identificationMethod == 'passport' ? 'primary' : 'secondary'">
                    <h2 class="ml-4"> Passaporte / RNE </h2>
                </v-btn>
            </v-col>

            <v-col cols="12" class="mt-10" v-if="chosenIdentificationMethod">
                <Transition name="fade" mode="out-in">
                    <component :is="identifierComponent" v-model="data.identifier" :loading="isLoading"
                        @search="searchPatient">
                    </component>
                </Transition>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import useResponsive from '@patient/helpers/responsives'

import CPFIdentifier from '@patient/components/CPFIdentifier.vue'
import PassportIdentifier from '@patient/components/PassportIdentifier.vue'

import useAlertStore from '@/stores/alert'

import { findByIdentifier } from '@patient/repositories/patient.repository'

const { btnSize, title } = useResponsive()

const identifierComponent = computed(() => {
    if (identificationMethod.value == 'cpf') {
        return CPFIdentifier
    } else if (identificationMethod.value == 'passport') {
        return PassportIdentifier
    }
})

const isLoading = ref(false)

const { openAlert } = useAlertStore()

interface Props {
    modelValue: Data;
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
            openAlert('Cadastro não localizado', err.response.data.message)
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