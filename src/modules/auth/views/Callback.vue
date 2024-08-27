<template>
  <div class="w-100 h-100 d-flex align-center justify-center">
    <v-sheet class="pa-4 text-center" rounded>
      <div v-if="!error.message">
        Aguarde que estamos te autenticando...

        <v-progress-linear indeterminate color="primary" class="mt-4">
        </v-progress-linear>
      </div>
      <div v-else>
        <SimpleError :message="error.message" :icon="error.icon" />

        <v-btn class="mt-5" v-if="error.showLoginBtn" color="primary" @click="login"> Voltar para login </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import SimpleError from "@/components/SimpleError.vue";
import { login, retriveToken } from "@/modules/auth/services/auth.service";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
const error = ref({
  message: "",
  icon: "mdi-alert-circle-outline",
  showLoginBtn: true
});

onMounted(() => {
  if (route.query.guardError) {
    error.value.message = "Você não tem permissão para acessar essa página.";
    return;
  }

  if (localStorage.accessToken) {
    router.push({
      name: "totem.view",
    });

    return;
  }

  isLoading.value = true;

  retriveToken({
    grant_type: "authorization_code",
    code: route.query.code as string,
    redirect_uri: window.location.origin + "/#/auth/callback",
    client_id: import.meta.env.VITE_APP_CLIENT_ID,
    code_verifier: sessionStorage.getItem("code_verifier")!,
  })
    .then(() => {
      router.push({
        name: "totem.view",
      });
    })
    .catch(() => {
      error.value.message =
        "Não foi possivel se autenticar, por favor tente novamente mais tarde.";
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>
