<template>
    <Dialog @close="close" :loading="loading" v-model="dialog" width="400" v-model:form="formDialog" />
</template>
<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import { updateAgent } from '@/modules/management/repositories/agent.repository';
import { getAllStatusPaginate } from "@/repositories/status.repository";
import useAlertStore from "@/stores/alert";
import useAuthStore from '@/stores/user';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

interface Emits {
    (e: 'close', value: boolean): void;
}

const emit = defineEmits<Emits>();


const dialog = defineModel<boolean>({
    required: true
})

const agent = defineModel<Agent>('agent', {
    required: true
})

const { openAlert } = useAlertStore();

const loading = ref<boolean>(false);
const status = ref<Status[]>([]);
const authStore = useAuthStore();

const {
    user: authUser
} = storeToRefs(authStore);
const isEditing = computed(() => {
    if (agent.value.id) {
        return true;
    }
    return false
});

const formDialog = computed<FormDialog>(() => {
    return {
        title: isEditing.value ? "Editar Agente" : "Novo Agente",
        form: {
            value: agent.value,
            inputs: [
                {
                    component: "VTextField",
                    value: "name",
                    label: "Nome",
                    required: true,
                },
                // {
                //     component: "VAutocomplete",
                //     value: "tenants",
                //     label: "Tenants",
                //     required: true,
                //     props: {
                //         multiple: true,
                //         chips: true,
                //         closableChips: true,
                //         items: authUser.value.tenants,
                //         itemTitle: "name",
                //         itemValue: "id",
                //     },
                // },
                {
                    component: "VAutocomplete",
                    value: "status_id",
                    label: "Status",
                    required: true,
                    props: {
                        items: status.value,
                        'item-title': 'name',
                        'item-value': 'id',
                    },
                },
            ],
        },
        submit: () => save(),
    }
});

function getStatus() {
    getAllStatusPaginate({
        page: 1,
        per_page: 1000,
    }).then((response) => {
        status.value = response.data.data;
    }).catch((err) => {
        console.error(err)
    });
}


function close(mustReload = false) {
    emit('close', mustReload);
    dialog.value = false;
}

function save() {
    loading.value = true;
    if (isEditing.value) {
        updateAgent(agent.value)
            .then(() => {
                close(true);
            }).catch((err) => {
                if (err.response.status === 403) {
                    openAlert("Erro ao editar agente", err.response.data.message);
                }
                console.error(err);
            }).finally(() => {
                loading.value = false;
            });
        return;
    }
   
}

onMounted(() => {
    getStatus();
})
</script>
<style lang="scss" scoped></style>
