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
                    Olá! Para começar clique no botão abaixo
                </p>
            </v-col>

            <v-col cols="8" class="mr-4">
                <v-btn color="primary" rounded size="x-large" class="w-100" height="7em" @click="emit('next', null)">
                    <span :class="mobile ? 'text-h5' : 'text-h3'" class="font-weight-bold mb-2">Iniciar atendimento</span>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import { storeToRefs } from 'pinia'

import useSystemStore from '@/stores/system'

const { state } = storeToRefs(useSystemStore())

const { mobile } = useDisplay();

const emit = defineEmits(['update:modelValue', 'next']);

</script>