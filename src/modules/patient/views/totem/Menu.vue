<template>
    <div class="d-flex align-center fill">
        <v-row justify="center" no-gutters>
            <v-col cols="12" class="d-flex justify-center">
                <div>
                    <v-img :src="state.logo" width="150"> </v-img>
                </div>
            </v-col>

            <v-col cols="12" class="">
                <p class="text-body-1 text-secondary-1 d-flex justify-center mx-3 my-10">
                    Selecione uma das opções abaixo.
                </p>
            </v-col>

            <v-col cols="4" class="mr-2 mt-2 d-flex justify-center" v-for="(button, index) in buttons" :key="index"
                style="min-height: 140px">
                <v-sheet color="primary" v-ripple
                    class="text-center rounded d-flex justify-center align-center cursor-pointer"
                    @click="emit('next', null)" width="100%">
                    <div>
                        <p class="font-weight-bold responsive-fonts">{{ button.title }}</p>
                        <v-icon :icon="button.icon" size="60" />
                    </div>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import useAlertStore from '@/stores/alert'
import useSystemStore from '@/stores/system'

const isLoading = ref(false)
const form = ref<HTMLFormElement>()

const { state } = storeToRefs(useSystemStore())
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

const buttons = [
    {
        title: 'Agendamento de Exame',
        icon: 'mdi-file',
        color: 'primary',
        action: 'next',
        to: 'identifier',
    },
    {
        title: 'Agendamento de Consulta',
        icon: 'mdi-calendar-check',
        color: 'error',
        action: 'start',
        to: 'init',
    },
    {
        title: 'Laboratório',
        icon: 'mdi-beaker',
        color: 'error',
        action: 'start',
        to: 'init',
    },
    {
        title: 'Pronto Atendimetno',
        icon: 'mdi-medical-bag',
        color: 'error',
        action: 'start',
        to: 'init',
    }
]
</script>

<style scoped lang="scss">
.responsive-fonts {
    font-size: clamp(1rem, 2vw, 3rem) !important;
}

.cursor-pointer {
    cursor: pointer;
}
</style>