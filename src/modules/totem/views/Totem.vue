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
          <template #item.actions="{ item }">
            <v-menu left>
              <template #activator="{ props }">
                <v-btn v-bind="props" icon="mdi-dots-horizontal" variant="text">
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  link
                  @click="option.action(item)"
                  v-for="option in options"
                >
                  <v-list-item-title>
                    {{ option.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>

          <template #bottom> </template>
        </v-data-table>
      </v-col>
    </v-row>
    <TotemDialog
      @close="clearTotem"
      @save="
        loadTotens(false);
        clearTotem();
      "
      v-model:totem="totem"
      v-model="dialog"
    ></TotemDialog>
  </v-sheet>
</template>

<script lang="ts" setup>
import TotemDialog from "@/modules/totem/components/TotemDialog.vue";
import {
  deleteTotem,
  getTotem,
} from "@/modules/totem/repositories/totem.repository";
import useAlertStore from "@/stores/alert";
import useSystemStore from "@/stores/system";
import { onMounted, ref, type Ref } from "vue";
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
    width: "13%",
  },
  { title: "", value: "actions", align: "center", width: "2%" },
];

const { openAlert, closeAlert, openConfirmAlert } = useAlertStore();

const totem = ref<TotemItem>({
  name: "",
  description: "",
  id: 0,
  queues_count: 0,
  screens_count: 0,
  updated_at: "",
});
const { setBreadcrumbs } = useSystemStore();

const loading = ref<boolean>(true);
const items = ref<TotemList>([]);
const dialog = ref<boolean>(false);


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

const options = ref<any>([
  {
    title: "Editar",
    action: (totemClicked: TotemItem) => {
      totem.value = { ...totemClicked }
      dialog.value = true;
    },
  },
  {
    title: "Excluir",
    action: (totem: TotemItem) => {
      openConfirmAlert({
        title: 'Excluir Totem',
        text: `Deseja realmente excluir o totem <span class="text-no-wrap bg-primary pa-1 rounded">${totem.name}</span>?`
      }, (loading: Ref<boolean>) => {
        loading.value = true;
        deleteTotem(totem.id)
          .then(() => {
            loadTotens(false);
            clearTotem();
            closeAlert();
          })
          .catch((error) => {
            openAlert("Erro ao excluir totem", error);
          })
          .finally(() => {
            loading.value = false;
          });
      })
    }
  }
])

function clearTotem() {
  totem.value = {
    name: "",
    description: "",
    id: 0,
    queues_count: 0,
    screens_count: 0,
    updated_at: "",
  };
}

onMounted(() => {
  loadTotens();

  setBreadcrumbs([
    { title: "Totens", name: "true", to: "" },
    { title: "wdwq", name: "dwqqwdq", to: "" },
    { title: "Totens", name: "true", to: "" },
  ]);
});
</script>
