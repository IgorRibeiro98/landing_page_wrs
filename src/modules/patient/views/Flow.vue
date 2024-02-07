<template>
    <v-app-bar>
        <v-btn @click="componentIndex--">
            Voltar
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn @click="firstStep">
            Cancelar
        </v-btn>
    </v-app-bar>

    <v-layout class="fill">
        <component v-model="data" v-model:totem="totem" :is="components[component]" @next="nextView" @to="redirect"
            @start="firstStep" />

        <v-progress-linear v-if="isLoading" indeterminate color="primary"></v-progress-linear>
    </v-layout>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { findTotemById } from '@/repositories/totem.repository';
import { validPatientByBirth } from '@patient/repositories/patient.repository'
import useAlertStore from '@/stores/alert';

interface ComponentInfo {
    __name: string;
    props?: {
        modelValue?: {
            type: null;
            required: boolean;
        };
    };
    emits?: string[];
    __hmrId: string;
    __file: string;
}

interface Component {
    [key: string]: ComponentInfo;
}

enum QueueType {
    Common = 'regular',
    Preferential = 'priority',
    Late = 'late'
}

const { alert } = storeToRefs<any>(useAlertStore())

const components: Component = {}
const isLoading = ref(false)

const defaultData = {
    identifier: '',
    birth: '',
    queue: {
        id: 1,
        name: 'Agendamento de Exame',
        description: 'Agende um exame para o paciente.',
        icon: 'mdi-file',
        color: 'primary',
        action: 'next',
        to: 'identifier',
        nr_seq_fila_comum: '1',
        nr_seq_fila_preferencial: '1',
        nr_seq_fila_preferencial_80: '1',
        ds_senha: '',
        dt_entrada: ''
    },
    patient: {
        prim_nm_pessoa_fisica: '',
        cd_pessoa_fisica: '',
        nm_pessoa_fisica: '',
        nm_social: null,
        nm_social_int: null,
        dt_nascimento: "",
        ie_sexo: "",
        nr_seq_genero: null,
        nr_identidade: "",
        nr_cpf: "",
        cd_nacionalidade: 0,
        nr_passaporte: null,
        nr_reg_geral_estrang: null,
        ie_estado_civil: 0,
        nr_ddi_telefone: null,
        nr_ddd_telefone: null,
        nr_telefone: null,
        nr_ddd_celular: "",
        nr_ddi_celular: "",
        nr_telefone_celular: "",
        ds_email: "",
        cd_religiao: 0,
        ie_tipo_complemento: 0,
        tipo_endereco: "",
        ds_endereco: "",
        nr_endereco: 0,
        ds_complemento: "",
        cd_cep: "",
        ds_municipio: "",
        cd_estado: 0,
        agendamentos: []
    }
}

const data = ref({
    ...defaultData
})

const defaultTotem = {
    id: 0,
    name: '',
    description: null,
    screens: [],
    queues: []
}

const totem = ref<Totem>({ ...defaultTotem })

const componentIndex = ref(0)

const component: any = computed(() => {
    if (!totem.value.screens.length) return null;

    const view = totem.value.screens[componentIndex.value].component;

    if (!view) return null;

    return view;
});

const modules: Record<string, any> = import.meta.glob('@patient/views/totem/*.vue', { eager: true });

for (const path in modules) {
    const componentRegexName = path.match(/([A-Z])\w+/g);

    if (componentRegexName)
        components[`${componentRegexName[0]}`] = modules[path].default;
}

function firstStep(): void {
    componentIndex.value = 0;
    data.value = { ...defaultData };

}

function nextView(): void {
    componentIndex.value++;

    if (componentIndex.value == totem.value.screens.length) firstStep()

}

function redirect(to: string): void {
    const index = totem.value.screens.findIndex(
        (view: any) => view.component == to
    );

    componentIndex.value = index;
}

onMounted(() => {
    isLoading.value = true;

    validPatientByBirth('1303467', '02/03/1997')
        .then((res: any) => {
            data.value.patient = Object.assign(data.value.patient, res.data)
        })

    findTotemById('123')
        .then((res: any) => {
            totem.value = res.data;
        })
        .catch(error => {
            alert.value = {
                title: 'Não foi possível carregar as informações do totem',
                text: error.response?.data?.message,
                display: true
            };
        })
        .finally(() => {
            isLoading.value = false;
        })

})

</script>

<style>
.fill-width {
    width: 100%
}

.fill {
    width: 100%;
    height: 100%
}
</style>