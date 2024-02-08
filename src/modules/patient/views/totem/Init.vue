<template>
    <div class="d-flex align-center justify-center fill-height">
        <v-row justify="center" no-gutters>
            <v-col cols="4" class="d-flex justify-center align-center">
                <v-img :src="state.logo" height="200"> </v-img>
            </v-col>

            <v-col cols="8">
                <p class="text-body-1 text-secondary-1 d-flex justify-center align-center mx-3 my-10">
                    {{ greeting }}, Inicie seu atendimento clicando no botão abaixo.
                </p>
                <v-btn color="primary" size="x-large" class="w-100" height="5em" @click="emit('next', null)">
                    <span :class="mobile ? 'text-h4' : 'text-h3'" class="font-weight-bold mb-2">Começar</span>
                </v-btn>
            </v-col>

        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { storeToRefs } from 'pinia'

import useSystemStore from '@/stores/system'

const { state } = storeToRefs<any>(useSystemStore())

const { mobile } = useDisplay();

const emit = defineEmits(['update:modelValue', 'next', 'update:loading']);

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