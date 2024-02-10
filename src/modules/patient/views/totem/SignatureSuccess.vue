<template>
    <div class="d-flex align-center justify-center fill-height">
        <v-row>
            <v-col cols="12">
                <p :class="title" class="text-center">
                    Seu atendimento foi aberto com sucesso!
                </p>
            </v-col>

            <v-col :class="subtitle">
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
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import Timer from '@patient/components/Timer.vue'
import useResponsive from '@patient/helpers/responsives';

const props = defineProps<{
    modelValue: Data;
    totem: Totem
}>();

const { title, subtitle } = useResponsive()
const defaultTimer = ref(20)

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
