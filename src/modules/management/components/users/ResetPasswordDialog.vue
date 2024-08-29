<template>
  <Dialog v-model="value" :form="form" :loading="loading"> </Dialog>
</template>
<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
import useAlertStore from "@/stores/alert";
import { computed, ref } from "vue";
import { resetUserPassword } from "../../repositories/user.repository";

interface Props {
  value: boolean;
  user: User;
}

interface Emit {
  (e: 'resetPassword'):void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const value = defineModel();
const userPasswords = ref({
  password: "",
  password_confirmation: "",
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const { openAlert } = useAlertStore();
const loading = ref(false);

const form = computed(() => {
  return {
    title: "Resetar senha",
    description: `Vamos resetar a senha de <b>${props.user.name}</b>, o mesmo terá que altera-la ao logar novamente.`,
    form: {
      value: userPasswords.value,
      inputs: [
        {
          component: "VTextField",
          value: "password",
          label: "Senha temporária",
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
          value: "password_confirmation",
          label: "Confirmação da senha temporária",
          required: true,
          props: {
            type: showConfirmPassword.value ? "text" : "password",
            rules: [
              (v: string) => {
                return (
                  v === userPasswords.value.password || "As senhas não conferem"
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
    submit() {
      resetPassword();
    },
  };
});

function resetPassword() {
  loading.value = true;
  resetUserPassword(props.user, userPasswords.value.password,)
    .then(() => {
      value.value = false;
      emit("resetPassword");
    })
    .catch((err) => {
      openAlert("Erro ao resetar senha", err);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
