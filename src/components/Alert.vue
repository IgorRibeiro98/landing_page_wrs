<template>
    <v-dialog v-model="alert.display" width="800">
        <v-card>
            <v-card-title class="d-flex font-weight-bold text-secondary">
                {{ alert.title }}
                <v-spacer />
            </v-card-title>

            <v-card-text v-html="alert.text" class="text-secondary">
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
                <v-btn @click="close" variant="tonal" block color="primary">
                    Fechar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import useAlertStore from '@/stores/alert';

const { alert } = storeToRefs<any>(useAlertStore());

function close() {
    alert.value.display = false;
}
</script>