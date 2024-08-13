<template>
    <h1 class="mb-4 text-center">Compartilhe sua experiência conosco</h1>

    <p class="mb-4">
      <b>{{ data?.patient?.first_name }}</b>
      sua opinião é importante para nós. Por favor, compartilhe como foi sua experiência no totem.
    </p>

    <div>
        <v-row justify="center">
            <v-col v-for="emoticon in emoticons" cols="6" sm="6" md="4" lg="2">
                <v-sheet @click="$emit('next')" v-ripple :color="emoticon.color" rounded height="120" width="100%" class="d-flex flex-column align-center justify-center">
                    <v-icon :icon="emoticon.icon" size="50">
                    </v-icon>
                    <span class="text-center">{{ emoticon.value }}</span>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { AlertProps, Data, LoadingProps } from "@patient/types";

interface Emit {
(event: "alert", options: AlertProps): void;
(event: 'loading', options: LoadingProps): void;
(event: "next"): void;
(event: "to", value: string): void;
(event: "update:data", value: any): void;
}

const props = defineProps<{
    data: Data
}>()

const emoticons = ref([
    { value: 'Ruim', icon: 'mdi-emoticon-sad-outline', color:'#ae252d' },
    { value: 'Não muito bom', icon: 'mdi-emoticon-confused-outline', color: '#d56c2b'},
    { value: 'Bom', icon: 'mdi-emoticon-neutral-outline', color: '#f0c430' },
    { value: 'Muito bom', icon: 'mdi-emoticon-happy-outline', color: '#6eb454' },
    { value: 'Excelente', icon: 'mdi-emoticon-excited-outline', color: '#3aa257' },
])

</script>
