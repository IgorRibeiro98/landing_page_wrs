<template>
    <Dialog @close="close" :loading="loading" v-model="dialog" width="400" v-model:form="formDialog" />
</template>
<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import { getAllRolesPaginate } from '@/modules/management/repositories/acl.repository';
import { createUser, updateUser } from '@/modules/management/repositories/user.repository';
import useAlertStore from "@/stores/alert";
import useAuthStore from '@/stores/user';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

interface Emits {
    (e: 'close', value: boolean): void;
}

const emit = defineEmits<Emits>();


const dialog = defineModel<boolean>({
    required: true
})

const user = defineModel<User>('user', {
    required: true
})

const { openAlert } = useAlertStore();

const loading = ref<boolean>(false);
const roles = ref<Role[]>([]);
const authStore = useAuthStore();

const {
    user: authUser
} = storeToRefs(authStore);
const showPassword  = ref(false);
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
                        type: showPassword.value ? 'text' : 'password',
                        'append-inner-icon': showPassword.value ? 'mdi-eye-off' : 'mdi-eye',
                        rules: !isEditing.value ? "password" : "",
                    },
                    on: {
                        'click:appendInner': () => {
                            showPassword.value = !showPassword.value
                        }
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


function close(mustReload = false) {
    emit('close', mustReload);
    dialog.value = false;
}

function save() {
    loading.value = true;
    if (isEditing.value) {
        updateUser(user.value)
            .then(() => {
                close(true);
            }).catch((err) => {
                if (err.response.status === 403) {
                    openAlert("Erro ao editar usuário", err.response.data.message);
                }
                console.error(err);
            }).finally(() => {
                loading.value = false;
            });
        return;
    }
    createUser(user.value)
        .then(() => {
            close(true);
        }).catch((err) => {
            if (err.response.status === 403) {
                openAlert("Erro ao editar usuário", err.response.data.message);
            }
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
