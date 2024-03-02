<template>
    <v-dialog v-model="alert.display" width="auto">
        <v-card :loading="loading">
            <v-card-title class="d-flex align-center pa-4 pb-0">
                <span style="font-size: clamp(1rem, 1rem + 0.3125vw, 2.125rem) !important;">
                    {{ alert.title }}
                </span>
                <v-spacer></v-spacer>

                <v-btn icon="mdi-close" variant="plain" @click="close()"></v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text v-html="alert.text" style="font-size: clamp(1rem, 1rem + 0.3125vw, 2.125rem) !important;">
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
                <div v-if="alert.options.type == 'confirm'">
                    <v-btn @click="close" variant="tonal" class="px-16" :disabled="loading">
                        Não
                    </v-btn>

                    <v-btn @click="confirm" variant="tonal" color="primary" class="px-16" :disabled="loading">
                        Sim
                    </v-btn>
                </div>

                <v-btn v-else @click="close" variant="tonal" block color="primary">
                    Fechar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import useAlertStore from '@/stores/alert';

const { alert } = storeToRefs(useAlertStore());

const loading = ref(false)

function close() {
    alert.value.display = false;
}

function confirm() {
    alert.value.options.callback(loading)
}
</script>