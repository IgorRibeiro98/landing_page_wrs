<template>
    <v-row class="d-flex justify-center">
        <v-col col="12" md="4" class="text-center ">
            <p>Aqui é possivel personalizar o seu tema</p>
        </v-col>
    </v-row>
    <v-row class="fill-height">
        <v-col cols="12" md="4" class="position-relative">
            <v-list density="compact" min-height="100%" max-height="80%" class="flex-grow-1 remove-scroll-context">
                <v-list-item link title="Exibir avançados" :active="showAdvanced" @click="showAdvanced = !showAdvanced">
                    <template #append="{ isActive }">
                        <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                    </template>
                </v-list-item>
                <v-list-item v-for="(item) in themeList" link :title="item.name"
                    :subtitle="tenant.theme.colors![item.value]" v-show="item.show" @click="colorItem = { ...item }">
                    <v-menu activator="parent" :close-on-content-click="false">
                        <v-color-picker v-model="tenant.theme.colors![item.value]" mode="hex" :modes="['hex']"
                            @update:model-value="changeTheme"></v-color-picker>
                    </v-menu>
                    <template #append>
                        <v-sheet width="30px" height="30px" :color="tenant.theme.colors![item.value]" rounded="lg"
                            border>

                        </v-sheet>
                    </template>
                </v-list-item>
                <v-list-item link title="Resetar" @click="resetTheme" append-icon="mdi-backup-restore">
                </v-list-item>
            </v-list>
        </v-col>
        <v-col cols="12" md="8" class="h-100">
            <v-sheet width="100%" height="100%" border class="d-flex justify-center align-center">
                <div>
                    <component :is="colorItem.component" v-bind="colorItem.props" />
                </div>
            </v-sheet>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from 'vue'
import { useTheme } from 'vuetify'
import Init from '@patient/views/totem/Init.vue'
import VirtualKeyboard from '@/components/VirtualKeyboard.vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VSheet } from 'vuetify/components/VSheet';
import { VCard } from 'vuetify/components/VCard';


interface Props {
    modelValue: Tenant
}

interface Emits {
    (event: 'update:modelValue', value: Tenant): void

}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

let backupTheme: any = []

const showAdvanced = ref(false)

const theme = useTheme()

const colorItem = ref<any>({ name: 'Primária', value: 'primary', show: true, component: shallowRef(Init), props: {} })

const themeList = computed(() => {
    return [
        { name: 'Primária', value: 'primary', show: true, component: shallowRef(Init), props: {} },
        { name: 'Secundária', value: 'secondary', show: true, component: shallowRef(Init), props: {} },
        { name: 'Teclado', value: 'keyboard', show: true, component: shallowRef(VirtualKeyboard), props: { alwaysVisible: true } },
        { name: 'Erro', value: 'error', show: showAdvanced.value, component: shallowRef(VBtn), props: { color: 'error', text: 'Hello World', size: 'x-large' } },
        { name: 'Info', value: 'info', show: showAdvanced.value, component: shallowRef(VBtn), props: { color: 'info', text: 'Hello World', size: 'x-large' } },
        { name: 'Sucesso', value: 'success', show: showAdvanced.value, component: shallowRef(VBtn), props: { color: 'success', text: 'Hello World', size: 'x-large' } },
        { name: 'Alerta', value: 'warning', show: showAdvanced.value, component: shallowRef(VBtn), props: { color: 'warning', text: 'Hello World', size: 'x-large' } },
        { name: 'Plano de fundo', value: 'background', show: showAdvanced.value, component: shallowRef(VSheet), props: { color: 'background', width: '400px', height: '400px' } },
        { name: 'Superfície', value: 'surface', show: showAdvanced.value, component: shallowRef(VSheet), props: { color: 'surface', width: '400px', height: '400px' } },
        { name: 'Variante da Superfície', value: 'surface-variant', show: showAdvanced.value, component: shallowRef(VSheet), props: { color: 'surface-variant', width: '400px', height: '400px' } },
        { name: 'Cor do texto no plano de fundo', value: 'on-background', show: showAdvanced.value, component: shallowRef(VCard), props: { color: 'background', title: 'Hello World', width: '200px', height: '200px' } },
        { name: 'Cor do texto na superfície', value: 'on-surface', show: showAdvanced.value, component: shallowRef(VCard), props: { color: 'surface', title: 'Hello World', width: '200px', height: '200px' } },
        { name: 'Cor do texto na variação da superfície', value: 'on-surface-variant', show: showAdvanced.value, component: shallowRef(VCard), props: { color: 'surface-variant', title: 'Hello World', width: '200px', height: '200px' } },
        { name: 'Cor do texto na primária', value: 'on-primary', show: showAdvanced.value, component: shallowRef(VCard), props: { color: 'primary', title: 'Hello World', width: '200px', height: '200px' } },
        { name: 'Cor do texto na secundária', value: 'on-secondary', show: showAdvanced.value, component: shallowRef(VCard), props: { color: 'secondary', title: 'Hello World', width: '200px', height: '200px' } },
        { name: 'Cor do texto no sucesso', value: 'on-success', show: showAdvanced.value, component: shallowRef(VCard), props: { color: 'success', title: 'Hello World', width: '200px', height: '200px' } },
        { name: 'Cor do texto no alerta', value: 'on-warning', show: showAdvanced.value, component: shallowRef(VCard), props: { color: 'warning', title: 'Hello World', width: '200px', height: '200px' } },
        { name: 'Cor do texto no erro', value: 'on-error', show: showAdvanced.value, component: shallowRef(VCard), props: { color: 'error', title: 'Hello World', width: '200px', height: '200px' } },
        { name: 'Cor do texto na informação', value: 'on-info', show: showAdvanced.value, component: shallowRef(VCard), props: { color: 'info', title: 'Hello World', width: '200px', height: '200px' } },
    ]
})

const tenant = computed({
    get() {
        return props.modelValue
    },
    set(value: Tenant) {
        emit('update:modelValue', value)
    }

})

function changeTheme() {
    const light = Object.assign({}, theme.themes.value.light, tenant.value.theme)
    Object.assign(theme.themes.value, { light })
}

function resetTheme() {
    const light = Object.assign({}, theme.themes.value.light, backupTheme)
    Object.assign(theme.themes.value, { light })
    tenant.value.theme.colors = JSON.parse(JSON.stringify(theme.current.value.colors))
}

onMounted(() => {
    backupTheme = Object.freeze(JSON.parse(JSON.stringify(theme.current.value)))
})
</script>
<style lang="scss" scoped>
:deep(.v-color-picker-preview__eye-dropper button) {
    display: none;
    pointer-events: none;
}
</style>