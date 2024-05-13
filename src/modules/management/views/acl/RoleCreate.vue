<template>
    <Role v-model="role" @save="save" :show-users-tab="false" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Role from '@/modules/management/components/acl/Role.vue'
import { createRole } from '@/modules/management/repositories/acl.repository';

const role = ref<Role>(
    {
        id: '',
        name: '',
        scopes: [],
        users: [],
        level: 1,
        is_default: false

    }
)

const router = useRouter()

const save = () => {
    createRole(role.value)
        .then(() => {
            router.push({ name: 'management.acl' })
        }).catch((err: any) => {
            // errorMessage('Falha ao salvar grupo de permissões')
        })
}
</script>
<style scoped lang="scss"></style>