<template>
    <div class="d-flex align-center justify-center fill-height">
        <v-row>
            <v-col cols="12" class="text-center">
                <h1 class="text-h2 font-weight-bold">
                    {{ data.password.ds_senha }}
                </h1>

                <p :class="title">
                    {{ phrase }}
                </p>

                <p :class="subtitle">

                    Acompanhe sua senha, você será chamado(a) em breve.
                </p>
            </v-col>

            <v-col class="text-body-1">
                <Timer :timer="defaultTimer" @timer-end="emit('to', 'Init')" />
                <p class="text-h4 text-success text-center" v-if="data.password_send_type == 'sms'">
                    <v-icon>mdi-leaf-circle</v-icon>
                    Parabéns pela iniciativa!
                </p>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import Timer from '@patient/components/Timer.vue'
import useResponsive from '../../helpers/responsives';

const { title, subtitle } = useResponsive()

const props = defineProps<{
    modelValue: Data;
    totem: Totem
}>();

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

const phrase = computed(() => {
    switch (data.value.password_send_type) {
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
