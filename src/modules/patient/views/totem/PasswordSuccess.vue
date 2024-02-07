<template>
    <v-container fluid class="d-flex align-center justify-center">
        <v-row>
            <v-col cols="12" class="text-center">
                <h1 class="text-h2 font-weight-bold">
                    {{ data.queue.ds_senha }}
                </h1>

                <p class="text-body-1 mt-4">
                    {{ phrase }}
                </p>

                <p class="text-h4 text-success" v-if="data.queue.send_type == 'sms'">
                    <v-icon>mdi-leaf-circle</v-icon>
                    Parabéns pela iniciativa!
                </p>
            </v-col>

            <v-col class="text-body-1">
                <Timer :timer="defaultTimer" @timer-end="emit('to', 'Init')" />

                <p class="mt-5">
                    Acompanhe sua senha, você será chamado(a) em breve.
                </p>
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

const phrase = computed(() => {
    switch (data.value.queue.send_type) {
        case 'sms':
            return 'Senha enviada via SMS!'
        case 'email':
            return 'Senha enviada via e-mail!'
        case 'print':
            return 'Retire a impressão abaixo'
        default:
            return ''
    }
})

</script>
