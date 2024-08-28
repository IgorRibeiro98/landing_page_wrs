<template>
  <View
    title="Tenant"
    icon="mdi-city-variant-outline"
    btnActionText="Novo Tenant"
    btnActionAcl="tenant.create"
    @click:btnAction="router.push({ name: 'tenant.create' })"
  >
    <v-data-table-server
      :headers="headers"
      :items="tenants"
      hover
      :loading="loading"
      :items-length="paginate.total"
      v-model:items-per-page="paginate.per_page"
      v-model:page="paginate.current_page"
      @update:itemsPerPage="loadTenants"
      @update:page="loadTenants"
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
      <template #[`item.name`]="{ item }">
        <div class="d-flex align-center">
          <v-img
            max-width="40"
            width="40"
            max-height="40"
            height="40"
            class="rounded-lg mr-4 border"
            :src="(item.logo as string)"
          ></v-img>
          <RouterLink :to="{ name: 'totem.detail', params: { id: item.id } }">
            {{ item.name }}
          </RouterLink>
        </div>
      </template>
      <template #[`item.subdomain`]="{ item }">
        <div class="d-flex align-center">
          <a
            target="_blank"
            :href="getTenantLink(item.subdomain).concat('/#/totem')"
            >{{ getTenantLink(item.subdomain) }}
            <v-icon size="15" icon="mdi-open-in-new" class="ml-2"></v-icon
          ></a>
        </div>
      </template>
      <template #item.actions="{ item }">
        <v-menu v-if="tableActions.some((a) => a.show)">
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
                v-if="action.show !== undefined ? action.show : true"
              >
                <v-list-item-title>{{ action.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </template>
    </v-data-table-server>
  </View>
</template>

<script setup lang="ts">
/**
 * @todo Implementar a pesquisa e update de tenants
 * fazer validação no bootstrap se o tenant existir, se não existir, exibir uma
 * mensagem correta e mostrar o botão para ser encaminhado para o login
 */

import View from "@/components/View.vue";
import { debounce } from '@/helpers/function';
import authorization from "@/plugins/authorization";
import useAlertStore from "@/stores/alert";
import useAuthStore from "@/stores/user";
import { onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import {
  deleteTenant,
  paginateTenants,
} from "../repositories/tenant.repository";

const headers = ref([
  { title: "Nome", value: "name", width: "23%" },
  { title: "Subdomínio", value: "subdomain", width: "20%" },
  { title: "Url do agente", value: "provider_uri", width: "20%" },
  { title: "Qtd. Usuários", value: "users_count", width: "10%" },
  { title: "Criado em", value: "created_at", width: "20%" },
  { title: "", value: "actions", sortable: false, width: "7%" },
]);

const loading = ref(false);

const paginate = ref({
  current_page: 1,
  per_page: 10,
  total: 0,
});

const router = useRouter();
const tenants = ref<Tenant[]>([]);
const { openConfirmAlert, openAlert, closeAlert } = useAlertStore();

const search = ref("");
const authStore = useAuthStore();

const tableActions = ref([
  {
    title: "Editar",
    action: (tenant: Tenant) => {
      console.log("Edit", tenant);
    },
    show: false,
    // show: authorization.acl("tenant.update"),
  },
  {
    title: "Excluir",
    action: (tenant: Tenant) => {
      removeTenant(tenant);
    },
    show: authorization.acl("tenant.delete"),
  },
]);

function loadTenants() {
  loading.value = true;
  paginateTenants({
    page: paginate.value.current_page,
    per_page: paginate.value.per_page,
    search: search.value,
    with_users_count: true,
  })
    .then((response) => {
      tenants.value = response.data.data;
      paginate.value.total = response.data.meta.total;
    })
    .catch((error) => {
      openAlert("Erro ao carregar os tenants", error);
    })
    .finally(() => {
      loading.value = false;
    });
}

function getTenantLink(subdomain: string) {
  try {
    const port = import.meta.env.VITE_APP_PORT;
    const rawDomain = import.meta.env.VITE_APP_HOST;
    const domain = rawDomain.concat(port ? `:${port}` : "");

    const subdomainOfMainDomain = rawDomain.split(".")[0];

    subdomain = subdomain === subdomainOfMainDomain ? "" : subdomain.concat(".");
    const protocol = import.meta.env.DEV ? "http" : "https";
    return `${protocol}://${subdomain}${domain}`;
  } catch (e) {
    return "error";
  }
}

function removeTenant(tenant: Tenant) {
  openConfirmAlert(
    {
      title: "Excluir Tenant",
      text: `Deseja realmente excluir o tenant <span class="text-no-wrap bg-primary pa-1 rounded">${tenant.name}</span>?`,
    },
    (loading: Ref<boolean>) => {
      loading.value = true;
      deleteTenant(tenant)
        .then(() => {
          const index = authStore.authUser.tenants?.findIndex(
            (t) => t.id === tenant.id
          );
          if (index) {
            authStore.authUser.tenants?.splice(index, 1);
          }

          closeAlert();
          loadTenants();
        })
        .catch((error) => {
          openAlert("Erro ao excluir o tenant", error);
        })
        .finally(() => {
          loading.value = false;
        });
    }
  );
}

const searchDebounce = debounce(() => {
    loadTenants();
  }, 300)

onMounted(() => {
  loadTenants();
});
</script>
