<template>
    <v-row no-gutters justify="center" align-content="center" class="fill-height">
        <v-col cols="12" class="overflow-auto">
            <p class="text-center text-body-1 text-secondary-1 mb-6">
                <b>{{ data.patient.prim_nm_pessoa_fisica }}</b>, para a sua segurança insira a sua data de nascimento
            </p>
        </v-col>

        <v-col cols="7">
            <v-text-field v-mask="'##/##/####'" number class="f-height-1" autofocus :rules="[required]"
                label="Data de Nascimento" :disabled="isLoading" :loading="isLoading" v-model="data.birth"
                @update:model-value="validate">
            </v-text-field>
        </v-col>

    </v-row>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import useAlertStore from '@/stores/alert'

import { findByIdentifier, validPatientByBirth } from '@patient/repositories/patient.repository'

const isLoading = ref(false)
const form = ref<HTMLFormElement>()

const { alert } = storeToRefs<any>(useAlertStore())

interface Props {
    modelValue: any;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'next', 'to', 'start']);

const data: any = computed({
    get() {
        return props.modelValue;
    },
    set() {
        emit('update:modelValue', data);
    },
});

function required(v: any) {
    return !!v || 'Campo obrigatório'
}

async function validate(value: string) {
    if (value?.length != 10) return


    isLoading.value = true

    validPatientByBirth(data.value.patient.cd_pessoa_fisica, value)
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