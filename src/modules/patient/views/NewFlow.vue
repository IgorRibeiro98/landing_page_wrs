<template>
  <Layout @back="back" @cancel="cancel" v-bind="layout">
    <component
      :is="currentFlowScreenComponent"
      @alert="openAlert"
      @next="next"
      @to="toScreen($event)"
      v-model:data="data"
      :totem="totem"
      :screen="currentFlowScreen"
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
import { onBeforeUnmount, onMounted } from "vue";
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router";

const alertProps = ref<AlertProps>({
  title: "",
  text: "",
  action: {
    type: "confirm",
    label: "Ok",
  },
});

const data = ref({});

const alert = ref(false);

const route: RouteLocationNormalizedLoaded = useRoute();

const id = computed(() => route.params.id as string);

const totem = ref(structuredClone(defaultValues.totem));

type Component = Record<string, VueComponent>;

const components = shallowRef<Component>({} as Component);
const layout = ref({
  hideBack: true,
  hideCancel: false,
});

const screenIndex = ref(0);
const subScreenComponent = ref("");

const idleTimeout = ref<number | null>(null);
const idleScreenTimeoutSeconds = ref<number>(60 * 5);

const currentScreen = computed(() => {
  return totem.value.screens[screenIndex.value]?.data;
});

const currentSubScreen = computed(() => {
  if (subScreenComponent.value === "") return undefined;

  return findSubscreenByComponentName(
    currentScreen.value,
    subScreenComponent.value
  );
});

const currentFlowScreen = computed(() => {
  if (subScreenComponent.value === "") return currentScreen.value;

  return currentSubScreen.value;
});

const currentFlowScreenComponent = computed(() => {
  if (!currentFlowScreen.value) return components.value["Loading"];
  const importComponent = components.value[currentFlowScreen.value.component];
  if(!importComponent) openFlowError('component-not-found');
  return components.value[currentFlowScreen.value.component];
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

onMounted(() => {
  window.addEventListener("click", resetOnIdle);
  window.addEventListener("keydown", resetOnIdle);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", resetOnIdle);
  window.removeEventListener("keydown", resetOnIdle);
  if (idleTimeout.value !== null) clearTimeout(idleTimeout.value);
});

function cancel() {
  screenIndex.value = 0;
  subScreenComponent.value = "";
}

function back() {
  screenIndex.value--;
}
function next() {
  const nextSubScreen = findNextSubscreen(
    currentScreen.value,
    currentSubScreen.value
  );

  if (!nextSubScreen) {
    nextScreen();
    return;
  }

  subScreenComponent.value = nextSubScreen.component;
}

function nextScreen() {
  subScreenComponent.value = "";

  if (screenIndex.value == totem.value.screens.length - 1) {
    screenIndex.value = 0;
    return;
  }
  screenIndex.value++;
}

function toScreen(screenComponentName: string) {
  const findSubScreen = findSubscreenByComponentName(
    currentScreen.value,
    screenComponentName
  );
  // debugger
  if (findSubScreen) {
    subScreenComponent.value = findSubScreen.component;
    return;
  }

  setMainScreenByComponentName(screenComponentName);
}

function setMainScreenByComponentName(componentName: string) {
  const findScreen = findScreenByComponentName(componentName);

  if (!findScreen) return openFlowError('flow-not-found');;
  subScreenComponent.value = "";
  screenIndex.value = totem.value.screens.indexOf(findScreen);
}

function openAlert(props: AlertProps) {
  alertProps.value = props;
  alert.value = true;
}
function openFlowError(errorCode: string) {
  openAlert({
    title: "Erro de sistema",
    text: `Favor entrar em contato com a equipe de TI. (erro: ${errorCode})`,
    action: {
      type: "confirm",
      label: "Ok",
    },
  });
}

const resetOnIdle = () => {
  console.log("resetOnIdle");
  if (idleTimeout.value !== null) {
    clearTimeout(idleTimeout.value);
  }

  idleTimeout.value = window.setTimeout(() => {
    if (screenIndex.value !== 0) clear();
  }, idleScreenTimeoutSeconds.value * 1000);
};

function findSubscreenByComponentName(screen: Screens, componentName: string) {
  return screen.subscreens.find(
    (subscreen) => subscreen.component === componentName
  );
}

function findScreenByComponentName(componentName: string) {
  return totem.value.screens.find(
    (screen) => screen.data.component === componentName
  );
}

function findNextSubscreen(
  currentScreen: Screens,
  currentSubScreenFind: SubScreen | undefined
): Screens | undefined {
  if (currentScreen.subscreens.length === 0) return undefined;

  if (!currentSubScreenFind) return currentScreen.subscreens[0];

  const currentIndex = currentScreen.subscreens.findIndex(
    (subscreen) =>
      subscreen.component === (currentSubScreenFind.component as any)
  );

  const nextSubScreen = currentScreen.subscreens[currentIndex + 1];

  if (nextSubScreen === undefined) return undefined;

  if (nextSubScreen.order === currentSubScreenFind.order) {
    return findNextSubscreen(currentScreen, nextSubScreen);
  }

  return currentScreen.subscreens[currentIndex + 1];
}

function clear() {
  screenIndex.value = 0;
  subScreenComponent.value = "";
  data.value = {};
}

function importModules() {
  for (const path in modules) {
    const componentName = getComponentNameByPath(path) as ScreenComponent;

    if (componentName === null) continue;
    components.value[componentName] = modules[path].default;
  }
}

function getComponentNameByPath(path: string) {
  const match = path.match(/\/([^\/]+)\.vue$/);
  return match ? match[1] : null;
}
</script>
