<template>
  <DialogForm
    v-model="dialog"
    v-if="store.authUser.first_login"
    v-model:form="formDialog"
    :loading="loading"
    persistent
    hide-cancel
  >
  </DialogForm>
</template>

<script lang="ts" setup>
import DialogForm from "@/components/Dialog.vue";
import { computed, ref, watch } from "vue";

import useUserStore from "@/stores/user";

import { update } from "@/modules/auth/repositories/auth.repository";

const store = useUserStore();

const dialog = ref(true);

const loading = ref(false);

interface UpdateUser extends User {
  password?: string;
  confirmPassword?: string;
}

const user = ref<UpdateUser>({
  id: 0,
  name: "",
  email: "",
  email_verified_at: null,
  tenant_id: "",
  created_at: "",
  updated_at: "",
  scopes_count: 0,
  slugs: [],
  role: {},
  tenants: [],
  password: '',
  confirmPassword: '',
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const formDialog = computed<FormDialog>(() => {
  return {
    title: "Bem vindo ao autoatendimento",
    description:
      "Para continuar, por favor faça a <b> redefinição da sua senha </b> e aproveite para atualizar os seus dados :)",
    form: {
      value: user.value,
      inputs: [
        {
          component: "VTextField",
          value: "email",
          label: "E-mail",
          required: true,
          props: {
            disabled: true,
          },
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
            type: showPassword.value ? "text" : "password",
            rules: "password",
            "append-inner-icon": showPassword.value ? "mdi-eye-off" : "mdi-eye",
          },
          on: {
            "click:appendInner": () => {
              showPassword.value = !showPassword.value;
            },
          },
        },
        {
          component: "VTextField",
          value: "confirmPassword",
          label: "Confirmação da senha",
          required: true,
          props: {
            type: showConfirmPassword.value ? "text" : "password",
            rules: [
              (v: string) => {
                return (
                  v === user.value.password || "As senhas não conferem"
                );
              },
            ],
            "append-inner-icon": showConfirmPassword.value
              ? "mdi-eye-off"
              : "mdi-eye",
          },
          on: {
            "click:appendInner": () => {
              showConfirmPassword.value = !showConfirmPassword.value;
            },
          },
        },
      ],
    },
    submit: () => save(),
  };
});

function save() {
  loading.value = true;

  update({
    name: user.value.name,
    password: user.value.password!,
  })
    .then((res) => {
      user.value.first_login = false;

      delete user.value.password;
      delete user.value.confirmPassword;

      store.authUser = { ...user.value };
      localStorage.setItem("user", JSON.stringify(store.authUser));

      dialog.value = false;
    })
    .catch((error) => {
      console.log({ error });
    })
    .finally(() => {
      loading.value = false;
    });
}

watch(() => store.authUser.id, () => {
    user.value = { ...store.authUser };
}, { immediate: true });
</script>
