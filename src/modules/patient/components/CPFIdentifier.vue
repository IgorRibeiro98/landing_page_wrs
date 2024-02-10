<template>
    <v-row justify="center" dense no-gutters class="fill-height">
        <v-col cols="12">
            <p :class="subtitle" class="text-center">
                Por favor informe a sua identificação para encontrarmos seu cadastro
            </p>
        </v-col>

        <v-col cols="7">
            <v-form ref="form">
                <v-text-field @update:modelValue="validate" class="f-height-1 required" autofocus :rules="[required]" label="CPF"
                    v-mask="'###.###.###-##'" :disabled="loading" :loading="loading" v-model="identifier" number>
                </v-text-field>
            </v-form>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { required } from '@/rules';
import useResponsive from '@patient/helpers/responsives';

const { subtitle } = useResponsive()

defineProps<{
    loading: boolean
    modelValue: string
}>()

const emit = defineEmits(['search', 'update:modelValue'])

const identifier = ref('')
const form = ref();

function getCPF(value: string) {
    return value.replace(/[-.]/g, '');
}

function validate(value: string) {
    if (value?.length != 14) return

    emit('search', getCPF(value))
}

</script>
