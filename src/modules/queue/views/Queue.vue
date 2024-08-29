<template>
  <View icon="mdi-format-list-bulleted" title="Filas">
    <template #action>
      <v-btn
        color="primary"
        flat
        @click="dialog = true"
        v-if="authorization.acl('queue.create')"
      >
        Nova Fila
      </v-btn>
    </template>
    <v-data-table :headers="headers" :items="items" :loading="loading">
      <template #[`item.name`]="{ item }">
        <RouterLink :to="{ name: 'totem.view' }">
          {{ item.name }}
        </RouterLink>
      </template>
      <template #[`item.icon_src`]="{ item }">
        <v-img :src="item.icon_src" width="42"></v-img>
      </template>

      <template #[`item.updated_at`]="{ item }">
        <v-icon icon="mdi-calendar"></v-icon>
        {{ new Date(item.updated_at).toLocaleString() }}
      </template>

      <template #bottom> </template>

      <template #[`item.actions`]="{ item }: { item: Queue }">
        <v-menu v-if="authorization.acl('queue.update|queue.create')">
          <template #activator="{ props }">
            <v-btn icon="mdi-dots-horizontal" variant="text" v-bind="props">
            </v-btn>
          </template>

          <v-list>
            <template v-for="option in options">
              <v-list-item
                link
                @click="option.action(item)"
                v-if="option.show()"
              >
                <v-list-item-title>
                  {{ option.title }}
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </View>
  <QueueDialog @save="loadQueues(false)" v-model="dialog" v-model:queue="item">
  </QueueDialog>
</template>

<script lang="ts" setup>
import View from "@/components/View.vue";
import QueueDialog from "@/modules/queue/components/QueueDialog.vue";
import {
  deleteQueue,
  getQueues,
} from "@/modules/queue/repositories/queue.repository";
import authorization from "@/plugins/authorization";
import useAlertStore from "@/stores/alert";
import { useSystemStore } from "@/stores/system";
import { Ref, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const headers: any = [
  { title: "ID", value: "id", align: "start", width: "5%" },
  { title: "Nome", value: "name", align: "start", width: "25%" },
  { title: "Descrição", value: "description", align: "start", width: "40%" },
  { title: "Ícone", value: "icon_src", align: "start", width: "5%" },
  {
    title: "Última atualização",
    value: "updated_at",
    align: "start",
    width: "25%",
  },
  {
    title: "",
    value: "actions",
    align: "start",
    width: "10%",
  },
];

const { openAlert, closeAlert, openConfirmAlert } = useAlertStore();

const { setBreadcrumbs } = useSystemStore();

setBreadcrumbs([{ title: "Filas", name: "true", to: "" }]);

const dialog = ref<boolean>(false);

const loading = ref<boolean>(true);

const items = ref<QueueList>([]);

const item = ref<Queue>({
  id: 0,
  name: "",
  status: null,
  description: "",
  icon_src: "",
  created_at: "",
  updated_at: "",
});

const options = ref<any>([
  {
    title: "Editar",
    action: (queue: Queue) => {
      item.value = { ...queue };
      dialog.value = true;
    },
    show: () => authorization.acl("queue.update"),
  },
  {
    title: "Excluir",
    action: (queue: Queue) => {
      openConfirmAlert(
        {
          title: "Remover fila",
          text: `Deseja realmente remover a fila <span class="text-no-wrap bg-primary pa-1 rounded"> ${queue.name}</span>?`,
        },
        (loading: Ref<boolean>) => {
          loading.value = true;

          deleteQueue(queue.id).finally(() => {
            loading.value = false;
            closeAlert();
            loadQueues(false);
          });
        }
      );
    },
    show: () => authorization.acl("queue.delete"),
  },
]);

function loadQueues(mustLoading = true) {
  if (mustLoading) loading.value = true;

  getQueues()
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
  loadQueues();
});
</script>
