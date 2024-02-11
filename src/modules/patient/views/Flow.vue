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

    <div class="pa-5 h-100 totem">
        <component v-model="data" v-model:totem="totem" v-model:loading="loadingFlowDialog" :is="components[component]"
            @next="nextView" @to="redirect" @start="firstStep" />
        <v-progress-linear v-if="isLoading" indeterminate color="primary"></v-progress-linear>
    </div>

    <FlowLoading v-model="loadingFlowDialog" />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

import { findTotemById } from '@/repositories/totem.repository';

import useAlertStore from '@/stores/alert';

import router from '@/router'

import FlowLoading from '@patient/components/FlowLoading.vue';
import defaultData from '@patient/views/default-data'


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

const { openAlert } = useAlertStore()

const components: Component = {}
const isLoading = ref(false)

const loadingFlowDialog = ref({
    display: false,
    title: '',
    text: ''
})

const data = ref<Data>(structuredClone(defaultData.data))
const totem = ref<Totem>(structuredClone(defaultData.totem))

const id = computed(() => {
    return router.currentRoute.value.params.id as string;
})

const componentIndex = ref(0)

const component: any = computed(() => {
    if (!totem.value.screens.length) return null;

    const view = totem.value.screens[componentIndex.value].component;

    if (!view) return null;

    return view;
});

const modules: Record<string, any> = import.meta.glob('@patient/views/totem/*.vue', { eager: true });
importModules()

function firstStep(): void {
    componentIndex.value = 0;
    data.value = structuredClone(defaultData.data);
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

function importModules() {

    for (const path in modules) {
        const componentRegexName = path.match(/([A-Z])\w+/g);

        if (componentRegexName)
            components[`${componentRegexName[0]}`] = modules[path].default;
    }
}

onMounted(() => {
    isLoading.value = true;

    findTotemById(id.value)
        .then((res: any) => {
            totem.value = res.data;
        })
        .catch(error => {
            openAlert('Não foi possível carregar as informações do totem', error.response?.data?.message)
        })
        .finally(() => {
            isLoading.value = false;
        })

})

</script>

<style scoped>
::v-deep .v-card > .v-card-text {
  line-height:1.5rem;
}
</style>
