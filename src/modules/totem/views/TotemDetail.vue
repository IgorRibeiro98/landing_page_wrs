<template>
  <View
    :title="totem.name"
    enable-action
    :actions="actions"
    :description="totem.description"
  >
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
    title: "Gerenciar telas",
    to: {
      name: "screen.totem.manager",
      params: {
        id: computed(() => totem.value.id),
      },
    },
  },
]);

const route = useRoute();

onMounted(() => {
  loadTotem();
});

function loadTotem() {
  findTotem(Number(route.params.id))
    .then((response) => {
      totem.value = response.data;
    })
    .catch((error) => {
      openAlert("Erro", error);
    });
}
</script>
