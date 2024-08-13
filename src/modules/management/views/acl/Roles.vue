<template>
    <LayoutView icon="mdi-shield-key-outline" title="ACL">
        <template #action>
            <v-btn color="primary" :to="{ name: 'management.acl.create' }">
                Nova Role
            </v-btn>
        </template>
        <template #content>
            <v-data-table-server :headers="headers" :items="filteredRoles" hover @click:row="goToRole"
                :loading="tableLoading" :items-length="paginate.total" v-model:items-per-page="paginate.per_page"
                @update:itemsPerPage="loadRoles" @update:page="loadRoles">
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
                <template #item.is_default="{ item }">
                    <span>{{ item.is_default ? 'Sim' : 'Não' }}</span>
                </template>
                <template #item.actions="{ item }">
                    <v-menu location="right">
                        <template v-slot:activator="{ props }">
                            <v-btn icon="mdi-dots-horizontal" variant="plain" v-bind="props"></v-btn>
                        </template>
                        <v-list>
                            <template v-for="(action) in tableActions">
                                <v-list-item @click="action.action({ ...item })"
                                    v-if="action.show ? action.show(item) : true">
                                    <v-list-item-title>{{ action.title }}</v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-menu>
                </template>
            </v-data-table-server>
        </template>

    </LayoutView>
</template>
<script setup lang="ts">
// import { errorMessage, successMessage } from '@/helpers/alert';
import LayoutView from '@/components/LayoutView.vue'
import { deleteRole, getAllRolesPaginate } from '@/modules/management/repositories/acl.repository';
import { useSystemStore } from "@/stores/system";
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const loading = ref<boolean>(false);
const tableLoading = ref<boolean>(false);
const search = ref<string>('');
const router = useRouter();
const roles = ref<Role[]>([]);
const paginate = ref({
    current_page: 1,
    per_page: 10,
    total: 0,
    to: 2
});

const { setBreadcrumbs } = useSystemStore()

setBreadcrumbs([
    { title: "ACL", name: "true", to: "" },
]);
const headers: any[] = [
    {
        title: 'Nome',
        value: 'name',
    },
    {
        title: 'Nível',
        value: 'level',
    },
    {
        title: 'Permissões',
        value: 'scopes_count',
    },
    {
        title: 'Padrão',
        value: 'is_default',
    },
    {
        value: 'actions',
        align: "center",
        width: "2%"
    }
];

const tableActions = [
    {
        title: 'Visualizar',

        action: (item: Role) => {
            router.push({ name: 'management.acl.edit', params: { id: item.id } })
        }
    },
    {
        title: 'Excluir',
        show: (item: Role) => {
            return !item.is_default
        },
        action: (item: Role) => {
            tableLoading.value = true;
            deleteRole(item.id!)
                .then(() => {
                    // successMessage('Grupo excluido com sucesso')
                    loadRoles()
                })
                .catch(err => {
                    // errorMessage('Erro ao excluir grupo')
                    console.error(err)
                })
                .finally(() => {
                    tableLoading.value = false;
                })
        }
    }
]


const filteredRoles = computed<Role[]>(() => {
    let filteredItems: Role[] = []
    if (search.value) {
        filteredItems = roles.value.filter(Role => {
            if (Role.name?.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
                return Role
            }
        })
        return filteredItems
    }
    return roles.value
})

const goToRole = (event: MouseEvent, item: any) => {
    const role: Role = item.item
    router.push({ name: 'management.acl.edit', params: { id: role.id } })
}

const loadRoles = () => {
    loading.value = true;
    tableLoading.value = true;
    getAllRolesPaginate(paginate.value)
        .then((response: any) => {
            roles.value = response.data.data;
            paginate.value = {
                current_page: response.data.current_page,
                per_page: response.data.per_page,
                total: response.data.total,
                to: response.data.to
            };
        }).catch(() => {
            // errorMessage('Erro ao carregar os grupos de permissões');
        }).finally(() => {
            loading.value = false;
            tableLoading.value = false;
        });
};
onMounted(() => {
    loadRoles();
});

</script>
<style scoped lang="scss"></style>