<template>
    <v-row justify="center">
        <v-col cols="12" class="overflow-auto">
            <p class="text-center text-body-1 text-secondary-1 mb-6">
                Por favor informe a sua identificação para encontrarmos seu cadastro
            </p>
        </v-col>

        <v-col cols="7">
            <v-form ref="form">
                <v-text-field @update:modelValue="validate" class="f-height-1" autofocus :rules="[required]" label="CPF"
                    v-mask="'###.###.###-##'" :disabled="loading" :loading="loading" v-model="identifier" number>
                </v-text-field>
            </v-form>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { required } from '@/rules';

interface Props {
    loading: boolean
}

const props = defineProps<Props>()

const identifier = ref('');

const emit = defineEmits(['search'])

function getCPF(value: string) {
    return value.replace(/[-.]/g, '');
}

function validate(value: string) {
    if (value?.length != 14) return

    emit('search', getCPF(value))
}

</script>