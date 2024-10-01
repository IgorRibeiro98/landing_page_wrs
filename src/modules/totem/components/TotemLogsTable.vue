<template>
  <v-data-table-server
    :headers="headers"
    :items="items"
    hover
    :loading="loading"
    :items-length="paginate.total"
    v-model:items-per-page="paginate.per_page"
    v-model:page="paginate.page"
    @update:itemsPerPage="loadLogs"
    @update:page="loadLogs"
  >
    <template #item.type="{ item }">
      <v-icon :color="item.type === 'error' ? 'red' : 'green'">
        {{ item.type === "error" ? "mdi-alert-circle" : "mdi-check-circle" }}
      </v-icon>
    </template>
    <template #item.actions="{ item }">
      <MenuOptions :items="tableActions" :action-args="true" />
    </template>
  </v-data-table-server>
</template>
<script lang="ts" setup>
import MenuOptions from "@/components/MenuOptions.vue";
import { computed, onMounted, ref } from "vue";
import { getLogs } from "../repositories/totem.repository";

interface Props {
  filters?: {
    [key: string]: string | number;
  };
  hideTotemHeader?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  filters: undefined,
  hideTotemHeader: false,
});

interface Log {
  id: number;
  type: string;
  title: string;
  identifier: string;
  created_at: string;
  totem: {
    name: string;
  };
}

const headers = computed<any[]>(() => {
  return [
    { title: "", value: "type", width: "5%" },
    { title: "ID", value: "id", width: props.hideTotemHeader ? "25%" : "12%" },
    { title: "Título", value: "title", width: "25%" },
    { title: "Identificador", value: "identifier", width: "20%" },
    {
      title: "Totem",
      value: "totem.name",
      width: "13%",
      show: !props.hideTotemHeader,
    },
    { title: "Criado em", value: "created_at", width: "20%" },
    { title: "", value: "actions", width: "5", align: "end" },
  ].filter((header) => (header.show !== undefined ? header.show : true));
});

const tableActions: MenuItem<Log>[] = [
  {
    title: "Visualizar",
    action: (item) => {
      console.log("visualizar", item);
    },
  },
  {
    title: "Download",
    action: () => {
      console.log("download");
    },
  },
];

const loading = ref(false);
const items = ref<Log[]>([]);
const paginate = ref({
  page: 1,
  per_page: 10,
  total: 0,
});

function loadLogs() {
  loading.value = true;
  getLogs({ ...props.filters, ...paginate.value })
    .then((response) => {
      const { data, meta } = response.data;
      items.value = data;

      const { per_page, total, current_page: page } = meta;
      paginate.value = {
        per_page,
        total,
        page,
      };
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
}

onMounted(() => {
  loadLogs();
});
</script>
