<template>
    <DialogForm v-model="dialog" v-if="store.authUser.first_login" v-model:form="formDialog" :loading="loading" persistent hide-cancel>
    </DialogForm>
</template>

<script lang="ts" setup>
import DialogForm from '@/components/Dialog.vue'
import {ref, computed} from 'vue'

import useUserStore from '@/stores/user'

import { update } from '@/modules/auth/repositories/auth.repository'

const store = useUserStore()

const dialog = ref(true)

const loading = ref(false)

const user = ref({
    name: ''
})

const formDialog = computed<FormDialog>(() => {
    return {
        title: "Bem vindo ao autoatendimento",
        description: 'Para continuar, por favor faça a <b> redefinição da sua senha </b> e aproveite para atualizar os seus dados :)',
        form: {
            value: store.authUser,
            inputs: [
                {
                    component: "VTextField",
                    value: "email",
                    label: "E-mail",
                    required: true,
                    props: {
                        disabled: true
                    }
                },
                {
                    component: "VTextField",
                    value: "name",
                    label: "Nome",
                    required: true,
                },
                {
                    component: "VTextField",
                    value: "password",
                    label: "Senha",
                    required: true,
                    props: {
                        type: 'password',
                        rules: 'password'
                    }
                },
                {
                    component: "VTextField",
                    value: "confirmPassword",
                    label: "Confirmação da senha",
                    required: true,
                    props: {
                        type: 'password',
                        rules: [
                            (v: string) => {
                                return v === store.authUser.password || 'As senhas não conferem'
                            }
                        ]
                    }
                },
            ],
        },
        submit: () => save(),
    }
});

function save() {
    loading.value = true

    update(store.authUser)
        .then(res => {
            store.authUser.first_login = false

            delete store.authUser.password
            delete store.authUser.confirmPassword

            localStorage.setItem('user', JSON.stringify(store.authUser))

            dialog.value = false;
        })
        .catch(error => {
            console.log({error})
        })
        .finally(() => {
            loading.value = false
        })
}

</script>