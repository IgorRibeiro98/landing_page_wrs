<template>
    <LayoutView icon="mdi-format-list-bulleted" title="Filas">
        <template #action>
            <v-btn color="primary" flat @click="dialog = true">
                Novo
            </v-btn>
        </template>
        <template #content>
            <v-data-table :headers="headers" :items="items" :loading="loading" @dblclick:row="openDialog">
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
            </v-data-table>
        </template>
    </LayoutView>
    <QueueDialog @save="loadQueues(false)" v-model="dialog" v-model:queue="item">
    </QueueDialog>
</template>

<script lang="ts" setup>
import LayoutView from '@/components/LayoutView.vue'
import QueueDialog from "@/modules/queue/components/QueueDialog.vue";
import { getQueues } from "@/modules/queue/repositories/queue.repository";
import useAlertStore from "@/stores/alert";
import { onMounted, ref } from "vue";
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
];
const loading = ref<boolean>(true);

const items = ref<QueueList>([]);

const item = ref<Queue>({
    id: 0,
    name: '',
    status: null,
    description: '',
    icon_src: '',
    created_at: '',
    updated_at: '',
})

const dialog = ref<boolean>(false);

const { openAlert } = useAlertStore();

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

function openDialog(event: MouseEvent, { item: queue }: { item: Queue }) {
    item.value = { ...queue }
    dialog.value = true
}

onMounted(() => {
    loadQueues();
});
</script>