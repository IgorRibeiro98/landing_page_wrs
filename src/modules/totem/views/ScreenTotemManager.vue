<template>
  <View title="Gerenciamento de telas">
    <v-row>
      <v-col cols="12">
        <h3>Telas para adicionar</h3>
        <FormBuilder
          v-model="search"
          :form="[
            {
              label: 'Buscar telas',
              value: 'screen',
              component: 'VTextField',
            },
          ]"
        >
        </FormBuilder>
        <!-- <Draggable draggable=".card-title"  show-arrows> -->

        <v-slide-group show-arrows ref="slideGroup">
          <v-slide-group-item
            v-for="(filteredScreen, index) in filteredScreens"
          >
            <v-card
              @click="insertScreenInTotem(filteredScreen)"
              variant="outlined"
              width="300"
              height="150"
              min-height="150"
              class="px-2 py-3 screen-card item"
            >
              <v-card-title class="d-flex justify-space-between">
                <p class="flex-grow-1 text-truncate card-title">
                  {{ filteredScreen.name }}
                </p>
                <v-tooltip text="Preview" location="bottom">
                  <template #activator="{ props }">
                    <v-icon
                      @click.stop="openPreview('base', index)"
                      v-bind="props"
                      icon="mdi-monitor"
                      class="cursor-pointer clickable"
                    ></v-icon>
                  </template>
                </v-tooltip>
              </v-card-title>
              <v-card-text>
                {{ filteredScreen.description }}
              </v-card-text>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
        <!-- </Draggable> -->
        <p class="text-center" v-if="!filteredScreens.length">
          {{
            search.screen
              ? "Nenhuma tela encontrada"
              : "Nenhuma tela disponível"
          }}
        </p>
      </v-col>
      <v-col cols="12">
        <h3>Telas atuais</h3>
        <v-list
          class="position-relative overflow-hidden"
          v-click-outside="clearSelectedScreenTotem"
        >
          <!-- <Draggable> -->
          <transition-group name="list">
            <v-list-item
              :active="lastScreenTotemSelected === i"
              :key="screen"
              :title="screen.data.name"
              :subtitle="screen.data.description"
              v-for="(screen, i) in totem.screens"
              @click="edit(screen)"
            >
              <template #prepend>
                <div>
                  <v-btn
                    block
                    variant="text"
                    icon="mdi-chevron-up"
                    :disabled="i === 0"
                    @click.stop="changeOrder(-1, i)"
                  ></v-btn>
                  <v-btn
                    block
                    variant="text"
                    icon="mdi-chevron-down"
                    :disabled="i + 1 == totemScreensLength"
                    @click.stop="changeOrder(1, i)"
                  ></v-btn>
                </div>
                <h1 class="mr-5">{{ screen.order }}</h1>
              </template>
              <template #append>
                <v-card
                  v-if="false"
                  variant="outlined"
                  v-ripple.stop
                  class="scale-up"
                  @click.stop="openPreview('totem', i)"
                  style="
                    min-width: 800px;
                    min-height: 400px;
                    max-width: 800px;
                    max-height: 400px;
                    zoom: 18%;
                  "
                >
                  <keep-alive>
                    <component
                      style="pointer-events: none"
                      v-model="data"
                      :religions="[]"
                      :meritalStatuses="[]"
                      :nationalities="[]"
                      :genders="[]"
                      :totem="{}"
                      :is="components[screen.data.component!]"
                    ></component>
                  </keep-alive>
                </v-card>
              </template>
            </v-list-item>
          </transition-group>
          <!-- </Draggable> -->
        </v-list>
        <p class="text-center" v-if="!totem.screens.length">
          Não há telas no totem {{ totem.name }}
        </p>
      </v-col>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn @click="cancel" class="mr-3" variant="tonal" color="gray"
          >Cancelar</v-btn
        >
        <v-btn @click="save" variant="tonal" color="primary">Salvar</v-btn>
      </v-col>
    </v-row>
    <ScreenPreviewDialog
      v-model="previewDialog.visible"
      :screens="previewDialog.screens"
      v-model:actualScreenIndex="previewDialog.activeIndex"
    />
    <ScreenTotemConfigDialog
      v-model="configDialog"
      :screen-totem="screenTotem"
      @save="saveScreenTotemConfig"
      @screen:delete="removeScreen"
      @field:remove="removeField"
    />
  </View>
</template>
<script lang="ts" setup>
import FormBuilder from "@/components/FormBuilder/Form.vue";
import View from "@/components/View.vue";
import { removePropertiesByPaths } from "@/helpers/object";
import { components } from "@/modules/patient/helpers/totem-components";
import { data } from "@/modules/patient/views/default-data";
import ScreenPreviewDialog from "@/modules/totem/components/ScreenPreviewDialog.vue";
import { getScreens } from "@/modules/totem/repositories/screen.repository";
import {
attachScreens,
findTotem,
} from "@/modules/totem/repositories/totem.repository";
import useTotemStore from "@/stores/alert";
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ScreenTotemConfigDialog from "../components/ScreenTotemConfigDialog.vue";

import useSystemStore from '@/stores/system';

const { setBreadcrumbs } = useSystemStore()
const route = useRoute();
const router = useRouter();
const screens = ref<Screens[]>([]);
const screenTotem = ref<ScreenTotem>({
  id: 0,
  order: 0,
  totem_id: 0,
  screen_id: 0,
  data: {
    id: 0,
    name: "",
    description: "",
    component: undefined,
    traits: [],
    fields: [],
  },
  traits: [],
  fields: [],
});
const slideGroup = ref();
const lastScreenTotemSelected = ref<number | null>(null);
const previewDialog = ref<{
  visible: boolean;
  screens: Screens[];
  activeIndex: number;
  listType: string;
}>({
  visible: false,
  screens: [],
  activeIndex: 0,
  listType: "",
});

const configDialog = ref(false);

const totem = ref<Totem>({
  id: 0,
  name: "",
  description: "",
  queues: [],
  screens: [],
  site: {
    cd_estabelecimento: 0,
    ds_estabelecimento: "",
  },
});

const search = reactive({
  screen: "",
});

const filteredScreens = computed(() => {
  const items = screens.value.filter((screen) => {
    const filterSearch = search.screen
      ? screen.name.toLowerCase().includes(search.screen.toLowerCase())
      : true;
    const alreadySelected = totem.value.screens.some(
      (s) => s.screen_id === screen.id
    );
    return !alreadySelected && filterSearch;
  });

  if (slideGroup.value) slideGroup.value.scrollOffset = 0;

  return items;
});

const totemFormattedScreens = computed(() => {
  return totem.value.screens.map((screen: ScreenTotem) => {
    return screen.data;
  });
});

const totemScreensLength = computed(() => {
  return totem.value.screens.length;
});

const { openAlert } = useTotemStore();

function loadTotem() {
  findTotem(Number(route.params.id))
    .then((resp: any) => {
      totem.value = resp.data;
      mergeTotemScreensWithBaseScreen();
    })
    .catch((error: any) => {
      openAlert("Erro", error);
    });
}
function mergeTotemScreensWithBaseScreen() {
  totem.value.screens = totem.value.screens.map((s: ScreenTotem) => {
    return {
      ...s,
      data: Object.assign(
        {},
        s.data,
        screens.value.find((screen) => screen.id === s.screen_id)
      ),
    };
  });
}
async function loadScreens() {
  return getScreens()
    .then((resp) => {
      screens.value = resp.data;
    })
    .catch((error) => {
      openAlert("Erro", error);
    });
}

function saveScreenTotemConfig(screenTotem: ScreenTotem) {
  const index = totem.value.screens.findIndex(
    (s) => s.data.component === screenTotem.data.component
  );
  if (index === -1) return;

  totem.value.screens[index] = screenTotem;
  configDialog.value = false;
}

function edit(selectedScreenTotem: ScreenTotem) {
  screenTotem.value = { ...selectedScreenTotem };
  configDialog.value = true;
}

function insertScreenInTotem(screen: Screens) {
  totem.value.screens.push({
    id: 0,
    order: totem.value.screens.length + 1,
    totem_id: totem.value.id,
    screen_id: screen.id,
    data: screen,
    traits: [],
    fields: [],
  });
  const actualScreenTotem = findScreenTotemByComponent(screen.component!);

  if (actualScreenTotem === undefined) {
    openAlert("Erro", "Tela não encontrada");
    return;
  }
  if (actualScreenTotem.data.fields.length === 0 && actualScreenTotem.data.traits.length === 0) return

  edit(actualScreenTotem);
}

function changeOrder(direction: number, actualIndex: number) {
  const newIndex = actualIndex + direction;
  totem.value.screens[actualIndex].order = newIndex + 1;
  totem.value.screens[newIndex].order = actualIndex + 1;
  const item = totem.value.screens.splice(actualIndex, 1)[0];
  totem.value.screens.splice(newIndex, 0, { ...item });
  reorderScreensByIndex();
  lastScreenTotemSelected.value = newIndex;
}

function findScreenTotemByComponent(
  component: string
): ScreenTotem | undefined {
  return totem.value.screens.find((s) => s.data.component === component);
}

function clearSelectedScreenTotem() {
  lastScreenTotemSelected.value = null;
}

function removeScreen(screenTotem: ScreenTotem) {
  const index = totem.value.screens.findIndex((s) => s.id === screenTotem.id);
  if (index === -1) return;
  totem.value.screens.splice(index, 1);
  reorderScreensByIndex();
}

function removeField(field: ScreenTotemField) {
  const index = screenTotem.value.fields.findIndex(
    (f) => f.field_id === field.field_id
  );
  if (index === -1) return;
  screenTotem.value.fields.splice(index, 1);
}

function openPreview(screenList: "totem" | "base", index: number) {
  const availableScreens = {
    totem: totemFormattedScreens.value,
    base: filteredScreens.value,
  };
  previewDialog.value.listType = screenList;
  previewDialog.value.screens = availableScreens[screenList];
  previewDialog.value.activeIndex = index;
  previewDialog.value.visible = true;
}

function cancel() {
  router.push({ name: "totem.detail", params: { id: totem.value.id } });
}

function save() {
  //necessário remover todos os ids 0 para criar no backend em vez de atualizar uma coisa que não existe.
  const screens = removePropertiesByPaths(
    totem.value.screens,
    ["id", "fields.screen_totem_id", "traits.screen_totem_id"],
    (value) => {
      if (value === 0) return true;
      return false;
    }
  );
  attachScreens(totem.value.id, screens)
    .then(() => {
      router.push({ name: "totem.detail", params: { id: totem.value.id } });
    })
    .catch((error: any) => {
      openAlert("Erro", error);
    });
}
function reorderScreensByIndex() {
  totem.value.screens.forEach((s, index) => {
    s.order = index + 1;
  });
}

onBeforeMount(() => {
  setBreadcrumbs([
  {
      title: 'Totens',
      to: {
        name: 'totem.view',
      },
    },
    {
      title: computed<string>(() => totem.value.id ? totem.value.name : (route.params.id as string)),
      to: {
        name: 'totem.detail',
        params: { id: route.params.id },
      },
    },
    { title: 'Gerenciamento de Telas', to: '' },
  ])
})

onMounted(async () => {
  await loadScreens();
  loadTotem();
});
</script>

<style scoped lang="scss">
.screen-card:hover {
  height: fit-content !important;
  .card-title {
    white-space: normal !important;
    overflow: unset !important;
  }
}
/* 1. declare transition */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
