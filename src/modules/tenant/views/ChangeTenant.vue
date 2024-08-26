<template>
    <div class="w-100 h-100 d-flex align-center justify-center">
        <v-sheet class="pa-4 text-center" rounded width="400">
            <div v-if="!error">
                Aguarde que estamos te autenticando...

                <v-progress-linear indeterminate color="primary" class="mt-4">
                </v-progress-linear>
            </div>

            <div v-else>
                Não foi possivel se autenticar, por favor tente novamente mais tarde.

                <v-btn color="primary" @click="login">
                    Voltar para login
                </v-btn>
            </div>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { login, retriveToken } from '@/modules/auth/services/auth.service';

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
const error = ref(false)

onMounted(() => {
  if(localStorage.accessToken) {
    router.push({
      name: 'totem.view'
    })
    return
  }
    isLoading.value = true

    retriveToken({
        grant_type: 'authorization_code',
        code: route.query.code as string,
        redirect_uri: window.location.origin + '/#/auth/callback',
        client_id: import.meta.env.VITE_APP_CLIENT_ID,
        code_verifier: sessionStorage.getItem('code_verifier')!
    })
    .then(() => {
        router.push({
            name: 'totem.view'
        })
    })
    .catch(() => {
        error.value = true
    })
    .finally(() => {
        isLoading.value = false
    })
})
</script>
