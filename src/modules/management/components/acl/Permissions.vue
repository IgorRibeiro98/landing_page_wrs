<template>
    <div v-if="!loading">
        <template v-for="(category) in scopeCategoriesComputed">
            <v-row no-gutters>
                <v-col cols="12" class="pb-0 d-flex align-center">
                    <div class="mr-auto">
                        <span class="text-subtitle-1 font-weight-semi-bold pl-auto">{{ category.name
                            }}</span>
                    </div>
                    <div>
                        <v-switch v-model="category.isFullyMarked" @click="toggleAll(category)" label="Marcar todos"
                            hide-details="auto" density="compact" class="pa-1"></v-switch>
                    </div>

                </v-col>
                <v-col cols="12" md="3" v-for="(scope) in category.scopes">
                    <v-switch v-model="scopes" :label="scope.name" :value="scope.slug" hide-details="auto"
                        density="compact" class="pa-1 ml-2"></v-switch>
                </v-col>
            </v-row>
            <v-divider class="pb-3"></v-divider>
        </template>
    </div>
</template>
<script setup lang="ts">
// import { errorMessage } from '@/helpers/alert';
// import { capitalize } from '@/helpers/string';
import { getAllScopeCategories } from '@/modules/management/repositories/acl.repository';
import { computed, onMounted, ref } from 'vue';

interface ComponentScopeCategory extends ScopeCategory {
    isFullyMarked: boolean
}

interface Props {
    modelValue: Scope[]|string[]
}

interface Emits {
    (e: 'update:modelValue', value: Scope[]|string[]): void
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ([]),

});

const emit = defineEmits<Emits>();

const loading = ref<boolean>(false);

const scopeCategories = ref<Role[]>([]);
const scopeCategoriesComputed = computed(() => {
    return scopeCategories.value.map((category) => {
        return {
            ...category,
            isFullyMarked: categoryIsFullyMarked(category.scopes)
        }
    })
});
const scopes = defineModel<Scope[]|string[]>({
    required: true
});

const loadScopeCategories = () => {
    loading.value = true;
    getAllScopeCategories()
        .then((response: any) => {
            scopeCategories.value = response.data;
        }).catch((err: any) => {
            console.error(err);
            // errorMessage('Falha ao carregar categorias');
        }).finally(() => {
            loading.value = false;
        });
};

const categoryIsFullyMarked = (categoryScopes: Scope[]) => {
    return categoryScopes.every((categoryScope) => {
        return scopes.value.find(scope => scope === categoryScope.slug);
    });
};

const toggleAll = (category: ComponentScopeCategory) => {
    if (category.isFullyMarked) {
        return removeAllCategoryScopes(category);
    }
    markAll(category);

}
const markAll = (category: ComponentScopeCategory) => {

    const newScopes = category.scopes.filter((categoryScope) => {
        if (!scopes.value.find(scope => scope.slug === categoryScope.slug)) {
            return categoryScope
        }
    }).map(scope => scope.slug);

    if (newScopes.length !== 0) {
        scopes.value = [...scopes.value, ...newScopes];
    }

};

const removeAllCategoryScopes = (category: ComponentScopeCategory) => {
    const newScopes = scopes.value.filter((scope) => {
        return !category.scopes.find(categoryScope => categoryScope.slug === scope);
    });

    scopes.value = newScopes;
};

onMounted(() => {
    loadScopeCategories();
});

</script>
<style scoped lang="scss">
:deep(.v-switch label) {
    margin-left: 8px;
}
</style>
