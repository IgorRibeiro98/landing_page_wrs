<template>
  <Layout @back="back" @cancel="cancel" v-bind="layout">
    <component
      :is="componentData.component"
      :subScreens="componentData.subScreens"
      @alert="openAlert"
      @next="next"
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
import { AlertProps } from "@patient/types";
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router";

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

type SubScreen = Record<string, VueComponent>;

type Component = Record<
  ScreenComponent,
  {
    component: VueComponent;
    subScreens: SubScreen;
  }
>;

const components = shallowRef<Component>({} as Component);
const layout = ref({
  hideBack: true,
  hideCancel: false,
});

const screenIndex = ref(2);

const currentScreen = computed(() => totem.value.screens[screenIndex.value]);

const componentData = computed(() => {
  if (!currentScreen.value) return components.value["Loading"];

  return components.value[currentScreen.value.data.component];
});

watch(screenIndex, (value: number) => {
  if (value == 0) layout.value.hideBack = true;
});

const modules: Record<string, any> = import.meta.glob(
  "@patient/views/totem/**/*.vue",
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
function next() {
  if (screenIndex.value == totem.value.screens.length - 1) {
    screenIndex.value = 0;
    return;
  }
  screenIndex.value++;
}

function openAlert(props: AlertProps) {
  alertProps.value = props;
  alert.value = true;
}

function importModules() {
  for (const path in modules) {
    const basePath = path.replace("/src/modules/patient/views/totem/", "");
    const componentName = getComponentNameByPath(path) as ScreenComponent;

    if (componentName === null) continue;

    const isSubScreen = basePath.includes("/");
    const rootComponent = (
      isSubScreen ? basePath.split("/")[0] : componentName
    ) as ScreenComponent;

    if (components.value[rootComponent] === undefined) {
      components.value[rootComponent] = {
        component: {},
        subScreens: {},
      };
    }

    if (!isSubScreen || isComponentNameEqualToPreviousFolder(path)) {
      components.value[rootComponent].component = modules[path].default;
    } else {
      components.value[rootComponent].subScreens[componentName] =
        modules[path].default;
    }
  }
}

function getComponentNameByPath(path: string) {
  const match = path.match(/\/([^\/]+)\.vue$/);
  return match ? match[1] : null;
}

function isComponentNameEqualToPreviousFolder(path: string) {
  const match = path.match(/\/([^\/]+)\/([^\/]+)\.vue$/);
  return match ? match[1] === match[2] : false;
}
</script>
