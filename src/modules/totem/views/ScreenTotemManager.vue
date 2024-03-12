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
        <Draggable draggable=".card-title"  show-arrows>

        <v-slide-group show-arrows ref="slideGroup">
          <v-slide-group-item
            v-for="(filteredScreen, index) in filteredScreens"
          >
            <v-card
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
                      @click="openPreview('base', index)"
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
        </Draggable>
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
        <v-list>
        <Draggable>

          <v-list-item
            @click="edit"
            :active="
              previewDialog.listType === 'totem' &&
              previewDialog.activeIndex === i
            "
            :title="screen.data.name"
            :subtitle="screen.data.description"
            v-for="(screen, i) in totem.screens"
          >
            <template #prepend>
              <h1 class="mr-5">{{ i + 1 }}</h1>
            </template>
            <template #append>
              <v-card
                variant="outlined"
                v-ripple.stop
                class="scale-up"
                @click.stop="openPreview('totem', i)"
              >
                <component
                  style="
                    min-width: 800px;
                    min-height: 400px;
                    max-width: 800px;
                    max-height: 400px;
                    zoom: 18%;
                    pointer-events: none;
                  "
                  v-model="data"
                  :is="components[screen.data.component]"
                ></component>
              </v-card>
            </template>
          </v-list-item>
          </Draggable>
        </v-list>
        <p class="text-center" v-if="!totem.screens.length">
          Não há telas no totem {{ totem.name }}
        </p>
      </v-col>
    </v-row>
    <ScreenPreviewDialog
      v-model="previewDialog.visible"
      :screens="previewDialog.screens"
      v-model:actualScreenIndex="previewDialog.activeIndex"
    />
  </View>
</template>
<script lang="ts" setup>
import Draggable from "@/components/Draggable.vue";
import FormBuilder from "@/components/FormBuilder.vue";
import View from "@/components/View.vue";
import { components } from "@/modules/patient/helpers/totem-components";
import { data } from "@/modules/patient/views/default-data";
import ScreenPreviewDialog from "@/modules/totem/components/ScreenPreviewDialog.vue";
import { getScreens } from "@/modules/totem/repositories/screen.repository";
import { findTotem } from "@/modules/totem/repositories/totem.repository";
import useTotemStore from "@/stores/alert";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { VSlideGroup } from "vuetify/components/VSlideGroup";

const route = useRoute();
const screens = ref<Screens[]>([]);
const slideGroup = ref();

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

const arr = reactive([
  {
    id: 1,
  },
  {
    id: 2,
  },
]);

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

const { openAlert } = useTotemStore();

function loadTotem() {
  findTotem(Number(route.params.id))
    .then((resp) => {
      totem.value = resp.data;
    })
    .catch((error) => {
      openAlert("Erro", error);
    });
}

function loadScreens() {
  getScreens()
    .then((resp) => {
      screens.value = resp.data;
    })
    .catch((error) => {
      openAlert("Erro", error);
    });
}

function edit() {
  console.log("edit");
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
onMounted(() => {
  loadTotem();
  loadScreens();
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
</style>
