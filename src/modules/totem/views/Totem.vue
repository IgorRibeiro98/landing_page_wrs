<template>
  <View
    title="Totens"
    icon="mdi-monitor-vertical"
    btnActionText="Novo Totem"
    btnActionAcl="totem.create"
    @click:btnAction="dialog = true"
  >
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :items-per-page="-1"
    >
      <template #top>
        <Form v-model="form.value" :form="form.inputs"> </Form>
      </template>

      <template #[`item.name`]="{ item }">
        <RouterLink :to="{ name: 'totem.detail', params: { id: item.id } }">
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
            <template v-for="(option, index) in options">
              <v-list-item
                link
                @click="option.action(item)"
                :key="index"
                v-if="authorization.acl(option.slug)"
              >
                <v-list-item-title>
                  {{ option.title }}
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </template>

      <template #bottom> </template>
    </v-data-table>

    <TotemDialog
      @close="clearTotem"
      @save="
        loadTotens(false);
        clearTotem();
      "
      v-model:totem="totem"
      v-model="dialog"
    ></TotemDialog>
  </View>
</template>

<script lang="ts" setup>
import { debounce } from "@/helpers/function";
import TotemDialog from "@/modules/totem/components/TotemDialog.vue";
import {
  deleteTotem,
  getTotem,
} from "@/modules/totem/repositories/totem.repository";
import useAlertStore from "@/stores/alert";
import useSystemStore from "@/stores/system";
import { onMounted, ref, type Ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import authorization from "@/plugins/authorization";

import { getSites } from "@/modules/patient/repositories/tasy.repository";

import Form from "@/components/FormBuilder/Form.vue";
import View from "@/components/View.vue";

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
const router = useRouter();
const totem = ref<TotemItem>({
  name: "",
  description: "",
  id: 0,
  department_id: null,
  site_id: null,
  queues_count: 0,
  screens_count: 0,
  updated_at: "",
});
const { setBreadcrumbs } = useSystemStore();

const loading = ref<boolean>(true);
const items = ref<TotemList>([]);
const dialog = ref<boolean>(false);

const filters = ref<TotemFilter>({
  site_id: null,
});

const debounceLoadTotens = debounce(() => {
  loadTotens();
}, 300);

const form = ref<{
  value: Ref<TotemFilter>;
  inputs: FormItem[];
}>({
  value: filters,
  inputs: [
    (() => {
      const input: FormItem = {
        component: "VTextField",
        value: "site_id",
        label: "Estabelecimento (ERP)",
        props: {
          "item-value": "id",
          "item-title": "name",
          items: [],
          clearable: true,
        },
        cols: {
          cols: 12,
          md: 4,
        },
        request: getSites,
        on: {
          "update:modelValue": function (_: any) {
            if (!input.props?.items?.length) return;

            loadTotens();
          },
          "click:clear": () => loadTotens(),
          keyup: (_: any) => debounceLoadTotens(),
        },
      };

      return input;
    })(),
  ],
});

function loadTotens(mustLoading = true) {
  if (mustLoading) loading.value = true;

  getTotem(filters.value)
    .then((resp) => {
      items.value = resp.data;
    })
    .catch((error) => {
      openAlert("Erro ao carregar totens", error);
    })
    .finally(() => {
      loading.value = false;
    });
}

const options = ref<any>([
  {
    title: "Editar",
    slug: "totem.update",
    action: (totemClicked: TotemItem) => {
      totem.value = { ...totemClicked };
      dialog.value = true;
    },
  },
  {
    title: "Excluir",
    slug: "totem.delete",
    action: (totem: TotemItem) => {
      openConfirmAlert(
        {
          title: "Excluir Totem",
          text: `Deseja realmente excluir o totem <span class="text-no-wrap bg-primary pa-1 rounded">${totem.name}</span>?`,
        },
        (loading: Ref<boolean>) => {
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
        }
      );
    },
  },
  {
    title: "Executar",
    slug: "totem.view",
    action(totem: TotemItem) {
      router.push({
        name: "totem.run",
        params: { id: totem.id },
      });
    },
  },
]);

function clearTotem() {
  totem.value = {
    name: "",
    description: "",
    id: 0,
    department_id: null,
    site_id: null,
    queues_count: 0,
    screens_count: 0,
    updated_at: "",
  };
}

onMounted(() => {
  loadTotens();

  setBreadcrumbs([{ title: "Totens", name: "true", to: "" }]);
});
</script>
