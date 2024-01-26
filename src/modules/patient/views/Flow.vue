<template>
    <v-app-bar>
        <v-btn @click="componentIndex--">
            Voltar
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn @click="componentIndex = 0">
            Cancelar
        </v-btn>
    </v-app-bar>

    <v-layout class="fill">
        <component v-model="data" :is="components[component]" @next="nextView" @to="redirect" @start="componentIndex = 0" />
    </v-layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

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

const components: Component = {}

const data = ref({
    cpf: '',
})

const totem = {
    screens: [
        {
            name: 'Início',
            component: 'Init'
        },
        {
            name: 'Identificação Paciente',
            component: 'Identifier'
        }
    ]
}

const componentIndex = ref(0)

const component: any = computed(() => {
    const view = totem.screens?.[componentIndex.value].component;

    if (!view) return;

    return view;
});

const modules: Record<string, any> = import.meta.glob('@patient/views/totem/*.vue', { eager: true });

for (const path in modules) {
    const componentRegexName = path.match(/([A-Z])\w+/g);

    if (componentRegexName)
        components[`${componentRegexName[0]}`] = modules[path].default;
}

function nextView(): void {
    componentIndex.value++;

    if (componentIndex.value == totem.screens.length) componentIndex.value = 0;
}

function redirect(to: string): void {
    const index = totem.screens.findIndex(
        (view: any) => view.component == to
    );

    componentIndex.value = index;
}

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