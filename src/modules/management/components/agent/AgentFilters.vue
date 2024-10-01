<template>
	<v-menu v-model="menu" :close-on-content-click="false">
		<template v-slot:activator="{ props }">
			<v-btn icon="mdi-filter" variant="text" v-bind="props">
			</v-btn>
		</template>
		<v-card width="400">
			<v-card-title class="d-flex align-center">
				<span class="text-h6">Filtros</span>
				<v-spacer />
				<v-btn icon="mdi-close" variant="text" density="compact" @click="menu = false"></v-btn>
			</v-card-title>
			<v-card-text class="pa-1">
				<Form :form="form" v-model="filters" />
			</v-card-text>
			<v-card-actions class="d-flex align-center">
				<v-spacer />
				<v-btn variant="text" @click="clear">Limpar</v-btn>
				<v-btn color="primary" @click="filter">Filtrar</v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import useAuthStore from '@/stores/user';
import { storeToRefs } from 'pinia';
import { getAllStatusPaginate } from "@/repositories/status.repository";
import Form from "@/components/FormBuilder/Form.vue"

interface Emits {
	(e: 'close', value: boolean): void;
	(e: 'filter', value: string[]): void;
}

const emit = defineEmits<Emits>();

const filters = defineModel<string[]>({
	required: true
});

const authStore = useAuthStore();

const {
	user: authUser
} = storeToRefs(authStore);

const menu = ref<boolean>(false);
const loadings = ref({
	status: false
});

const status = ref<Status[]>([]);


const form = computed<FormItem[]>(() => {
	return [
		{
			component: "VAutocomplete",
			value: "tenant_ids",
			label: "Tenant",
			props: {
				multiple: true,
				items: authUser.value.tenants,
				'item-title': 'name',
				'item-value': 'id',
			},
		},
		{
			component: "VAutocomplete",
			value: "status_ids",
			label: "Status",
			props: {
				multiple: true,
				items: status.value,
				'item-title': 'name',
				'item-value': 'id',
				loading: loadings.value.status
			},
		},
	]
});

function filter() {
	emit('filter', filters.value);
	menu.value = false;
}

function clear() {
	filters.value = [];
	emit('filter', filters.value);
	menu.value = false;
}

function loadStatus() {
	if (status.value.length) return;
	loadings.value.status = true;
	getAllStatusPaginate({ page: 1, per_page: 1000 })
		.then((response) => {
			status.value = response.data.data;
		})
		.catch((err) => {
			console.error(err);
		})
		.finally(() => {
			loadings.value.status = false;
		});
}

watch(() => menu.value, (val) => {
	if (val) {
		loadStatus();
	}
}, { immediate: true });

</script>
<style scoped lang="scss"></style>