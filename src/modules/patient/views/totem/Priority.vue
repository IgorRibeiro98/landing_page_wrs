<template>
    <div class="d-flex align-center justify-center fill-height">
        <v-row>
            <v-col cols="12">
                <p class="text-body-1 text-secondary-1">
                    Selecione uma das opções abaixo e aguarde a recepção chamá-lo (a)
                </p>
            </v-col>

            <v-col cols="6" v-for="(priority, index) in priorities" :key="index">
                <v-btn height="8em" rounded="0" block color="primary" :variant="priority.variant" v-if="priority.show()"
                    @click="generatePass(priority)" :disabled="isLoading">
                    <div>
                        <h2 class="text-h4">
                            {{ priority.title }}
                        </h2>

                        <div>
                            <v-icon v-for="(icon, index) in priority.icons" :key="index" :icon="icon" size="45" class="mx-2"
                                color="secondary">
                            </v-icon>
                        </div>
                    </div>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { pushQueue } from '@patient/repositories/queue.repository'

import useAlertStore from '@/stores/alert'

const { alert } = storeToRefs<any>(useAlertStore())

const props = defineProps<{
    modelValue: any;
    totem: any
}>();

interface PriorityBtn {
    title: string;
    type: 'regular' | 'priority';
    key: string;
    variant: any;
    icons: string[]
    show(): boolean
}

const isLoading = ref(false)
const priorities = ref<PriorityBtn[]>([
    {
        title: 'Comum',
        type: 'regular',
        variant: 'flat',
        key: 'nr_seq_fila_comum',
        icons: [],
        show() {
            return true
        }
    },
    {
        title: 'Preferencial',
        type: 'priority',
        variant: 'outlined',
        key: 'nr_seq_fila_preferencial',
        icons: [
            'mdi-human-cane',
            'mdi-human-wheelchair',
            'mdi-human-pregnant',
        ],
        show() {
            return true
        }
    },
    {
        title: 'Preferencial +80',
        type: 'priority',
        variant: 'flat',
        key: 'nr_seq_fila_preferencial_80',
        icons: [],
        show() {
            if (data.value.patient.dt_nascimento) {
                const birth = new Date(data.value.patient.dt_nascimento)
                const today = new Date()
                const age = today.getFullYear() - birth.getFullYear()
                return age >= 80
            }
            return true
        }
    },
])

const emit = defineEmits(['update:modelValue', 'next', 'to', 'start'])

const data = computed({
    get() {
        return props.modelValue
    },
    set() {
        emit('update:modelValue', data)
    }
})


function generatePass({ type, key }: PriorityBtn) {

    const body = {
        nr_seq_fila: data.value.queue[key],
        tipo_senha: type,
        cd_estabelecimento: props.totem.site.cd_estabelecimento,
        cd_pessoa_fisica: data.value.patient.cd_pessoa_fisica
    }

    isLoading.value = true

    pushQueue(body)
        .then((res: any) => {
            data.value.queue = Object.assign(data.value.queue, res.data)
            emit('next')
        })
        .catch((error) => {
            console.log('err')

            alert.value = {
                title: '',
                text: error.response?.data?.message,
                display: true
            }
            emit('next')
        })
        .finally(() => {
            isLoading.value = false
        })
}

</script>