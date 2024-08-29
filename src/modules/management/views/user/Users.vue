<template>
  <View icon="mdi-account-multiple" title="Usuários">
    <template #action>
      <v-btn
        color="primary"
        @click="dialog = true"
        v-if="authorization.acl('user.create')"
      >
        Novo usuário
      </v-btn>
    </template>
    <v-data-table-server
      :headers="headers"
      :items="users"
      hover
      :loading="tableLoading"
      :items-length="paginate.total"
      v-model:items-per-page="paginate.per_page"
      v-model:page="paginate.current_page"
      @update:itemsPerPage="loadUsers"
      @update:page="loadUsers"
    >
      <template #top>
        <v-row>
          <v-col cols="12" md="4" class="d-flex align-center">
            <v-text-field
              density="compact"
              hide-details="auto"
              placeholder="Pesquisar por nome..."
              append-inner-icon="mdi-magnify"
              variant="outlined"
              v-model="search"
              @input="searchDebounce"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="2" class="d-flex align-center justify-end">
          </v-col>
        </v-row>
      </template>
      <template #item.first_login="{ item }">
        <v-chip :color="item.first_login ? 'secondary' : 'primary'">{{
          item.first_login ? "Não" : "Sim"
        }}</v-chip>
      </template>
      <template #item.tenants="{ item }">
        <v-chip-group class="group">
          <v-chip
            v-for="tenant in item.tenants"
            size="small"
            class="stop-pointer-events"
          >
            {{ tenant.name }}
          </v-chip>
        </v-chip-group>
      </template>
      <template #item.actions="{ item }">
        <v-menu
          location="right"
          v-if="authorization.acl('user.update|user.delete')"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              density="comfortable"
              icon="mdi-dots-horizontal"
              variant="plain"
              v-bind="props"
            ></v-btn>
          </template>
          <v-list>
            <template v-for="action in tableActions">
              <v-list-item
                @click="action.action({ ...item })"
                v-if="action.show ? action.show() : true"
              >
                <v-list-item-title>{{ action.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </template>
    </v-data-table-server>
    <ResetPasswordDialog
      v-model="resetPasswordDialog"
      :user="user"
      @resetPassword="loadUsers"
    />
    <UsersDialog v-model="dialog" v-model:user="user" @close="close" />
  </View>
</template>
<script setup lang="ts">
// import { errorMessage, successMessage } from '@/helpers/alert';
import View from "@/components/View.vue";
import { debounce } from "@/helpers/function";
import UsersDialog from "@/modules/management/components/users/UsersDialog.vue";
import {
  deleteUser,
  getAllUsersPaginate,
} from "@/modules/management/repositories/user.repository";
import authorization from "@/plugins/authorization";
import useAlertStore from "@/stores/alert";
import { useSystemStore } from "@/stores/system";
import { onMounted, ref } from "vue";
import ResetPasswordDialog from "../../components/users/ResetPasswordDialog.vue";

const dialog = ref<boolean>(false);
const resetPasswordDialog = ref(false);
const loading = ref<boolean>(false);
const tableLoading = ref<boolean>(false);
const search = ref<string>("");
const users = ref<User[]>([]);
const paginate = ref({
  current_page: 1,
  per_page: 10,
  total: 0,
  to: 2,
});

const { openDeleteAlert, closeAlert, openAlert } = useAlertStore();

const { setBreadcrumbs } = useSystemStore();

setBreadcrumbs([{ title: "Usuários", name: "true", to: "" }]);
const headers: any[] = [
  {
    title: "Nome",
    value: "name",
    width: "28%",
  },
  {
    title: "Email",
    value: "email",
    width: "20%",
  },
  {
    title: "Concluiu cadastro",
    value: "first_login",
    width: "10%",
  },
  {
    title: "Função",
    value: "role.name",
    width: "10%",
  },
  {
    title: "Tenants",
    value: "tenants",
    width: "20%",
  },
  {
    value: "actions",
    align: "center",
    width: "2%",
  },
];

const user = ref<User>({
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
    title: "Editar",
    action: (item: any) => {
      user.value = item;
      dialog.value = true;
    },
    show: () => authorization.acl("user.update"),
  },
  {
    title: "Excluir",
    show: () => authorization.acl("user.delete"),
    action: (item: User) => {
      openDeleteAlert(() => {
        loading.value = true;
        deleteUser(item.id)
          .then(() => {
            loadUsers();
            closeAlert();
          })
          .catch((err) => {
            openAlert("Erro ao excluir usuário", err);
          })
          .finally(() => {
            loading.value = false;
          });
      });
    },
  },
  {
    title: "Resetar senha",
    show: () => authorization.acl("user.reset_password"),
    action(item: User) {
      user.value = item;
      resetPasswordDialog.value = true;
    },
  },
];

function close(mustReload: boolean = false) {
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
  };
  dialog.value = false;
  if (mustReload) loadUsers();
}

function loadUsers() {
  loading.value = true;
  tableLoading.value = true;
  getAllUsersPaginate({
    ...paginate.value,
    includes: ["role", "tenants"],
    search: search.value,
  })
    .then((response: any) => {
      users.value = response.data.data;
      paginate.value = {
        current_page: response.data.meta.current_page,
        per_page: response.data.meta.per_page,
        total: response.data.meta.total,
        to: response.data.meta.to,
      };
    })
    .catch((err) => {
      openAlert("Erro ao carregar os usuários", err);
    })
    .finally(() => {
      loading.value = false;
      tableLoading.value = false;
    });
}

const searchDebounce = debounce(() => {
  loadUsers();
}, 300);

onMounted(() => {
  loadUsers();
});
</script>
<style scoped lang="scss">
:deep(.group) {
  padding: 0;

  .v-slide-group__container {
    padding: 0;
  }
}
</style>
