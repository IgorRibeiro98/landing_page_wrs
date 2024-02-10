<template>
    <v-dialog v-model="alert.display" width="auto">
        <v-card>
            <v-card-title :class="title" class="font-weight-bold">
                {{ alert.title }}
            </v-card-title>

            <v-card-text v-html="alert.text" :class="subtitle">
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
                <v-btn @click="close" variant="tonal" :size="btnSize" block color="primary">
                    Fechar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import useAlertStore from '@/stores/alert';
import useResponsive from '@patient/helpers/responsives';

const { alert } = storeToRefs(useAlertStore());
const { title, subtitle, btnSize } = useResponsive()

function close() {
    alert.value.display = false;
}
</script>