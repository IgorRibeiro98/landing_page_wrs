<template>
  <div v-if="isDev" style="position:absolute;" class="text-center w-100">
    <div>
      Histórico:
      <span v-for="component in history">{{ component }} /</span>
    </div>
    <p class="text-primary">{{ currentFlowScreen?.component }}</p>
  </div>

  <Layout ref="layoutRef" @back="backHistory" @cancel="cancel" v-bind="layout">
    <component
      :is="currentFlowScreenComponent"
      @alert="openAlert"
      @next="next"
      @to="toScreen($event)"
      @cancel="cancel"
      @loading="openLoading"
      v-model:data="data"
      :layoutRef="layoutRef"
      :totem="totem"
      :screen="currentFlowScreen"
      :traits="currentScreen?.traits ?? []"
    >
    </component>

    <ConfirmAlert v-model="alert" v-bind="alertProps" />
    <Loading v-model="loading" v-bind="loadingProps"/>
  </Layout>
</template>

<script lang="ts" setup>
import ConfirmAlert from "@/modules/patient/components/ConfirmAlert.vue";
import Loading from "@patient/components/Loading.vue";
import {
  computed,
  onBeforeMount,
  ref,
  shallowRef,
  watch,
  type Component as VueComponent,
} from "vue";
const to = ref("");

import { clearSignatureAttempts } from '@patient/repositories/signature.repository';

import Layout from "@/modules/patient/layouts/Default.vue";
import defaultValues from "@/modules/totem/default-values";
import { findTotem } from "@/modules/totem/repositories/totem.repository";
import { AlertProps, LoadingProps } from "@patient/types";
import { onBeforeUnmount, onMounted } from "vue";
import { useRoute, useRouter, type RouteLocationNormalizedLoaded } from "vue-router";

const alert = ref(false);
const loading = ref(false);
const layoutRef = ref<InstanceType<typeof Layout>>();

const alertProps = ref<AlertProps>({
  title: "",
  text: "",
  action: {
    type: "confirm",
    label: "Ok",
  },
});

const loadingProps = ref<LoadingProps>({
  text: '',
  callback: (_: boolean) => {}
})

const history = ref<string[]>([]);
const last = ref<string>("");
const data = ref({
  internal: {}
});

const router = useRouter()

const route: RouteLocationNormalizedLoaded = useRoute();

const id = computed(() => route.params.id as string);

const totem = ref(structuredClone(defaultValues.totem));

type Component = Record<string, VueComponent>;

const components = shallowRef<Component>({} as Component);
const layout = ref({
  hideBack: true,
  hideCancel: true,
});
const isDev = import.meta.env.MODE === "development";
const screenIndex = ref(0);
const subScreenComponent = ref("");

const idleTimeout = ref<number | null>(null);
const idleScreenTimeoutSeconds = ref<number>(60 * 5);

const currentScreen = computed(() => {
  return totem.value.screens[screenIndex.value];
});

const currentSubScreen = computed(() => {
  if (subScreenComponent.value === "") return undefined;

  return findSubscreenByComponentName(
    currentScreen.value?.data,
    subScreenComponent.value
  );
});

const currentFlowScreen = computed(() => {
  if(layoutRef.value) {
    layoutRef.value.setStyles({})
  }
  if (subScreenComponent.value === "") return currentScreen.value?.data;

  return currentSubScreen.value;
});

const currentFlowScreenComponent = computed(() => {
  if (!currentFlowScreen.value) return components.value["Loading"];
  const importComponent = components.value[currentFlowScreen.value.component];
  if (!importComponent) openFlowError("component-not-found");
  return components.value[currentFlowScreen.value.component];
});

watch(screenIndex, (value: number) => {
  if (value == 0) return layout.value = {
    hideBack: true,
    hideCancel: true
  };

  layout.value = {
    hideBack: false,
    hideCancel: false
  };
});

watch(currentFlowScreen, (currentValue, oldValue) => {
  if (
    currentValue?.component === last.value ||
    (!oldValue?.component && last.value === "")
  )
    return;
  if(screenIndex.value === 0) return;
  history.value.push(oldValue!.component);
});

const modules: Record<string, any> = import.meta.glob(
  "@patient/views/totem/**/*.vue",
  { eager: true }
);

importModules();

onBeforeMount(() => {
  findTotem(id.value).then((response: any) => {
    totem.value = response.data;
  }).catch((error: any) => {
    openAlert({
      title: 'Falha ao encontrar o totem',
      text: error.response.data.message,
      action: {
        type: "confirm",
        label: "Ok",
        callback() {
          router.push({
            name: 'totem.view'
          });
        }
      },
    })
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

function openLoading(lProps: LoadingProps) {
  console.log('open loading')
  console.log(lProps)
  loading.value = true;
  loadingProps.value = lProps
  lProps.callback(loading)
}

function cancel() {
  screenIndex.value = 0;
  subScreenComponent.value = "";
  data.value = {
    internal: {},
  };
  last.value = "";
  history.value = [];
  clearSignatureAttempts()
}

function backHistory() {
  if (history.value.length === 0) return;

  last.value = history.value.pop()!;
  const result = findScreenInTotemByComponentName(last.value);
  if (result) {
    screenIndex.value = result.index;
    subScreenComponent.value = result.subScreenComponent;
  }
}
function next() {
  const nextSubScreen = findNextSubscreen(
    currentScreen.value?.data,
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
    currentScreen.value?.data,
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

  if (!findScreen) return openFlowError("flow-not-found");
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
  if (idleTimeout.value !== null) {
    clearTimeout(idleTimeout.value);
  }

  idleTimeout.value = window.setTimeout(() => {
    if (screenIndex.value !== 0) cancel();
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
function findScreenInTotemByComponentName(componentName: string) {
  let result = null;

  for (let i = 0; i < totem.value.screens.length; i++) {
    const screen = totem.value.screens[i];
    if (screen.data.component === componentName) {
      result = {
        index: i,
        subScreenComponent: "",
      };
      break;
    }

    for (let j = 0; j < screen.data.subscreens.length; j++) {
      const subscreen = screen.data.subscreens[j];
      if (subscreen.component === componentName) {
        result = {
          index: i,
          subScreenComponent: subscreen.component,
        };
        break;
      }
    }

    if (result) break;
  }

  return result;
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
