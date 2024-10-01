<template>
	<View icon="mdi-monitor-multiple" title="Agentes">
		<v-data-table-server :headers="headers" :items="agents" hover :loading="tableLoading"
			:items-length="paginate.total" v-model:items-per-page="paginate.per_page"
			v-model:page="paginate.current_page" @update:itemsPerPage="loadAgents" @update:page="loadAgents">
			<template #top>
				<v-row>
					<v-col cols="12" md="4" class="d-flex align-center">
						<v-text-field density="compact" hide-details="auto" placeholder="Pesquisar por nome..."
							append-inner-icon="mdi-magnify" variant="outlined" v-model="search"
							@input="searchDebounce"></v-text-field>
					</v-col>
					<v-spacer></v-spacer>
					<v-col cols="12" md="2" class="d-flex align-center justify-end">
						<AgentFilters v-model="filters" @filter="filter" />
					</v-col>
				</v-row>
			</template>
			<template #item.created_at="{ item }">
				{{ item.created_at ? formatDate(new Date(item.created_at)) : "-" }}
			</template>
			<template #item.validated_at="{ item }">
				{{ item.validated_at ? formatDate(new Date(item.validated_at)) : "-" }}
			</template>

			<template #item.actions="{ item }">
				<v-menu location="right" v-if="authorization.acl('agent.update|agent.delete')">
					<template v-slot:activator="{ props }">
						<v-btn density="comfortable" icon="mdi-dots-horizontal" variant="plain" v-bind="props"></v-btn>
					</template>
					<v-list>
						<template v-for="action in tableActions">
							<v-list-item @click="action.action({ ...item })" v-if="action.show ? action.show() : true">
								<v-list-item-title>{{ action.title }}</v-list-item-title>
							</v-list-item>
						</template>
					</v-list>
				</v-menu>
			</template>
		</v-data-table-server>
		<AgentDialog v-model="dialog" :agent="agent" @close="close(true)" />
	</View>
</template>
<script setup lang="ts">
// import { errorMessage, successMessage } from '@/helpers/alert';
import View from "@/components/View.vue";
import { debounce } from "@/helpers/function";
import AgentDialog from "@/modules/management/components/agent/AgentDialog.vue";
import AgentFilters from "@/modules/management/components/agent/AgentFilters.vue";
import {
	getAllAgentsPaginate,
	deleteAgent
} from "@/modules/management/repositories/agent.repository";
import authorization from "@/plugins/authorization";
import useAlertStore from "@/stores/alert";
import { useSystemStore } from "@/stores/system";
import { onMounted, ref } from "vue";
import { formatDate } from '@/helpers/string'

const dialog = ref<boolean>(false);
const loading = ref<boolean>(false);
const tableLoading = ref<boolean>(false);
const search = ref<string>();
const agents = ref<Agent[]>([]);
const paginate = ref({
	current_page: 1,
	per_page: 10,
	total: 0,
	to: 2,
});

const { openDeleteAlert, closeAlert, openAlert } = useAlertStore();

const { setBreadcrumbs } = useSystemStore();

setBreadcrumbs([{ title: "Agentes", name: "true", to: "" }]);
const headers: any[] = [
	{
		title: "Nome",
		value: "name",
		width: "28%",
	},
	{
		title: "Status",
		value: "status.name",
		width: "20%",
	},
	{
		title: "Tenant",
		value: "tenant.name",
		width: "10%",
	},
	{
		title: "Criado em",
		value: "created_at",
		width: "20%",
	},
	{
		title: "Validado em",
		value: "validated_at",
		width: "10%",
	},
	{
		value: "actions",
		align: "center",
		width: "2%",
	},
];

const agent = ref<Agent>({
	id: 0,
	name: "",
	status: {
		id: 0,
		name: "",
		slug: ""
	},
	tenant: {
		id: 0,
		name: '',
		provider_uri: '',
		logo: '',
		theme: {},
		subdomain: '',
		updated_at: '',
		created_at: '',
	},
	serial: "",
	created_at: "",
	updated_at: "",
	validated_at: "",
	status_id: 0,
	tenant_id: 0,
});

const tableActions = [
	{
		title: "Editar",
		action: (item: Agent) => {
			agent.value = item;
			dialog.value = true;
		},
		show: () => authorization.acl("agent.update"),
	},
	{
		title: "Excluir",
		show: () => authorization.acl("agent.delete"),
		action: (item: Agent) => {
			openDeleteAlert(() => {
				loading.value = true;
				deleteAgent(item.id)
					.then(() => {
						loadAgents();
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
];

const filters = ref<string[]>([]);

function close(mustReload: boolean = false) {
	agent.value = {
		id: 0,
		name: "",
		status: {
			id: 0,
			name: "",
			slug: ""
		},
		tenant: {
			id: 0,
			name: '',
			provider_uri: '',
			logo: '',
			theme: {},
			subdomain: '',
			updated_at: '',
			created_at: '',
		},
		serial: "",
		created_at: "",
		updated_at: "",
		validated_at: "",
		status_id: 0,
		tenant_id: 0,
	};
	dialog.value = false;
	if (mustReload) loadAgents();
}

function loadAgents() {
	loading.value = true;
	tableLoading.value = true;
	getAllAgentsPaginate({
		...paginate.value,
		...filters.value,
		includes: ["status", "tenant"],
		search: search.value,
	})
		.then((response: any) => {
			agents.value = response.data.data;
			paginate.value = {
				current_page: response.data.current_page,
				per_page: response.data.per_page,
				total: response.data.total,
				to: response.data.to,
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

function filter() {
	loadAgents()
}

const searchDebounce = debounce(() => {
	if (search.value === "") {
		search.value = undefined;
	}
	loadAgents();
}, 300);

onMounted(() => {
	loadAgents();
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