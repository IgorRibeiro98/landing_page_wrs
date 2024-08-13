<template>
    <Loading v-model="loading" />
    <Role v-if="!loading" v-model="role" @save="save" />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { getRole, updateRole } from '@/modules/management/repositories/acl.repository';
import Role from '@/modules/management/components/acl/Role.vue'
import Loading from '@/modules/patient/components/Loading.vue';


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
    updateRole(role.value)
        .then(() => {
            // successMessage('Grupo de permissões atualizado com sucesso')
            router.push({ name: 'management.acl' })
        }).catch((err: any) => {
            console.error(err)
            // errorMessage('Falha ao salvar grupo de permissões')
        })
}

onMounted(() => {
    loadRole();
})


</script>
<style scoped lang="scss"></style>