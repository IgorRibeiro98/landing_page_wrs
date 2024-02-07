<template>
    <v-container fluid class="d-flex align-center justify-center">
        <v-row>
            <v-col cols="12">
                <p class="text-body-1 text-center">
                    Seu atendimento foi aberto com sucesso!
                </p>
            </v-col>

            <v-col class="text-body-1">
                <Timer :timer="defaultTimer" @timer-end="emit('to', 'Init')" />

                <p class="mt-5">
                    Retire o Ticket impresso contendo as informações do atendimento.
                </p> <br />

                <p clas="mb-5">
                    <b>Atenção</b>, siga atentamente as instruções abaixo: <br />
                </p>

                <ul class="no-bullets">
                    <li>1. Dirija-se à sua consulta no <b>Térreo Sala 02</b></li>
                    <li>2. Procure um atendente para retirar a etiqueta de identifição</li>
                </ul>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import Timer from '@patient/components/Timer.vue'

const props = defineProps<{
    modelValue: any;
    totem: any
}>();

const defaultTimer = ref(20)

const isLoading = ref(false)

const emit = defineEmits(['update:modelValue', 'next', 'to', 'start'])

const data = computed({
    get() {
        return props.modelValue
    },
    set() {
        emit('update:modelValue', data)
    }
})

</script>
