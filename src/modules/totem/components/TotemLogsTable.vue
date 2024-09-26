<template>
  <v-data-table-server
    :headers="headers"
    :items="items"
    hover
    :loading="loading"
    :items-length="paginate.total"
    v-model:items-per-page="paginate.per_page"
    v-model:page="paginate.current_page"
    @update:itemsPerPage="loadLogs"
    @update:page="loadLogs"
  ></v-data-table-server>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { getLogs } from "../repositories/totem.repository";
interface Props {
  filters?: {
    [key: string]: string | number;
  };
  hideTotemHeaders?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  filters: undefined,
  hideTotemHeader: false,
});

const headers = computed(() => {
  console.log(props.hideTotemHeader);
  return [
    { title: "ID", value: "id", width: "10%" },
    { title: "title", value: "title", width: "30%" },
    { title: "identifier", value: "identifier", width: "10%" },
    { title: "totem", value: "totem.name", width: "10%", show: !props.hideTotemHeader },
    { title: "error", value: "error", width: "20%" },
    { title: "entrada", value: "data", width: "10%" },
    { title: "created_at", value: "created_at", width: "10%" },
  ].filter((header) => header.show !== undefined ? header.show : true);
});

const loading = ref(false);
const items = ref([]);
const paginate = ref({
  current_page: 1,
  per_page: 10,
  total: 0,
});

function loadLogs() {
  loading.value = true;
  getLogs(props.filters)
    .then((response) => {
      const {data, ...paginateData} = response.data;
      items.value = data;
      paginate.value = paginateData;
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
