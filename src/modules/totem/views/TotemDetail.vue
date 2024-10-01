<template>
  <View
    :title="totem.name"
    enable-action
    :actions="actions"
    :description="totem.description"
  >
    <template #action-prepend>
      <v-btn
        color="primary"
        prepend-icon="mdi-play"
        @click="
          $router.push({
            name: 'totem.run',
            params: { id: totem.id },
          })
        "
        class="mr-4"
      >
        Executar
      </v-btn>
    </template>
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center">
          <h2>Filas</h2>
          <v-spacer></v-spacer>
          total: {{ totem.queues.length }}
        </div>
        <div v-if="totem.queues.length === 0">Não há filas</div>
        <v-slide-group v-else show-arrows>
          <v-slide-group-item v-for="queue in totem.queues">
            <QueueTotem width="400" :queue="queue"></QueueTotem>
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
      <v-col cols="12">
        <div class="d-flex align-center">
          <h2>Telas</h2>
          <v-spacer></v-spacer>
          total: {{ totem.screens.length }}
        </div>
        <div v-if="totem.screens.length === 0">Não há telas</div>
        <TotemScreensTable v-else :screens="totem.screens" />
      </v-col>
      <v-col cols="12">
        <div class="d-flex align-center">
          <h2>Logs</h2>
          <v-spacer></v-spacer>
          total: {{ totem.queues.length }}
        </div>
        <TotemLogsTable :hide-totem-header="true" :filters="{ totem_id: totem.id }" />
      </v-col>
    </v-row>
  </View>
</template>
<script lang="ts" setup>
import View from "@/components/View.vue";
import QueueTotem from "@/modules/totem/components/QueueTotem.vue";
import TotemScreensTable from "@/modules/totem/components/TotemScreensTable.vue";
import { findTotem } from "@/modules/totem/repositories/totem.repository";
import useTotemStore from "@/stores/alert";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import useSystemStore from "@/stores/system";
import TotemLogsTable from "../components/TotemLogsTable.vue";

const { setBreadcrumbs } = useSystemStore();
const { openAlert } = useTotemStore();

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

const actions = reactive([
  {
    title: "Gerenciar Filas",
    slug: "totem.queue.view",
    to: {
      name: "queue.detail",
    },
  },
  {
    title: "Gerenciar telas",
    slug: "totem.screen.view",
    to: {
      name: "screen.totem.manager",
      params: {
        id: computed(() => totem.value.id),
      },
    },
  },
]);

const route: any = useRoute();

onMounted(() => {
  loadTotem();
});

function loadTotem() {
  setBreadcrumbs([
    {
      title: "Totens",
      to: {
        name: "totem.view",
      },
    },
    {
      title: computed(() =>
        totem.value.id ? totem.value.name : route.params.id
      ),
      to: {
        name: "totem.detail",
      },
    },
  ]);
  findTotem(Number(route.params.id))
    .then((response: any) => {
      totem.value = response.data;
    })
    .catch((error: any) => {
      openAlert("Erro", error);
    });
}
</script>
