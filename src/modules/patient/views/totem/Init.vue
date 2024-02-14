<template>
    <div class="d-flex align-center justify-center fill-height">
        <v-row justify="center" no-gutters>
            <v-col cols="4" class="d-flex justify-center align-center" v-if="!mobile">
                <v-img :src="state.logo" height="200" width="200"> </v-img>
            </v-col>

            <v-col cols="8" class="d-flex align-center justify-center flex-column">
                <div>
                    <h1>
                        {{ greeting }}, Inicie seu atendimento clicando no botão abaixo.
                    </h1>
                    <v-btn class="pa-1" @click="emit('next', null)" block rounded="0" variant="tonal" color="primary">
                        Começar
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia'

import useSystemStore from '@/stores/system'
import useResponsive from '@patient/helpers/responsives';

const { state } = storeToRefs(useSystemStore())
const { mobile } = useResponsive()

const emit = defineEmits(['update:modelValue', 'next']);

const greeting = computed(() => {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 12) {
        return 'Bom dia';
    } else if (hour >= 12 && hour < 18) {
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
});
</script>
