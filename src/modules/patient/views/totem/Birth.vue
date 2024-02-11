<template>
    <v-row justify="center" align-content="center" class="fill-height">
        <v-col cols="12" class="overflow-auto">
            <h1 class="text-center">
                <b>{{ data.patient.prim_nm_pessoa_fisica }}</b>, para a sua segurança insira a sua data de nascimento
            </h1>
        </v-col>

        <v-col cols="7">
            <v-text-field v-mask="'##/##/####'" number class="required" autofocus :rules="[required]"
                label="Data de Nascimento" :disabled="isLoading" :loading="isLoading" v-model="data.birth"
                @update:model-value="validate">
            </v-text-field>
        </v-col>

    </v-row>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import useAlertStore from '@/stores/alert'

import { validPatientByBirth } from '@patient/repositories/patient.repository'
import useResponsive from '@patient/helpers/responsives'

const isLoading = ref(false)

const { title } = useResponsive()

const { openAlert } = useAlertStore()

interface Props {
    modelValue: Data;
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
        .catch(error => {
            openAlert('Não foi possível prosseguir', error.response.data.message)
            emit('to', 'Menu')
        })
        .finally(() => {
            isLoading.value = false
        })
}

</script>
