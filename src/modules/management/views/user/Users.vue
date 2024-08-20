<template>
    <LayoutView icon="mdi-account-multiple" title="Usuários">
        <template #action>
            <v-btn color="primary" @click="dialog = true" v-if="authorization.acl('user.create')">
                Novo usuário
            </v-btn>
        </template>
        <template #content>
            <v-data-table-server :headers="headers" :items="filteredUsers" hover :loading="tableLoading"
                :items-length="paginate.total" v-model:items-per-page="paginate.per_page"
                v-model:page="paginate.current_page" @update:itemsPerPage="loadUsers" @update:page="loadUsers">
                <template #top>
                    <v-row>
                        <v-col cols="12" md="4" class="d-flex align-center">
                            <v-text-field density="compact" hide-details="auto" placeholder="Pesquisar..."
                                append-inner-icon="mdi-magnify" variant="outlined" v-model="search"></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" md="2" class="d-flex align-center justify-end">

                        </v-col>
                    </v-row>
                </template>
                <template #item.tenants="{ item }">
                    <v-chip-group>
                        <v-chip v-for="(tenant) in item.tenants" size="small" class="stop-pointer-events">
                            {{ tenant.name }}
                        </v-chip>
                    </v-chip-group>
                </template>
                <template #item.actions="{ item }">
                    <v-menu location="right" v-if="authorization.acl('user.update') || authorization.acl('user.delete')">
                        <template v-slot:activator="{ props }">
                            <v-btn icon="mdi-dots-horizontal" variant="plain" v-bind="props"></v-btn>
                        </template>
                        <v-list>
                            <template v-for="(action) in tableActions">
                                <v-list-item @click="action.action({ ...item })"
                                    v-if="action.show ? action.show() : true">
                                    <v-list-item-title>{{ action.title }}</v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-menu>
                </template>
            </v-data-table-server>
            <UsersDialog v-model="dialog" v-model:user="user" @close="close" />
        </template>
    </LayoutView>
</template>
<script setup lang="ts">
// import { errorMessage, successMessage } from '@/helpers/alert';
import LayoutView from '@/components/LayoutView.vue';
import UsersDialog from '@/modules/management/components/users/UsersDialog.vue';
import { deleteUser, getAllUsersPaginate } from '@/modules/management/repositories/user.repository';
import useAlertStore from "@/stores/alert";
import { useSystemStore } from "@/stores/system";
import { computed, onMounted, ref } from 'vue';
import authorization from '@/plugins/authorization';

const dialog = ref<boolean>(false);
const loading = ref<boolean>(false);
const tableLoading = ref<boolean>(false);
const search = ref<string>('');
const users = ref<User[]>([]);
const paginate = ref({
    current_page: 1,
    per_page: 10,
    total: 0,
    to: 2
});

const { openDeleteAlert, closeAlert } = useAlertStore();

const { setBreadcrumbs } = useSystemStore()

setBreadcrumbs([
    { title: "Usuários", name: "true", to: "" },
]);
const headers: any[] = [
    {
        title: 'Nome',
        value: 'name',
    },
    {
        title: 'Email',
        value: 'email',
    },
    {
        title: 'Função',
        value: 'role.name',
    },
    {
        title: 'Tenants',
        value: 'tenants'
    },
    {
        value: 'actions',
        align: "center",
        width: "2%"
    }
];

const user = ref({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: {
        id: 0,
        name: "",
    },
    tenant_id: null,
    tenants: [],
    created_at: "",
    updated_at: "",
    scopes_count: 0,
    slugs: [],
});

const tableActions = [
    {
        title: 'Editar',
        action: (item: any) => {
            user.value = item;
            dialog.value = true;
        },
        show: () => authorization.acl('user.update')
    },
    {
        title: 'Excluir',
        show: () => authorization.acl('user.delete'),
        action: (item: User) => {
            openDeleteAlert(() => {
                loading.value = true;
                deleteUser(item.id)
                    .then(() => {
                        // successMessage('Grupo excluido com sucesso')
                        loadUsers()
                        closeAlert()
                    })
                    .catch(err => {
                        // errorMessage('Erro ao excluir grupo')
                        console.error(err)
                    })
                    .finally(() => {
                        loading.value = false;
                    })
            })

        }
    }
]


const filteredUsers = computed<User[]>(() => {
    let filteredItems: User[] = []
    if (search.value) {
        filteredItems = users.value.filter(user => {
            if (user.name?.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                return user
            }
        })
        return filteredItems
    }
    return users.value
})

function close() {
    user.value = {
        id: 0,
        name: "",
        email: "",
        password: "",
        role: {
            id: 0,
            name: "",
        },
        tenant_id: null,
        tenants: [],
        created_at: "",
        updated_at: "",
        scopes_count: 0,
        slugs: [],
    }
    dialog.value = false;
    loadUsers();
}

function loadUsers() {
    loading.value = true;
    tableLoading.value = true;
    getAllUsersPaginate({ ...paginate.value, includes: ['role', 'tenants'] })
        .then((response: any) => {
            users.value = response.data.data;
            paginate.value = {
                current_page: response.data.meta.current_page,
                per_page: response.data.meta.per_page,
                total: response.data.meta.total,
                to: response.data.meta.to
            };
        }).catch(() => {
            // errorMessage('Erro ao carregar os grupos de permissões');
        }).finally(() => {
            loading.value = false;
            tableLoading.value = false;
        });
};
onMounted(() => {
    loadUsers();
});

</script>
<style scoped lang="scss"></style>