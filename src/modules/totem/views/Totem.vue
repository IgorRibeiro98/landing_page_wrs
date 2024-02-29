<template>
  <v-sheet color="white" rounded>
    <v-row>
      <v-col class="d-flex align-center">
        <h1><v-icon icon="mdi-monitor-vertical"></v-icon> Totens</h1>

        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="dialog = true"> Novo </v-btn>
      </v-col>

      <v-col cols="12">
        <v-data-table :headers="headers" :items="items" :loading="loading">
          <template #[`item.name`]="{ item }">
            <RouterLink :to="{ name: 'totem.view' }">
              {{ item.name }}
            </RouterLink>
          </template>
          <template #[`item.queues_count`]="{ item }">
            <v-icon icon="mdi-format-list-bulleted"> </v-icon>
            {{ item.queues_count }}
          </template>

          <template #[`item.screens_count`]="{ item }">
            <v-icon icon="mdi-monitor"> </v-icon>
            {{ item.screens_count }}
          </template>

          <template #[`item.updated_at`]="{ item }">
            <v-icon icon="mdi-calendar"></v-icon>
            {{ new Date(item.updated_at).toLocaleString() }}
          </template>

          <template #bottom> </template>
        </v-data-table>
      </v-col>
    </v-row>
    <TotemDialog @save="loadTotens(false)" v-model="dialog"></TotemDialog>
  </v-sheet>
</template>

<script lang="ts" setup>
import TotemDialog from "@/modules/totem/components/TotemDialog.vue";
import { getTotem } from "@/modules/totem/repositories/totem.repository";
import useAlertStore from "@/stores/alert";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const headers: any = [
  { title: "ID", value: "id", align: "start", width: "5%" },
  { title: "Nome", value: "name", align: "start", width: "20%" },
  { title: "Descrição", value: "description", align: "start", width: "20%" },
  { title: "Filas", value: "queues_count", align: "start", width: "5%" },
  { title: "Telas", value: "screens_count", align: "start", width: "5%" },
  {
    title: "Última atualização",
    value: "updated_at",
    align: "start",
    width: "15%",
  },
];
const loading = ref<boolean>(true);
const items = ref<TotemList>([]);
const dialog = ref<boolean>(false);

const { openAlert } = useAlertStore();

function loadTotens(mustLoading = true) {
  if (mustLoading) loading.value = true;

  getTotem()
    .then((resp) => {
      items.value = resp.data;
    })
    .catch((error) => {
      console.log({ error });
      openAlert("Erro ao carregar totens", error);
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  loadTotens();
});
</script>
