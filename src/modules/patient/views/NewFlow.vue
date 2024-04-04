<template>
  <Layout @back="back" @cancel="cancel" v-bind="layout">
    <component
      :is="component"
      @alert="openAlert"
    >
    </component>
  </Layout>

  <ConfirmAlert v-model="alert" v-bind="alertProps" />
</template>

<script lang="ts" setup>
import ConfirmAlert from "@/modules/patient/components/ConfirmAlert.vue";
import Layout from "@/modules/patient/layouts/Default.vue";

import {
computed,
onBeforeMount,
ref,
shallowRef,
watch,
type Component as VueComponent,
} from "vue";

import defaultValues from "@/modules/totem/default-values";

import { findTotem } from "@/modules/totem/repositories/totem.repository";

import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router";

import { AlertProps } from "@patient/types";

const alertProps = ref<AlertProps>({
  title: "CPF Inválido",
  text: "O CPF informado não é válido. Por favor, verifique e tente novamente.",
  action: {
    type: "confirm",
    label: "Ok",
  },
});

const alert = ref(false);

const route: RouteLocationNormalizedLoaded = useRoute();

const id = computed(() => route.params.id as string);

const totem = ref(structuredClone(defaultValues.totem));

type Component = Record<string, VueComponent>;

const components = shallowRef<Component>({});

const layout = ref({
  hideBack: true,
  hideCancel: false,
});

const screenIndex = ref(0);

const currentScreen = computed(() => totem.value.screens[screenIndex.value]);

const component = computed(() => {
  if (!currentScreen.value) return components.value["Loading"];

  return components.value[currentScreen.value.data.component];
});

watch(screenIndex, (value: number) => {
  if (value == 0) layout.value.hideBack = true;
});
const modules: Record<string, any> = import.meta.glob(
  "@patient/views/totem/*.vue",
  { eager: true }
);

importModules();

onBeforeMount(() => {
  findTotem(id.value).then((response) => {
    totem.value = response.data;
  });
});

function cancel() {
  screenIndex.value = 0;
}

function back() {
  screenIndex.value--;
}

function openAlert(props: AlertProps) {
  alertProps.value = props;
  alert.value = true;
}

function importModules() {
  for (const path in modules) {
    const componentRegexName = path.match(/([A-Z])\w+/g);

    if (componentRegexName)
      components.value[`${componentRegexName[0]}`] = modules[path].default;
  }
}
</script>
