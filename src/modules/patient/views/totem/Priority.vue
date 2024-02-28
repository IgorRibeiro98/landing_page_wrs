<template>
    <div class="d-flex align-center justify-center fill-height">
        <v-row>
            <v-col cols="12">
                <h1>
                    Selecione uma das opções abaixo e aguarde a recepção chamá-lo (a)
                </h1>
            </v-col>
            <v-col cols="12">
              <OptionsButton @click="generatePass" :options="prioritiesOptions"></OptionsButton>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import useAlertStore from '@/stores/alert'
import OptionsButton from '@patient/components/OptionsButton.vue'
import useResponsive from '@patient/helpers/responsives'
import { pushQueue } from '@patient/repositories/queue.repository'
import { computed, ref } from 'vue'

const { openAlert } = useAlertStore()
const { title } = useResponsive()

const props = defineProps<{
    modelValue: Data;
    totem: Totem
}>();

interface PriorityBtn {
    title: string;
    type: 'regular' | 'priority';
    key: string;
    variant: any;
    color: string
    icons: string[]
    show(): boolean
}

const isLoading = ref(false)
const priorities = ref<PriorityBtn[]>([
    {
        title: 'Comum',
        type: 'regular',
        variant: 'flat',
        color: 'primary',
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
        color: 'secondary',
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
        color: 'secondary',
        key: 'nr_seq_fila_preferencial_80',
        icons: [],
        show() {
            if (data.value.patient?.dt_nascimento) {
                const birth = new Date(data.value.patient.dt_nascimento)
                const today = new Date()
                const age = today.getFullYear() - birth.getFullYear()
                return age >= 80
            }
            return true
        }
    },
])

const prioritiesOptions = computed<ButtonOption[]>(() => {
    return priorities.value.map((priority) => {
        return {
            title: priority.title,
            id: priority.key,
            color: priority.color,
            icons: priority.icons,
            show: priority.show(),
            type: priority.type,
        };
    });
});

const emit = defineEmits(['update:modelValue', 'next', 'to', 'start'])

const data = computed({
    get() {
        return props.modelValue
    },
    set() {
        emit('update:modelValue', data)
    }
})


function generatePass({ type, id }: ButtonOption) {
    if (!data.value?.queue) {
        openAlert('Não foi possivel gerar a senha', 'A tela de filas não foi selecionada para o totem atual.')
        emit('to', 'Init')
        return
    }

    const body = {
        nr_seq_fila: data.value.queue[id],
        tipo_senha: type,
        cd_estabelecimento: props.totem.site.cd_estabelecimento,
        cd_pessoa_fisica: data.value.patient?.cd_pessoa_fisica
    }

    isLoading.value = true

    pushQueue(body)
        .then((res) => {
            data.value.content.title = res.data.ds_senha;
            data.value.content.raw = res.data;
            emit('next')
        })
        .catch((error) => {
            openAlert('Não foi possível gerar a senha', '')
            emit('next')
        })
        .finally(() => {
            isLoading.value = false
        })
}

</script>
