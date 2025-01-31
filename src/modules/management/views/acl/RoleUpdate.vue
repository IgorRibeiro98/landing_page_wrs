<template>
    <Loading v-model="loading" />
    <Role v-if="!loading" v-model="role" @save="save" />
</template>
<script setup lang="ts">
import Role from '@/modules/management/components/acl/Role.vue';
import { getRole, updateRole } from '@/modules/management/repositories/acl.repository';
import Loading from '@/components/Loading.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


interface Props {
    id: string
}

const props = withDefaults(defineProps<Props>(), {
})

const router = useRouter();


const loading = ref<boolean>(false);
const role = ref<Role>({
    id: '',
    name: '',
    scopes: [],
    users: [],
    level: 1,
    is_default: true
})

const loadRole = () => {
    loading.value = true;
    getRole(props.id)
        .then((response: any) => {
            role.value = response.data;
            role.value.scopes = role.value.scopes.map(scope => scope.slug ? scope.slug : scope)
        }).catch((err: any) => {
            console.error(err);
            // errorMessage('Falha ao buscar grupo de permissões')
        }).finally(() => {
            loading.value = false;
        })
};

const save = () => {
  loading.value = true;
    updateRole(role.value)
        .then(() => {
            // successMessage('Grupo de permissões atualizado com sucesso')
            router.push({ name: 'management.acl' })
        }).catch((err: any) => {
            console.error(err)
            // errorMessage('Falha ao salvar grupo de permissões')
        })
        .finally(() => {
            loading.value = false;
        })
}

onMounted(() => {
    loadRole();
})


</script>
<style scoped lang="scss"></style>
