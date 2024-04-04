<template>
  <v-app-bar>
    <v-btn @click="componentIndex--"> Voltar </v-btn>

    <v-spacer></v-spacer>

    <v-btn @click="firstStep"> Cancelar </v-btn>
  </v-app-bar>

  <div class="pa-5 h-100 totem">
    <component v-model="data" v-model:totem="totem" v-model:loading="loadingFlowDialog" :is="components[component]"
      v-bind="componentBinds" @next="nextView" @to="redirect" @start="firstStep" />
  </div>
  <v-dialog fullscreen :model-value="isLoading">
    <v-row justify="center" align="center">
      <v-col cols="1">
        <v-progress-circular indeterminate size="60"></v-progress-circular>
      </v-col>
    </v-row>
  </v-dialog>
  <FlowLoading v-model="loadingFlowDialog" />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

import { findTotemById } from "@/repositories/totem.repository";

import useAlertStore from "@/stores/alert";

import router from "@/router";

import FlowLoading from "@patient/components/FlowLoading.vue";
import defaultData from "@patient/views/default-data";

import {
getGender,
getMaritalStatus,
getNationality,
getReligion,
} from "@patient/repositories/personal-data.repository";

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

type Component = Record<ScreenComponent, ComponentInfo>

interface Collection {
  data: any[];
  key: string;
  request(): Promise<any>;
}

interface Binding {
  [key: string]: any;
}

const { openAlert } = useAlertStore();

const components: Component = {};

const isLoading = ref(false);

const loadingFlowDialog = ref({
  display: false,
  title: "",
  text: "",
});

const data = ref<Data>(structuredClone(defaultData.data));
const totem = ref<Totem>(structuredClone(defaultData.totem));

const id = computed(() => {
  return router.currentRoute.value.params.id as string;
});

const componentIndex = ref(0);

const component: any = computed(() => {
  if (!totem.value.screens.length) return null;

  const view = totem.value.screens[componentIndex.value].data.component;

  if (!view) return null;

  return view;
});

const componentBinds = computed(() => {
  const bindings: Binding = {};
  personalData.value.forEach((value: Collection) => {
    bindings[value.key] = value.data;
  });

  return bindings;
});

const personalData = ref<Collection[]>([
  {
    key: "genders",
    data: [],
    request: getGender,
  },
  {
    key: "nationalities",
    data: [],
    request: getNationality,
  },
  {
    key: "religions",
    data: [],
    request: getReligion,
  },
  {
    key: "meritalStatuses",
    data: [],
    request: getMaritalStatus,
  },
]);

const modules: Record<string, any> = import.meta.glob(
  "@patient/views/totem/*.vue",
  { eager: true }
);
importModules();

function firstStep(): void {
  checkLoadingDialog()

  componentIndex.value = 0;
  data.value = structuredClone(defaultData.data);
}

function nextView(): void {
  checkLoadingDialog()

  componentIndex.value++;

  if (componentIndex.value == totem.value.screens.length) firstStep();
}

function redirect(to: string): void {
  checkLoadingDialog()

  const index = totem.value.screens.findIndex(
    (view: any) => view.component == to
  );

  componentIndex.value = index;
}

function importModules() {
  for (const path in modules) {
    const componentRegexName: any = path.match(/([A-Z])\w+/g);

    if (componentRegexName) {
      const key = componentRegexName[0] as ScreenComponent;
      components[key] = modules[path].default;
    }
  }
}

async function findTotem() {
  return findTotemById(id.value)
    .then((res: any) => {
      totem.value = res.data;
    })
    .catch((error) => {
      openAlert(
        "Não foi possível carregar as informações do totem",
        error.response?.data?.message
      );
    });
}

async function findPersonalData() {
  return Promise.allSettled(personalData.value.map((value) => value.request()))
    .then((result) => {
      result.forEach((res: any, index) => {
        personalData.value[index].data = res.value.data;
      });
    })
}

function loadBaseTotemData() {
  Promise.allSettled([findTotem(), findPersonalData()]).finally(() => {
    isLoading.value = false;
  });
}

function checkLoadingDialog() {
  if (loadingFlowDialog.value.display) {
    loadingFlowDialog.value = {
      display: false,
      title: '',
      text: ''
    }
  }
}

onMounted(() => {
  isLoading.value = true;

  loadBaseTotemData();
});
</script>

<style scoped>
:deep(.v-card>.v-card-text) {
  line-height: 1.5rem;
}
</style>
