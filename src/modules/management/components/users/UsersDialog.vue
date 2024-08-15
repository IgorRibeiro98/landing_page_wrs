<template>
    <Dialog @close="close" :loading="loading" v-model="dialog" width="400" v-model:form="formDialog" />
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import useAuthStore from '@/stores/user';
import Dialog from "@/components/Dialog.vue";
import { storeToRefs } from 'pinia';
import { getAllRolesPaginate } from '@/modules/management/repositories/acl.repository';
import { createUser, updateUser } from '@/modules/management/repositories/user.repository';

interface Emits {
    (e: 'close'): void;
}

const emit = defineEmits<Emits>();


const dialog = defineModel<boolean>({
    required: true
})

const user = defineModel<User>('user', {
    required: true
})
const loading = ref<boolean>(false);
const roles = ref<Role[]>([]);
const authStore = useAuthStore();

const {
    user: authUser
} = storeToRefs(authStore);

const isEditing = computed(() => {
    if (user.value.id) {
        return true;
    }
    return false
});

const formDialog = computed<FormDialog>(() => {
    return {
        title: isEditing.value ? "Editar usuário" : "Novo usuário",
        form: {
            value: user.value,
            inputs: [
                {
                    component: "VTextField",
                    value: "name",
                    label: "Nome",
                    required: true,
                },
                {
                    component: "VTextField",
                    value: "email",
                    label: "Email",
                    required: true,
                    props: {
                        rules: "email",
                        disabled: isEditing.value
                    }
                },
                {
                    component: "VTextField",
                    value: "password",
                    label: "Senha temporária",
                    required: !isEditing.value,
                    hide: !isEditing.value,
                    props: {
                        rules: !isEditing.value ? "password" : "",
                    }
                },
                {
                    component: "VAutocomplete",
                    value: "tenants",
                    label: "Tenants",
                    required: true,
                    props: {
                        multiple: true,
                        chips: true,
                        closableChips: true,
                        items: authUser.value.tenants,
                        itemTitle: "name",
                        itemValue: "id",
                    },
                },
                {
                    component: "VAutocomplete",
                    value: "role_id",
                    label: "Função",
                    required: true,
                    props: {
                        items: roles.value,
                        'item-title': 'name',
                        'item-value': 'id',
                    },
                },
            ],
        },
        submit: () => save(),
    }
});

function getRoles() {
    getAllRolesPaginate({
        page: 1,
        per_page: 1000,
    }).then((response) => {
        roles.value = response.data.data;
    }).catch((err) => {
        console.error(err)
    });
}


function close() {
    emit('close');
    dialog.value = false;
}

function save() {
    loading.value = true;
    if (isEditing.value) {
        updateUser(user.value)
            .then(() => {
                close();
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                loading.value = false;
            });
        return;
    }
    createUser(user.value)
        .then(() => {
            close();
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            loading.value = false;
        });
}

onMounted(() => {
    getRoles();
})
</script>
<style lang="scss" scoped></style>